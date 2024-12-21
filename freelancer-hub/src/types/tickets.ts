export type MainCategory = 
  | 'Website Issues'
  | 'Content Updates'
  | 'Maintenance'
  | 'Client Requests';

export type SubCategory = {
  'Website Issues': 'Site Down' | 'Performance Problem' | 'Error/Bug' | 'Security Alert';
  'Content Updates': 'Text Changes' | 'Image Updates' | 'New Page' | 'Form Changes';
  'Maintenance': 'WordPress Update' | 'Plugin Update' | 'Backup' | 'SSL/Domain';
  'Client Requests': 'General Question' | 'Training Help' | 'Access Issue' | 'Other Request';
};

export type TicketStatus = 'Open' | 'In Progress' | 'Closed';
export type TicketPriority = 'High' | 'Medium' | 'Low';

export const TICKET_CATEGORIES: Record<MainCategory, string[]> = {
  'Website Issues': ['Site Down', 'Performance Problem', 'Error/Bug', 'Security Alert'],
  'Content Updates': ['Text Changes', 'Image Updates', 'New Page', 'Form Changes'],
  'Maintenance': ['WordPress Update', 'Plugin Update', 'Backup', 'SSL/Domain'],
  'Client Requests': ['General Question', 'Training Help', 'Access Issue', 'Other Request']
};

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  dueDate?: string;
  assignedTo?: string;
  clientName: string;
  category: MainCategory;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    avatar: string;
  };
  isInternal: boolean;
  reactions: Array<{
    type: string;
    users: string[];
  }>;
}

export interface ActivityDetails {
  from?: string;
  to?: string;
  message?: string;
  field?: string;
  fileName?: string;
  fileSize?: number;
}

export interface Activity {
  id: string;
  type: string;
  action: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  details: ActivityDetails;
}
