import { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Website',
    clientId: 'client1',
    status: 'active',
    budget: 15000,
    startDate: '2024-01-01'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    clientId: 'client2',
    status: 'proposal',
    budget: 25000,
    startDate: '2024-02-01'
  },
  {
    id: '3',
    name: 'Brand Redesign',
    clientId: 'client3',
    status: 'proposal',
    budget: 8000,
    startDate: '2024-03-01'
  }
];
