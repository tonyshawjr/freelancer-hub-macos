import React, { useState } from 'react';
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
import { Ticket } from '../types/tickets';

const Tickets = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('all');
  
  // Mock data - replace with actual data fetching
  const mockTickets: Ticket[] = Array.from({ length: 50 }, (_, i) => ({
    id: `ticket-${i}`,
    number: 1000 + i,
    title: `Sample Ticket ${i + 1}`,
    description: 'Sample description',
    status: ['Open', 'In Progress', 'Closed'][i % 3] as any,
    priority: ['High', 'Medium', 'Low'][i % 3] as any,
    mainCategory: ['Website Issues', 'Content Updates', 'Maintenance', 'Client Requests'][i % 4] as any,
    subCategory: 'General',
    clientName: `Client ${i + 1}`,
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - i * 43200000).toISOString(),
    dueDate: new Date(Date.now() + i * 86400000).toISOString(),
  }));

  const handleFilterChange = (filters: any) => {
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

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <StatsCard 
              title="Total Active Tickets" 
              value={42} 
              color="rgba(99, 102, 241, 0.1)"
              trend={{ value: 12, isPositive: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatsCard 
              title="High Priority" 
              value={8} 
              color="rgba(239, 68, 68, 0.1)"
              trend={{ value: 5, isPositive: false }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatsCard 
              title="Unread" 
              value={12} 
              color="rgba(245, 158, 11, 0.1)"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatsCard 
              title="Due Today" 
              value={5} 
              color="rgba(16, 185, 129, 0.1)"
              trend={{ value: 8, isPositive: true }}
            />
          </Grid>
        </Grid>

        {/* Filter Bar */}
        <FilterBar 
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* View Toggle */}
        <ViewToggle 
          view={currentView}
          onViewChange={setCurrentView}
        />

        {/* Ticket List */}
        <TicketList 
          tickets={mockTickets}
          onTicketClick={handleTicketClick}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onAddNote={handleAddNote}
        />
      </Box>
    </Box>
  );
};

export default Tickets;
