import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/tickets/StatsCard';
import FilterBar from '../components/tickets/FilterBar';
import ViewToggle from '../components/tickets/ViewToggle';
import TicketList from '../components/tickets/TicketList';
import { Ticket, TicketStatus, TicketPriority, MainCategory } from '../types/tickets';

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
      bgcolor: '#FFFFFF', 
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Box sx={{ 
        width: '100%',
        maxWidth: '1200px',
        py: { xs: 3, sm: 4 }, 
        px: { xs: 2, sm: 3 } 
      }}>
        {/* Header Section */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2rem' }
            }}
          >
            Tickets Overview
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/tickets/create')}
            sx={{
              bgcolor: '#6366F1',
              '&:hover': { bgcolor: '#4F46E5' },
              px: 3,
              py: 1
            }}
          >
            New Ticket
          </Button>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Tickets"
              value={mockTickets.length}
              trend={{ value: 12.5, isPositive: true }}
              color="rgba(99, 102, 241, 0.1)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Open Tickets"
              value={mockTickets.filter(t => t.status === 'Open').length}
              trend={{ value: 2.3, isPositive: false }}
              color="rgba(239, 68, 68, 0.1)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="In Progress"
              value={mockTickets.filter(t => t.status === 'In Progress').length}
              trend={{ value: 8.4, isPositive: true }}
              color="rgba(245, 158, 11, 0.1)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Closed Tickets"
              value={mockTickets.filter(t => t.status === 'Closed').length}
              trend={{ value: 5.7, isPositive: true }}
              color="rgba(16, 185, 129, 0.1)"
            />
          </Grid>
        </Grid>

        {/* Filters Section */}
        <Box sx={{ mb: 3 }}>
          <FilterBar onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
        </Box>

        {/* View Toggle & List */}
        <Box>
          <Box sx={{ mb: 2 }}>
            <ViewToggle view={currentView} onViewChange={setCurrentView} />
          </Box>
          <TicketList
            tickets={mockTickets}
            onTicketClick={handleTicketClick}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
            onAddNote={handleAddNote}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Tickets;
