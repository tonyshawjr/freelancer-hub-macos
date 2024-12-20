import { Invoice } from '../types';

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    clientId: 'client1',
    amount: 2500,
    paid: false,
    date: '2024-01-15',
    dueDate: '2024-02-15'
  },
  {
    id: '2',
    clientId: 'client2',
    amount: 3500,
    paid: true,
    date: '2024-12-01',
    dueDate: '2024-12-31'
  },
  {
    id: '3',
    clientId: 'client1',
    amount: 1800,
    paid: false,
    date: '2024-12-10',
    dueDate: '2025-01-10'
  }
];
