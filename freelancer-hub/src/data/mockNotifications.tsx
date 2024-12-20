import React from 'react';
import PaymentIcon from '@mui/icons-material/Payment';
import ErrorIcon from '@mui/icons-material/Error';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MessageIcon from '@mui/icons-material/Message';
import { Notification } from '../types/notification';

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'payment',
    title: 'New Payment Received',
    message: 'Client "Design Agency" has paid invoice #INV-2023-012 for $2,500',
    time: '2024-12-19T09:30:00-05:00',
    read: false,
    icon: <PaymentIcon sx={{ color: '#10B981' }} />
  },
  {
    id: 2,
    type: 'ticket',
    title: 'Urgent Ticket Update',
    message: 'New comment on ticket #TK-2023-089: "Need revision on homepage design"',
    time: '2024-12-19T09:15:00-05:00',
    read: false,
    icon: <ErrorIcon sx={{ color: '#EF4444' }} />
  },
  {
    id: 3,
    type: 'project',
    title: 'Project Deadline Approaching',
    message: 'Project "E-commerce Redesign" is due in 2 days',
    time: '2024-12-19T08:45:00-05:00',
    read: false,
    icon: <AssignmentIcon sx={{ color: '#F59E0B' }} />
  },
  {
    id: 4,
    type: 'message',
    title: 'New Client Message',
    message: 'Sarah from Tech Solutions: "Can we schedule a call to discuss the project scope?"',
    time: '2024-12-19T08:30:00-05:00',
    read: true,
    icon: <MessageIcon sx={{ color: '#6366F1' }} />
  }
];
