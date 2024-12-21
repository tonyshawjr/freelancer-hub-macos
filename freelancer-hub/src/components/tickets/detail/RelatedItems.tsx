import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Stack,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface RelatedItemsProps {
  ticket: {
    id: string;
  };
}

const RelatedItems: React.FC<RelatedItemsProps> = ({ ticket }) => {
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const relatedProject = {
    id: 'proj-1',
    name: 'Website Redesign',
    status: 'In Progress',
  };

  const relatedTickets = [
    {
      id: 'tick-1',
      title: 'Update homepage banner',
      status: 'Open',
      priority: 'Medium',
    },
    {
      id: 'tick-2',
      title: 'Fix mobile navigation',
      status: 'In Progress',
      priority: 'High',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return '#22C55E';
      case 'in progress':
        return '#F59E0B';
      case 'closed':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#22C55E';
      default:
        return '#6B7280';
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'white', borderRadius: 2 }}>
      <Stack spacing={3}>
        {/* Related Project */}
        {relatedProject && (
          <Box>
            <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 600, mb: 2 }}>
              Related Project
            </Typography>
            <Paper
              variant="outlined"
              sx={{ 
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'grey.50',
                },
              }}
              onClick={() => navigate(`/projects/${relatedProject.id}`)}
            >
              <FolderIcon sx={{ color: 'primary.main' }} />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                  {relatedProject.name}
                </Typography>
                <Chip
                  label={relatedProject.status}
                  size="small"
                  sx={{
                    mt: 1,
                    bgcolor: getStatusColor(relatedProject.status),
                    color: 'white',
                    fontSize: 12,
                  }}
                />
              </Box>
            </Paper>
          </Box>
        )}

        <Divider />

        {/* Related Tickets */}
        {relatedTickets.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 600, mb: 2 }}>
              Related Tickets
            </Typography>
            <Stack spacing={2}>
              {relatedTickets.map((relatedTicket) => (
                <Paper
                  key={relatedTicket.id}
                  variant="outlined"
                  sx={{ 
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'grey.50',
                    },
                  }}
                  onClick={() => navigate(`/tickets/${relatedTicket.id}`)}
                >
                  <ConfirmationNumberIcon sx={{ color: 'primary.main' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                      {relatedTicket.title}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip
                        label={relatedTicket.status}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor(relatedTicket.status),
                          color: 'white',
                          fontSize: 12,
                        }}
                      />
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: getPriorityColor(relatedTicket.priority),
                          alignSelf: 'center',
                        }}
                      />
                    </Stack>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        <Divider />

        {/* Bottom Actions */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ 
              fontSize: 16,
              textTransform: 'none'
            }}
          >
            Delete Ticket
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RelatedItems;
