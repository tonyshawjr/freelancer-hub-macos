import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

import TicketHeader from '../components/tickets/detail/TicketHeader';
import TicketDescription from '../components/tickets/detail/TicketDescription';
import NotesThread from '../components/tickets/detail/NotesThread';
import QuickActions from '../components/tickets/detail/QuickActions';
import FilesList from '../components/tickets/detail/FilesList';
import ActivityLog from '../components/tickets/detail/ActivityLog';
import RelatedItems from '../components/tickets/detail/RelatedItems';

const TicketDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const mockFiles = [
    {
      id: '1',
      name: 'screenshot.png',
      type: 'image',
      size: 1000.55,
      uploadedAt: new Date().toISOString(),
      url: '#'
    }
  ];

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

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        pb: 4,
        backgroundColor: '#fff'
      }}
    >
      <Box sx={{ 
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        py: { xs: 3, sm: 4, md: 5 },
        px: { xs: 2, sm: 3 }
      }}>
        {/* Back Button */}
        <IconButton 
          onClick={() => navigate('/tickets')}
          sx={{ mb: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>

        <TicketHeader ticket={mockTicket} />
        
        <Box 
          sx={{ 
            mt: 3, 
            display: 'grid', 
            gap: 3, 
            gridTemplateColumns: { 
              xs: '1fr',
              lg: '2fr 1fr' 
            }
          }}
        >
          {/* Left Column */}
          <Stack spacing={3}>
            <TicketDescription ticket={mockTicket} />
            <NotesThread notes={mockNotes} />
          </Stack>

          {/* Right Column */}
          <Stack spacing={3}>
            <QuickActions ticket={mockTicket} />
            <FilesList files={mockFiles} />
            <ActivityLog activities={mockActivities} />
            <RelatedItems ticket={mockTicket} />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketDetail;
