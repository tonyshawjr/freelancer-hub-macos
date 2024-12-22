import { Ticket, TicketStatus, TicketPriority, MainCategory } from '../types/tickets';

export const mockTickets: Ticket[] = Array.from({ length: 50 }, (_, i) => ({
  id: `ticket-${i}`,
  title: `Sample Ticket ${i + 1}`,
  description: 'Sample description for this ticket. This will be replaced with actual content.',
  status: ['Open', 'In Progress', 'Closed'][i % 3] as TicketStatus,
  priority: ['High', 'Medium', 'Low'][i % 3] as TicketPriority,
  category: ['Website Issues', 'Content Updates', 'Maintenance', 'Client Requests'][i % 4] as MainCategory,
  clientName: `Client ${i + 1}`,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  dueDate: new Date(Date.now() + i * 86400000).toISOString(),
}));
