import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useNavigate } from 'react-router-dom';
import FilterBar from '../components/tickets/FilterBar';
import ViewToggle from '../components/tickets/ViewToggle';
import TicketList from '../components/tickets/TicketList';
import { Ticket, TicketStatus, TicketPriority, MainCategory } from '../types/tickets';
import MetricCard from '../components/metrics/MetricCard';

interface FilterOptions {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  category?: MainCategory[];
  search?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

const Tickets = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('all');
  
  // Mock data - replace with actual data fetching
  const mockTickets: Ticket[] = Array.from({ length: 50 }, (_, i) => ({
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

  const handleFilterChange = (filters: FilterOptions) => {
    console.log('Filters changed:', filters);
    // Implement filter logic
  };

  const handleClearFilters = () => {
    console.log('Filters cleared');
    // Implement clear filters logic
  };

  const handleTicketClick = (ticket: Ticket) => {
    navigate(`/tickets/${ticket.id}`);
  };

  const handleStatusChange = (ticketId: string, status: string) => {
    console.log('Status changed:', ticketId, status);
    // Implement status change logic
  };

  const handlePriorityChange = (ticketId: string, priority: string) => {
    console.log('Priority changed:', ticketId, priority);
    // Implement priority change logic
  };

  const handleAddNote = (ticketId: string) => {
    console.log('Add note:', ticketId);
    // Implement add note logic
  };

  return (
    <Box sx={{ 
      p: 3,
      mx: 'auto',
      width: '100%'
    }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        mb: 4 
      }}>
        <Stack spacing={1}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem' },
              fontWeight: 800,
              mb: 2,
              color: '#1F2937'
            }}
          >
            Tickets
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ mb: 3 }}
          >
            Manage and track all your support tickets in one place
          </Typography>
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/tickets/new')}
          sx={{ 
            height: 'fit-content',
            px: 3,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          }}
        >
          Create Ticket
        </Button>
      </Box>

      {/* Metrics Section */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 3,
        mb: 4
      }}>
        {/* Resolution Rate */}
        <Box sx={{ 
          p: 3,
          bgcolor: '#F9FAFB',
          borderRadius: 2
        }}>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h3" sx={{ color: '#6366F1', fontWeight: 700 }}>
                {((mockTickets.filter(t => t.status === 'Closed').length / mockTickets.length) * 100).toFixed(0)}%
              </Typography>
              <TrendingUpIcon sx={{ color: '#10B981' }} />
            </Box>
            <Typography variant="subtitle1" sx={{ color: '#1F2937', fontWeight: 600 }}>
              Resolution Rate
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280' }}>
              {mockTickets.filter(t => t.status === 'Closed').length} of {mockTickets.length} tickets resolved
            </Typography>
          </Stack>
        </Box>

        {/* High Priority */}
        <Box sx={{ 
          p: 3,
          bgcolor: '#F9FAFB',
          borderRadius: 2
        }}>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h3" sx={{ color: '#6366F1', fontWeight: 700 }}>
                {mockTickets.filter(t => t.priority === 'High').length}
              </Typography>
              <TrendingDownIcon sx={{ color: '#EF4444' }} />
            </Box>
            <Typography variant="subtitle1" sx={{ color: '#1F2937', fontWeight: 600 }}>
              High Priority
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280' }}>
              Tickets requiring immediate attention
            </Typography>
          </Stack>
        </Box>

        {/* In Progress */}
        <Box sx={{ 
          p: 3,
          bgcolor: '#F9FAFB',
          borderRadius: 2
        }}>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h3" sx={{ color: '#6366F1', fontWeight: 700 }}>
                {mockTickets.filter(t => t.status === 'In Progress').length}
              </Typography>
              <TrendingUpIcon sx={{ color: '#10B981' }} />
            </Box>
            <Typography variant="subtitle1" sx={{ color: '#1F2937', fontWeight: 600 }}>
              In Progress
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280' }}>
              Tickets currently being worked on
            </Typography>
          </Stack>
        </Box>

        {/* New Tickets */}
        <Box sx={{ 
          p: 3,
          bgcolor: '#F9FAFB',
          borderRadius: 2
        }}>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h3" sx={{ color: '#6366F1', fontWeight: 700 }}>
                {mockTickets.filter(t => {
                  const created = new Date(t.createdAt);
                  const now = new Date();
                  return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                }).length}
              </Typography>
              <TrendingUpIcon sx={{ color: '#10B981' }} />
            </Box>
            <Typography variant="subtitle1" sx={{ color: '#1F2937', fontWeight: 600 }}>
              New Tickets
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280' }}>
              Tickets created this month
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* Filters Section */}
      <FilterBar onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
      
      {/* View Toggle */}
      <Box sx={{ mb: 3 }}>
        <ViewToggle value={currentView} onChange={(view) => setCurrentView(view)} />
      </Box>

      {/* Tickets List */}
      <TicketList tickets={mockTickets} onAddNote={handleAddNote} />
    </Box>
  );
};

export default Tickets;
