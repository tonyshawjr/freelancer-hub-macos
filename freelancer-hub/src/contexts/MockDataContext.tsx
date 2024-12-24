import { createContext, useContext, ReactNode } from 'react';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
}

interface Invoice {
  id: string;
  amount: number;
  paid: boolean;
}

interface Client {
  id: string;
  name: string;
  joinedDate: string;
}

interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high';
}

interface MockDataContextType {
  projects: Project[];
  invoices: Invoice[];
  clients: Client[];
  tickets: Ticket[];
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export function MockDataProvider({ children }: { children: ReactNode }) {
  const mockData: MockDataContextType = {
    projects: [
      { id: '1', name: 'Project A', status: 'active' },
      { id: '2', name: 'Project B', status: 'active' },
      { id: '3', name: 'Project C', status: 'completed' },
      { id: '4', name: 'Project D', status: 'on-hold' },
      { id: '5', name: 'Project E', status: 'active' },
    ],
    invoices: [
      { id: '1', amount: 2500, paid: false },
      { id: '2', amount: 1500, paid: false },
      { id: '3', amount: 3991.35, paid: false },
      { id: '4', amount: 2000, paid: true },
      { id: '5', amount: 1800, paid: true },
    ],
    clients: [
      { id: '1', name: 'Client A', joinedDate: '2024-11-01' },
      { id: '2', name: 'Client B', joinedDate: '2024-11-15' },
      { id: '3', name: 'Client C', joinedDate: '2024-12-01' },
    ],
    tickets: [
      { id: '1', title: 'Bug Fix', status: 'open', priority: 'high' },
      { id: '2', title: 'Feature Request', status: 'open', priority: 'high' },
      { id: '3', title: 'Support', status: 'closed', priority: 'medium' },
      { id: '4', title: 'Bug Fix', status: 'open', priority: 'high' },
    ],
  };

  return (
    <MockDataContext.Provider value={mockData}>
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockDataContext() {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error('useMockDataContext must be used within a MockDataProvider');
  }
  return context;
}
