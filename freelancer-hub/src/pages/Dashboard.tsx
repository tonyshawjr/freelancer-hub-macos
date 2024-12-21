import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import { useMockDataContext } from '../context/MockDataContext';
import { formatCurrency } from '../utils/invoiceUtils';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatIcon from '@mui/icons-material/Chat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const Dashboard: React.FC = () => {
  const { tickets, projects, clients, invoices } = useMockDataContext();
  const currentTime = new Date();
  
  // Calculate business metrics
  const activeProjects = projects.filter(p => p.status === 'active');
  const pendingInvoices = invoices.filter(inv => !inv.paid);
  const totalPendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const urgentTasks = tickets.filter(t => t.priority === 'high' && t.status !== 'closed');

  const getGreeting = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      return '👋 Good morning';
    } else if (hour >= 12 && hour < 17) {
      return '👋 Good afternoon';
    } else {
      return '👋 Good evening';
    }
  };

  return (
    <Box sx={{ bgcolor: '#FFFFFF', width: '100%' }}>
      <Box sx={{ 
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        py: { xs: 3, sm: 4, md: 5 },
        px: { xs: 2, sm: 3 }
      }}>
        {/* Hero Section */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Box sx={{ 
            width: { xs: '100%', md: '605px' },
            textAlign: { xs: 'center', md: 'left' }
          }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', sm: '3rem' }, 
              fontWeight: 700,
              color: '#1a1a1a',
              mb: 1
            }}>
              {getGreeting()}, Tony
            </Typography>
            <Typography variant="subtitle1" sx={{ 
              fontSize: '1.25rem', 
              color: '#6366F1',
              fontWeight: 500,
              mb: 2
            }}>
              {format(currentTime, 'EEEE, MMMM do, yyyy')}
            </Typography>
            <Typography variant="body1" sx={{ 
              fontSize: '1.25rem', 
              color: 'text.secondary',
              mb: 3,
              lineHeight: 1.6
            }}>
              You're currently juggling {activeProjects.length} active projects with {formatCurrency(totalPendingAmount)} in pending payments waiting to be processed. There are {urgentTasks.length} urgent tickets requiring your attention, so prioritize these support requests to maintain client satisfaction.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  component={RouterLink}
                  to="/projects"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#6366F1',
                    fontSize: '1.25rem',
                    '&:hover': {
                      bgcolor: '#4F46E5'
                    }
                  }}
                >
                  View Projects
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  component={RouterLink}
                  to="/tickets"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: '#6366F1',
                    color: '#6366F1',
                    fontSize: '1.25rem',
                    '&:hover': {
                      borderColor: '#4F46E5',
                      bgcolor: 'rgba(99, 102, 241, 0.04)'
                    }
                  }}
                >
                  View Tickets
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Stats Section */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="h2" sx={{ 
            mb: 3, 
            fontSize: '1.875rem', 
            fontWeight: 600 
          }}>
            Your Monthly Stats
          </Typography>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 3
          }}>
            {/* Projects Metric */}
            <Box sx={{ 
              p: 3, 
              bgcolor: '#F9FAFB',
              borderRadius: '12px'
            }}>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Typography variant="h3" sx={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 700,
                    color: '#6366F1',
                    mb: 1
                  }}>
                    58%
                  </Typography>
                </Grid>
                <Grid item>
                  <TrendingUpIcon sx={{ color: '#10B981' }} />
                </Grid>
              </Grid>
              <Typography variant="subtitle1" sx={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                mb: 0.5 
              }}>
                Active Projects
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: '1.25rem', 
                color: 'text.secondary'
              }}>
                vs. Last Month
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: '1.25rem', 
                color: 'text.secondary',
                mt: 1
              }}>
                {activeProjects.length} of {projects.length} projects active
              </Typography>
            </Box>

            {/* Payment Rate */}
            <Box sx={{ 
              p: 3, 
              bgcolor: '#F9FAFB',
              borderRadius: '12px'
            }}>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Typography variant="h3" sx={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 700,
                    color: '#6366F1',
                    mb: 1
                  }}>
                    100%
                  </Typography>
                </Grid>
                <Grid item>
                  <TrendingUpIcon sx={{ color: '#10B981' }} />
                </Grid>
              </Grid>
              <Typography variant="subtitle1" sx={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                mb: 0.5 
              }}>
                Payment Rate
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: '1.25rem', 
                color: 'text.secondary'
              }}>
                vs. Last Month
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: '1.25rem', 
                color: 'text.secondary',
                mt: 1
              }}>
                {invoices.length - pendingInvoices.length} of {invoices.length} invoices paid
              </Typography>
            </Box>

            {/* Client Growth */}
            <Box sx={{ 
              p: 3, 
              bgcolor: '#F9FAFB',
              borderRadius: '12px'
            }}>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Typography variant="h3" sx={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 700,
                    color: '#6366F1',
                    mb: 1
                  }}>
                    0%
                  </Typography>
                </Grid>
                <Grid item>
                  <TrendingDownIcon sx={{ color: '#EF4444' }} />
                </Grid>
              </Grid>
              <Typography variant="subtitle1" sx={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                mb: 0.5 
              }}>
                Client Growth
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: '1.25rem', 
                color: 'text.secondary'
              }}>
                vs. Last Month
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: '1.25rem', 
                color: 'text.secondary',
                mt: 1
              }}>
                {clients.filter(c => {
                  const clientDate = new Date(c.joinedDate);
                  return clientDate.getMonth() === currentTime.getMonth() &&
                         clientDate.getFullYear() === currentTime.getFullYear();
                }).length} new clients this month
              </Typography>
            </Box>

            {/* Ticket Resolution */}
            <Box sx={{ 
              p: 3, 
              bgcolor: '#F9FAFB',
              borderRadius: '12px'
            }}>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Typography variant="h3" sx={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 700,
                    color: '#6366F1',
                    mb: 1
                  }}>
                    81%
                  </Typography>
                </Grid>
                <Grid item>
                  <TrendingUpIcon sx={{ color: '#10B981' }} />
                </Grid>
              </Grid>
              <Typography variant="subtitle1" sx={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                mb: 0.5 
              }}>
                Ticket Resolution
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: '1.25rem', 
                color: 'text.secondary'
              }}>
                vs. Last Month
              </Typography>
              <Typography variant="body2" sx={{
                fontSize: '1.25rem', 
                color: 'text.secondary',
                mt: 1
              }}>
                {tickets.filter(t => t.status === 'closed').length} of {tickets.length} tickets resolved
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Quick Actions */}
        <Box>
          <Typography variant="h2" sx={{ 
            mb: 3, 
            fontSize: '1.875rem',
            fontWeight: 600 
          }}>
            Quick Actions
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Button
                component={RouterLink}
                to="/invoices/new"
                variant="outlined"
                fullWidth
                sx={{
                  p: 3,
                  borderColor: '#E5E7EB',
                  color: '#1F2937',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: '#6366F1',
                    bgcolor: 'rgba(99, 102, 241, 0.04)'
                  }
                }}
              >
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: '#EEF2FF',
                  borderRadius: '12px'
                }}>
                  <ReceiptIcon sx={{ color: '#6366F1', fontSize: '1.5rem' }} />
                </Box>
                Create Invoice
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                component={RouterLink}
                to="/projects/new"
                variant="outlined"
                fullWidth
                sx={{
                  p: 3,
                  borderColor: '#E5E7EB',
                  color: '#1F2937',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: '#6366F1',
                    bgcolor: 'rgba(99, 102, 241, 0.04)'
                  }
                }}
              >
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: '#EEF2FF',
                  borderRadius: '12px'
                }}>
                  <AddCircleIcon sx={{ color: '#6366F1', fontSize: '1.5rem' }} />
                </Box>
                New Project
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                component={RouterLink}
                to="/messages/new"
                variant="outlined"
                fullWidth
                sx={{
                  p: 3,
                  borderColor: '#E5E7EB',
                  color: '#1F2937',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: '#6366F1',
                    bgcolor: 'rgba(99, 102, 241, 0.04)'
                  }
                }}
              >
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: '#EEF2FF',
                  borderRadius: '12px'
                }}>
                  <ChatIcon sx={{ color: '#6366F1', fontSize: '1.5rem' }} />
                </Box>
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
