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
    const date = new Date();
    const hour = date.getHours();
    const day = date.getDay();
    const month = date.getMonth();
    const random = Math.random();
  
    // Special Days Check
    if (day === 1) { // Monday
      if (random < 0.25) return "Monday - let's make it count! 💪";
      if (random < 0.5) return "New week, fresh start! 🚀";
      if (random < 0.75) return "Monday motivation activated";
      return "Ready to crush this week?";
    }
  
    if (day === 5) { // Friday
      if (random < 0.25) return "Friday vibes! 🎉";
      if (random < 0.5) return "The weekend is calling!";
      if (random < 0.75) return "Friday mode: engaged";
      return "Finishing the week strong!";
    }
  
    if (day === 0 || day === 6) { // Weekend
      if (random < 0.25) return "Weekend warrior mode 💪";
      if (random < 0.5) return "Grinding on the weekend!";
      if (random < 0.75) return "Now that's dedication!";
      return "Making the most of weekend hours";
    }
  
    // Seasonal Greetings
    const seasonalGreeting = getSeasonalGreeting(month, date.getDate());
    if (seasonalGreeting) return seasonalGreeting;
  
    // Regular Time-Based Greetings
    if (hour >= 5 && hour < 12) {
      if (random < 0.2) return "Look who's up early! ☀️";
      if (random < 0.4) return "Rise and grind! ⚡";
      if (random < 0.6) return "Ready to rock this day? 🎸";
      if (random < 0.8) return "Coffee time! ☕";
      return "Time to make magic happen ✨";
    } 
    
    else if (hour >= 12 && hour < 17) {
      if (random < 0.2) return "Crushing it today! 💪";
      if (random < 0.4) return "In the flow! 🌊";
      if (random < 0.6) return "Peak productivity hours! ⚡";
      if (random < 0.8) return "Keep that momentum going! 🚀";
      return "Making things happen! 💫";
    } 
    
    else if (hour >= 17 && hour < 22) {
      if (random < 0.2) return "Still going strong! 💪";
      if (random < 0.4) return "Evening hustle! 🌟";
      if (random < 0.6) return "Finishing strong! 🎯";
      if (random < 0.8) return "The day's not over yet! ⚡";
      return "Evening productivity session! 🌙";
    }
    
    else {
      if (random < 0.2) return "Night owl mode: activated 🦉";
      if (random < 0.4) return "The best ideas come at night ✨";
      if (random < 0.6) return "Midnight momentum! 🌙";
      if (random < 0.8) return "The quiet hours are the best! 🌠";
      return "Late night inspiration! 💫";
    }
  };
  
  // Separate function for seasonal greetings
  const getSeasonalGreeting = (month: number, day: number) => {
    // Holiday checks
    if (month === 11) { // December
      if (day === 25) return "Merry Christmas! 🎄";
      if (day === 24) return "Christmas Eve magic! ✨";
      if (day >= 20) return "Holiday season is here! 🎄";
    }
  
    if (month === 0 && day === 1) return "Happy New Year! 🎉";
    if (month === 3 && day === 1) return "No fooling - time to work! 🃏";
    if (month === 6 && day === 4) return "Happy Independence Day! 🎆";
    if (month === 9 && day === 31) return "Spooky productivity! 🎃";
  
    // Seasonal messages
    if (month === 11 || month === 0 || month === 1) { // Winter
      if (Math.random() < 0.3) return "Cozy productivity season! ❄️";
    }
    
    if (month >= 2 && month <= 4) { // Spring
      if (Math.random() < 0.3) return "Spring productivity blooming! 🌸";
    }
    
    if (month >= 5 && month <= 7) { // Summer
      if (Math.random() < 0.3) return "Summer productivity mode! ☀️";
    }
    
    if (month >= 8 && month <= 10) { // Fall
      if (Math.random() < 0.3) return "Fall focus activated! 🍂";
    }
  
    return null; // If no seasonal greeting, return null to use regular greetings
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
            width: { xs: '100%', md: '66%' },
            textAlign: { xs: 'center', md: 'left' }
          }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', sm: '4rem' }, 
              fontWeight: 800,
              color: '#1a1a1a',
              lineHeight: 1.1,
              mb: 1
            }}>
              {getGreeting()}
            </Typography>
            <Typography variant="subtitle1" sx={{ 
              fontSize: '2rem', 
              color: '#6366F1',
              fontWeight: 700,
              mb: 2
            }}>
              {format(currentTime, 'EEEE, MMMM do, yyyy')}
            </Typography>
            <Typography variant="body1" sx={{ 
              fontSize: '1.25rem', 
              color: 'text.secondary',
              fontWeight: 400,
              mb: 3,
              lineHeight: 1.6
            }}>
              You're currently juggling {activeProjects.length} active projects with {formatCurrency(totalPendingAmount)} in pending payments waiting to be processed. There are {urgentTasks.length} urgent tickets requiring your attention, so prioritize these support requests to maintain client satisfaction.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
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
              <Typography 
                variant="subtitle1" 
                className="card-title"
              >
                Active Projects
              </Typography>
              <Typography 
                variant="body2" 
                className="card-subtitle"
              >
                vs. Last Month
              </Typography>
              <Typography 
                variant="body2" 
                className="card-detail"
              >
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
              <Typography 
                variant="subtitle1" 
                className="card-title"
              >
                Payment Rate
              </Typography>
              <Typography 
                variant="body2" 
                className="card-subtitle"
              >
                vs. Last Month
              </Typography>
              <Typography 
                variant="body2" 
                className="card-detail"
              >
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
              <Typography 
                variant="subtitle1" 
                className="card-title"
              >
                Client Growth
              </Typography>
              <Typography 
                variant="body2" 
                className="card-subtitle"
              >
                vs. Last Month
              </Typography>
              <Typography 
                variant="body2" 
                className="card-detail"
              >
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
              <Typography 
                variant="subtitle1" 
                className="card-title"
              >
                Ticket Resolution
              </Typography>
              <Typography 
                variant="body2" 
                className="card-subtitle"
              >
                vs. Last Month
              </Typography>
              <Typography 
                variant="body2" 
                className="card-detail"
              >
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
