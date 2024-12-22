import React, { useCallback } from 'react';
import { Box, Stack, Grid, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import TicketHeader from '../components/tickets/detail/TicketHeader';
import TicketDescription from '../components/tickets/detail/TicketDescription';
import NotesThread from '../components/tickets/detail/NotesThread';
import QuickActions from '../components/tickets/detail/QuickActions';
import FilesList from '../components/tickets/detail/FilesList';
import ActivityLog from '../components/tickets/detail/ActivityLog';
import RelatedItems from '../components/tickets/detail/RelatedItems';
import PageContainer from '../components/layout/PageContainer';

const TicketDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock ticket data - replace with actual data fetching
  const mockTicket = {
    id: id || '1',
    title: 'Implement new dashboard features',
    status: 'In Progress',
    priority: 'High',
    createdAt: new Date().toISOString(),
    clientName: 'Acme Corp',
    category: 'Feature Request',
    description: 'We need to implement several new dashboard features including:\n- Real-time data updates\n- Customizable widgets\n- Export functionality',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: 'Tony Shaw',
  };

  const mockNotes = [
    {
      id: '1',
      content: 'This is a test note with some **markdown** content.\n- Item 1\n- Item 2',
      createdAt: new Date().toISOString(),
      author: {
        name: 'Tony Shaw',
        avatar: '',
      },
      isInternal: false,
      reactions: []
    }
  ];

  // Mock files data with proper File type
  const mockFiles = [
    new File([''], 'document1.pdf', { type: 'application/pdf' }),
    new File([''], 'image1.jpg', { type: 'image/jpeg' }),
  ].map(file => ({
    ...file,
    id: Math.random().toString(),
    uploadedAt: new Date().toISOString(),
    url: URL.createObjectURL(file)
  }));

  const mockActivities = [
    {
      id: '1',
      type: 'status',
      action: 'changed the status',
      user: {
        name: 'Tony Shaw',
        avatar: ''
      },
      timestamp: new Date().toISOString(),
      details: {
        from: 'Open',
        to: 'In Progress'
      }
    }
  ];

  const handleStatusChange = useCallback((newStatus: string) => {
    console.log('Status changed to:', newStatus);
    // Implement status change logic here
  }, []);

  const handleAction = useCallback((action: string) => {
    console.log('Action triggered:', action);
    // Implement action handling logic here
  }, []);

  return (
    <PageContainer>
      <Box sx={{ mb: 3 }}>
        <TicketHeader ticket={mockTicket} />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <TicketDescription description={mockTicket.description} />
            <NotesThread notes={mockNotes} />
            <QuickActions 
              onStatusChange={handleStatusChange}
              onAction={handleAction}
            />
            <Button
              onClick={() => navigate('/tickets')}
              variant="text"
              sx={{
                color: 'text.secondary',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                pl: 0,
                alignSelf: 'flex-start',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'text.primary',
                },
              }}
            >
              ← Back to Tickets
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <FilesList files={mockFiles} />
            <ActivityLog activities={mockActivities} />
            <RelatedItems ticketId={mockTicket.id} />
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default TicketDetail;
