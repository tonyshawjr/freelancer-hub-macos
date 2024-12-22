import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import FilterBar from '../components/tickets/FilterBar';
import TicketList from '../components/tickets/TicketList';
import ViewToggle from '../components/common/ViewToggle';
import PageTitle from '../components/common/PageTitle';
import { mockTickets } from '../data/mockData';
import { Ticket } from '../types/tickets';

interface FilterOptions {
  search?: string;
  status?: string;
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

const Tickets: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = React.useState<'list' | 'board'>('list');

  const handleFilterChange = (filters: FilterOptions) => {
    console.log('Filters changed:', filters);
  };

  const handleAddNote = (ticketId: string) => {
    console.log('Adding note to ticket:', ticketId);
  };

  const handleTicketClick = (ticket: Ticket) => {
    navigate(`/tickets/${ticket.id}`);
  };

  const handleStatusChange = (ticketId: string, status: string) => {
    console.log('Status changed:', ticketId, status);
  };

  const handlePriorityChange = (ticketId: string, priority: string) => {
    console.log('Priority changed:', ticketId, priority);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4
      }}>
        <PageTitle>Tickets</PageTitle>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/tickets/new')}
          sx={{ 
            bgcolor: '#6366F1',
            '&:hover': {
              bgcolor: '#4F46E5'
            },
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: 'none'
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
                {((mockTickets.filter((t: Ticket) => t.status === 'Closed').length / mockTickets.length) * 100).toFixed(0)}%
              </Typography>
              <TrendingUpIcon sx={{ color: '#10B981' }} />
            </Box>
            <Typography variant="subtitle1" sx={{ color: '#1F2937', fontWeight: 600 }}>
              Resolution Rate
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280' }}>
              {mockTickets.filter((t: Ticket) => t.status === 'Closed').length} of {mockTickets.length} tickets resolved
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
                {mockTickets.filter((t: Ticket) => t.priority === 'High').length}
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
                {mockTickets.filter((t: Ticket) => t.status === 'In Progress').length}
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
                {mockTickets.filter((t: Ticket) => {
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

      {/* Filter Bar */}
      <FilterBar onFilterChange={handleFilterChange} />
      
      {/* View Toggle */}
      <Box sx={{ mb: 3 }}>
        <ViewToggle value={view} onChange={(newView: 'list' | 'board') => setView(newView)} />
      </Box>

      {/* Tickets List */}
      <TicketList 
        tickets={mockTickets}
        onTicketClick={handleTicketClick}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        onAddNote={handleAddNote}
      />
    </Box>
  );
};

export default Tickets;
