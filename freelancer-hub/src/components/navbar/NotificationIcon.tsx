import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import ErrorIcon from '@mui/icons-material/Error';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';

type NotificationType = 'payment' | 'ticket' | 'project' | 'message';

interface NotificationIconProps extends SvgIconProps {
  type: NotificationType;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ type, ...props }) => {
  const iconMap: Record<NotificationType, typeof SvgIcon> = {
    payment: PaymentIcon,
    ticket: ErrorIcon,
    project: AssignmentIcon,
    message: ChatIcon
  };

  const colorMap: Record<NotificationType, string> = {
    payment: '#10B981', // Green
    ticket: '#EF4444', // Red
    project: '#F59E0B', // Orange
    message: '#6366F1' // Primary
  };

  const Icon = iconMap[type];
  return <Icon {...props} sx={{ color: colorMap[type], ...props.sx }} />;
};

export default NotificationIcon;
