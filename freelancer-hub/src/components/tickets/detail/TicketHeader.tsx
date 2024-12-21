import React from 'react';
import { Box, Typography, Chip, Stack, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import FlagIcon from '@mui/icons-material/Flag';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';

interface TicketHeaderProps {
  ticket: {
    id: string;
    title: string;
    status: string;
    priority: string;
    clientName: string;
    category: string;
  };
}

const StatusChip = styled(Chip)(({ theme, status }: { theme: any; status: string }) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return {
          bg: '#FFF4E5',
          color: '#B76E00'
        };
      case 'open':
        return {
          bg: '#E8F4FF',
          color: '#0065D0'
        };
      case 'completed':
        return {
          bg: '#E6F7E9',
          color: '#1B7D2C'
        };
      case 'blocked':
        return {
          bg: '#FFE9E9',
          color: '#D92D20'
        };
      default:
        return {
          bg: theme.palette.grey[100],
          color: theme.palette.grey[700]
        };
    }
  };

  const colors = getStatusColor();
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 600,
    fontSize: '0.875rem',
    padding: '4px 12px',
    height: 28,
    '& .MuiChip-label': {
      padding: '0 4px',
    },
  };
});

const PriorityChip = styled(Chip)(({ theme, priority }: { theme: any; priority: string }) => {
  const getPriorityColor = () => {
    switch (priority.toLowerCase()) {
      case 'high':
        return {
          bg: '#FFE9E9',
          color: '#D92D20'
        };
      case 'medium':
        return {
          bg: '#FFF4E5',
          color: '#B76E00'
        };
      case 'low':
        return {
          bg: '#E6F7E9',
          color: '#1B7D2C'
        };
      default:
        return {
          bg: theme.palette.grey[100],
          color: theme.palette.grey[700]
        };
    }
  };

  const colors = getPriorityColor();
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 500,
    fontSize: '0.75rem',
    padding: '0 8px',
    height: 24,
    '& .MuiChip-icon': {
      color: 'inherit',
      fontSize: '1rem',
    },
    '& .MuiChip-label': {
      padding: '0 4px',
    },
  };
});

const TicketHeader: React.FC<TicketHeaderProps> = ({ ticket }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontSize: '2.50rem',
          fontWeight: 600,
          color: 'text.primary',
          mb: 2
        }}
      >
        {ticket.title}
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <StatusChip
          label={ticket.status}
          status={ticket.status}
          size="small"
        />
        <PriorityChip
          label={ticket.priority}
          priority={ticket.priority}
          size="small"
          icon={<FlagIcon fontSize="small" />}
        />
        <Tooltip title="Client">
          <Chip
            icon={<BusinessIcon fontSize="small" />}
            label={ticket.clientName}
            size="small"
            sx={{
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
              color: 'primary.main',
              '& .MuiChip-icon': {
                color: 'primary.main'
              }
            }}
          />
        </Tooltip>
        <Tooltip title="Category">
          <Chip
            icon={<CategoryIcon fontSize="small" />}
            label={ticket.category}
            size="small"
            sx={{
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
              color: 'primary.main',
              '& .MuiChip-icon': {
                color: 'primary.main'
              }
            }}
          />
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default TicketHeader;
