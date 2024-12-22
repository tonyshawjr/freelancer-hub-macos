import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
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

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => {
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
    borderRadius: '4px',
    fontWeight: 500,
    textTransform: 'capitalize'
  };
});

const PriorityChip = styled(Chip)<{ priority: string }>(({ theme, priority }) => {
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
    borderRadius: '4px',
    fontWeight: 500,
    textTransform: 'capitalize'
  };
});

const TicketHeader: React.FC<TicketHeaderProps> = ({ ticket }) => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Stack spacing={2}>
          <Box>
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
                size="small"
                status={ticket.status}
              />

              <PriorityChip
                label={ticket.priority}
                size="small"
                priority={ticket.priority}
                icon={<FlagIcon />}
              />

              <Chip
                icon={<BusinessIcon />}
                label={ticket.clientName}
                size="small"
                sx={{
                  bgcolor: theme.palette.grey[100],
                  color: theme.palette.grey[700],
                  borderRadius: '4px',
                  '& .MuiChip-icon': {
                    color: theme.palette.grey[500]
                  }
                }}
              />

              <Chip
                icon={<CategoryIcon />}
                label={ticket.category}
                size="small"
                sx={{
                  bgcolor: theme.palette.grey[100],
                  color: theme.palette.grey[700],
                  borderRadius: '4px',
                  '& .MuiChip-icon': {
                    color: theme.palette.grey[500]
                  }
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default TicketHeader;
