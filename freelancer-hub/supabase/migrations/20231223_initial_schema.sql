-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create custom types
create type user_role as enum ('freelancer', 'client');
create type project_status as enum ('draft', 'in_progress', 'completed', 'cancelled');
create type ticket_status as enum ('open', 'in_progress', 'resolved', 'closed');
create type ticket_priority as enum ('low', 'medium', 'high', 'urgent');
create type invoice_status as enum ('draft', 'sent', 'paid', 'overdue', 'cancelled');

-- Store the owner's (freelancer) ID for reference in policies
create table system_config (
  freelancer_id uuid references auth.users primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create profiles table (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  role user_role not null default 'client',
  full_name text,
  company_name text,
  avatar_url text,
  timezone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create projects table
create table projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  client_id uuid references profiles(id) on delete set null,
  status project_status not null default 'draft',
  start_date date,
  end_date date,
  budget decimal(10,2),
  hourly_rate decimal(10,2),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tickets table
create table tickets (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  title text not null,
  description text,
  status ticket_status not null default 'open',
  priority ticket_priority not null default 'medium',
  estimated_hours decimal(5,2),
  actual_hours decimal(5,2),
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create invoices table
create table invoices (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete set null,
  client_id uuid references profiles(id) on delete set null not null,
  invoice_number text not null unique,
  status invoice_status not null default 'draft',
  issue_date date not null,
  due_date date not null,
  amount decimal(10,2) not null,
  paid_amount decimal(10,2) default 0,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create invoice_items table
create table invoice_items (
  id uuid default uuid_generate_v4() primary key,
  invoice_id uuid references invoices(id) on delete cascade not null,
  description text not null,
  quantity decimal(10,2) not null default 1,
  unit_price decimal(10,2) not null,
  amount decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on all tables
alter table system_config enable row level security;
alter table profiles enable row level security;
alter table projects enable row level security;
alter table tickets enable row level security;
alter table invoices enable row level security;
alter table invoice_items enable row level security;

-- System config policies (only the owner can access)
create policy "Only owner can view system config"
  on system_config for select
  using (auth.uid() = freelancer_id);

-- Profiles policies
create policy "Owner can view all profiles"
  on profiles for select
  using (
    exists (
      select 1 from system_config
      where freelancer_id = auth.uid()
    )
  );

create policy "Clients can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Owner can update any profile"
  on profiles for update
  using (
    exists (
      select 1 from system_config
      where freelancer_id = auth.uid()
    )
  );

create policy "Clients can update their own profile"
  on profiles for update
  using (
    auth.uid() = id and 
    role = 'client'
  );

-- Projects policies
create policy "Owner can view all projects"
  on projects for select
  using (
    exists (
      select 1 from system_config
      where freelancer_id = auth.uid()
    )
  );

create policy "Clients can view their projects"
  on projects for select
  using (auth.uid() = client_id);

create policy "Only owner can manage projects"
  on projects for all
  using (
    exists (
      select 1 from system_config
      where freelancer_id = auth.uid()
    )
  );

-- Tickets policies
create policy "Owner can view all tickets"
  on tickets for select
  using (
    exists (
      select 1 from system_config
      where freelancer_id = auth.uid()
    )
  );

create policy "Clients can view their project tickets"
  on tickets for select
  using (
    exists (
      select 1 from projects
      where id = tickets.project_id
      and client_id = auth.uid()
    )
  );

create policy "Only owner can manage tickets"
  on tickets for all
  using (
    exists (
      select 1 from system_config
      where freelancer_id = auth.uid()
    )
  );

-- Invoices policies
create policy "Owner can view all invoices"
  on invoices for select
  using (
    exists (
      select 1 from system_config
      where freelancer_id = auth.uid()
    )
  );

create policy "Clients can view their invoices"
  on invoices for select
  using (auth.uid() = client_id);

create policy "Only owner can manage invoices"
  on invoices for all
  using (
    exists (
      select 1 from system_config
      where freelancer_id = auth.uid()
    )
  );

-- Invoice items policies
create policy "Owner can view all invoice items"
  on invoice_items for select
  using (
    exists (
      select 1 from system_config
      where freelancer_id = auth.uid()
    )
  );

create policy "Clients can view their invoice items"
  on invoice_items for select
  using (
    exists (
      select 1 from invoices
      where id = invoice_items.invoice_id
      and client_id = auth.uid()
    )
  );

create policy "Only owner can manage invoice items"
  on invoice_items for all
  using (
    exists (
      select 1 from system_config
      where freelancer_id = auth.uid()
    )
  );

-- Create functions for updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create updated_at triggers
create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at_column();

create trigger update_projects_updated_at
  before update on projects
  for each row
  execute function update_updated_at_column();

create trigger update_tickets_updated_at
  before update on tickets
  for each row
  execute function update_updated_at_column();

create trigger update_invoices_updated_at
  before update on invoices
  for each row
  execute function update_updated_at_column();

create trigger update_invoice_items_updated_at
  before update on invoice_items
  for each row
  execute function update_updated_at_column();
