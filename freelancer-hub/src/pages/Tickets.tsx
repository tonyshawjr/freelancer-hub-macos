import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Stack,
  Divider,
  Badge
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import BugReportIcon from '@mui/icons-material/BugReport';
import EnhancementIcon from '@mui/icons-material/Lightbulb';
import { useMockDataContext } from '../context/MockDataContext';
import { useNavigate } from 'react-router-dom';

type Category = 'bug' | 'feature' | 'support' | 'urgent';
type Priority = 'high' | 'medium' | 'low';

// Priority colors matching the dashboard style
const priorityColors: Record<Priority, string> = {
  high: '#EF4444',   // Red
  medium: '#F59E0B', // Orange
  low: '#10B981'     // Green
};

// Category icons and colors
const categoryConfig: Record<Category, { Icon: React.ComponentType, color: string }> = {
  bug: { Icon: BugReportIcon, color: '#EF4444' },
  feature: { Icon: EnhancementIcon, color: '#6366F1' },
  support: { Icon: CheckCircleIcon, color: '#10B981' },
  urgent: { Icon: ErrorIcon, color: '#F59E0B' }
};

const getCategoryIcon = (category: string | null | undefined) => {
  if (!category) return null;
  const config = categoryConfig[category.toLowerCase() as Category];
  if (!config) return null;
  const IconComponent = config.Icon;
  return <IconComponent />;
};

const getCategoryColor = (category: string | null | undefined) => {
  if (!category) return '#6366F1';
  const config = categoryConfig[category.toLowerCase() as Category];
  return config?.color || '#6366F1'; // Default to indigo if category not found
};

const getPriorityColor = (priority: string | null | undefined) => {
  if (!priority) return '#6366F1';
  return priorityColors[priority.toLowerCase() as Priority] || '#6366F1'; // Default to indigo if priority not found
};

const Tickets = () => {
  const { tickets } = useMockDataContext();
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState<null | HTMLElement>(null);
  const [priorityAnchorEl, setPriorityAnchorEl] = useState<null | HTMLElement>(null);

  // Get unique categories and priorities for filters
  const categories = Array.from(new Set(tickets.map(ticket => ticket.category))).filter(Boolean);
  const priorities = Array.from(new Set(tickets.map(ticket => ticket.priority))).filter(Boolean);

  // Filter tickets based on selected filters
  const filteredTickets = tickets.filter(ticket => {
    const matchesCategory = !categoryFilter || ticket.category === categoryFilter;
    const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;
    return matchesCategory && matchesPriority;
  });

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
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}>
          <Typography variant="h4" sx={{ 
            fontSize: { xs: '1.75rem', sm: '2rem' },
            fontWeight: 700,
            color: '#1a1a1a'
          }}>
            Tickets
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/tickets/create')}
            sx={{
              bgcolor: '#6366F1',
              '&:hover': { bgcolor: '#4F46E5' },
              px: 3
            }}
          >
            New Ticket
          </Button>
        </Box>

        {/* Filters Section */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Category Filter */}
            <Box>
              <Button
                onClick={(e) => setCategoryAnchorEl(e.currentTarget)}
                startIcon={<FilterListIcon />}
                variant="outlined"
                sx={{
                  borderColor: categoryFilter ? '#6366F1' : 'divider',
                  color: categoryFilter ? '#6366F1' : 'text.primary'
                }}
              >
                {categoryFilter || 'Category'}
              </Button>
              <Menu
                anchorEl={categoryAnchorEl}
                open={Boolean(categoryAnchorEl)}
                onClose={() => setCategoryAnchorEl(null)}
              >
                <MenuItem
                  key="all-categories"
                  onClick={() => {
                    setCategoryFilter(null);
                    setCategoryAnchorEl(null);
                  }}
                >
                  All Categories
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem
                    key={`category-${category}`}
                    onClick={() => {
                      setCategoryFilter(category);
                      setCategoryAnchorEl(null);
                    }}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Priority Filter */}
            <Box>
              <Button
                onClick={(e) => setPriorityAnchorEl(e.currentTarget)}
                startIcon={<FlagIcon />}
                variant="outlined"
                sx={{
                  borderColor: priorityFilter ? '#6366F1' : 'divider',
                  color: priorityFilter ? '#6366F1' : 'text.primary'
                }}
              >
                {priorityFilter || 'Priority'}
              </Button>
              <Menu
                anchorEl={priorityAnchorEl}
                open={Boolean(priorityAnchorEl)}
                onClose={() => setPriorityAnchorEl(null)}
              >
                <MenuItem
                  key="all-priorities"
                  onClick={() => {
                    setPriorityFilter(null);
                    setPriorityAnchorEl(null);
                  }}
                >
                  All Priorities
                </MenuItem>
                {priorities.map((priority) => (
                  <MenuItem
                    key={`priority-${priority}`}
                    onClick={() => {
                      setPriorityFilter(priority);
                      setPriorityAnchorEl(null);
                    }}
                  >
                    {priority}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Active Filters */}
            {(categoryFilter || priorityFilter) && (
              <Button
                size="small"
                onClick={() => {
                  setCategoryFilter(null);
                  setPriorityFilter(null);
                }}
                sx={{ color: '#6366F1' }}
              >
                Clear Filters
              </Button>
            )}
          </Stack>
        </Box>

        {/* Tickets Grid */}
        <Grid container spacing={3}>
          {filteredTickets.map((ticket) => (
            <Grid item xs={12} key={ticket.id}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 1, color: '#1a1a1a' }}>
                      {ticket.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {ticket.description}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      {ticket.category && (
                        <Chip
                          label={ticket.category}
                          size="small"
                          icon={getCategoryIcon(ticket.category)}
                          sx={{
                            bgcolor: `${getCategoryColor(ticket.category)}15`,
                            color: getCategoryColor(ticket.category),
                            '& .MuiChip-icon': {
                              color: getCategoryColor(ticket.category)
                            }
                          }}
                        />
                      )}
                      {ticket.priority && (
                        <Chip
                          label={ticket.priority}
                          size="small"
                          icon={<FlagIcon />}
                          sx={{
                            bgcolor: `${getPriorityColor(ticket.priority)}15`,
                            color: getPriorityColor(ticket.priority),
                            '& .MuiChip-icon': {
                              color: getPriorityColor(ticket.priority)
                            }
                          }}
                        />
                      )}
                      <Typography variant="caption" color="text.secondary">
                        Created {ticket.createdAt}
                      </Typography>
                    </Stack>
                  </Box>
                  <Box>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: '#6366F1',
                        color: '#6366F1',
                        '&:hover': {
                          borderColor: '#4F46E5',
                          bgcolor: 'rgba(99, 102, 241, 0.04)'
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Tickets;
