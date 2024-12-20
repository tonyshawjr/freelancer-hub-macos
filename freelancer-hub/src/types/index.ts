export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  paid: boolean;
  date: string;  // ISO date string
  dueDate: string;  // ISO date string
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  status: 'active' | 'completed' | 'on-hold' | 'proposal';
  budget: number;
  startDate: string;  // ISO date string
  endDate?: string;  // ISO date string
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
}
