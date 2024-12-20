import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Stack,
  Avatar,
  IconButton,
  Typography,
  Badge,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { mockNotifications } from '../../data/mockNotifications';
import NotificationDrawer from './NotificationDrawer';
import MobileMenu from './MobileMenu';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    handleClose();
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        bgcolor: 'white', 
        borderBottom: '1px solid',
        borderColor: 'divider',
        borderRadius: 0,
        '& .MuiToolbar-root': {
          minHeight: { xs: 64, lg: 72 }
        }
      }}
    >
      <Container maxWidth="lg">
        <Toolbar 
          disableGutters 
          sx={{ 
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {/* Left section: Logo and Navigation */}
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
            sx={{ flex: 1 }}
          >
            {isMobileOrTablet && (
              <IconButton
                onClick={toggleMobileMenu}
                sx={{ color: '#1a1a1a' }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Box component={RouterLink} to="/" sx={{ 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center',
              minWidth: 'fit-content'
            }}>
              <Typography variant="h6" sx={{ 
                color: '#6366F1', 
                fontWeight: 700, 
                fontSize: { xs: '1.25rem', lg: '1.5rem' }
              }}>
                Freelancer Hub
              </Typography>
            </Box>

            {!isMobileOrTablet && (
              <Stack 
                direction="row" 
                spacing={1} 
                sx={{ ml: 4 }}
              >
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Projects', path: '/projects' },
                  { label: 'Tickets', path: '/tickets' },
                  { label: 'Clients', path: '/clients' },
                  { label: 'Invoices', path: '/invoices' },
                  { label: 'Messages', path: '/messages' }
                ].map((link) => (
                  <Button
                    key={link.path}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: '#1a1a1a',
                      px: 2,
                      py: 1,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      minWidth: 'auto',
                      '&:hover': {
                        color: '#6366F1',
                        bgcolor: 'rgba(99, 102, 241, 0.04)',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Stack>
            )}
          </Stack>

          {/* Right section: Notifications and Profile */}
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
          >
            <IconButton 
              onClick={toggleNotifications}
              sx={{ 
                color: '#1a1a1a',
                '&:hover': { 
                  bgcolor: 'rgba(0, 0, 0, 0.04)' 
                }
              }}
            >
              <Badge 
                badgeContent={unreadCount} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: '#EF4444',
                    fontSize: '0.75rem',
                    height: 18,
                    minWidth: 18,
                    top: 2,
                    right: 2
                  }
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Box
              onClick={handleClick}
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                borderRadius: 1,
                transition: 'all 0.2s ease',
                '&:hover': { 
                  bgcolor: 'rgba(99, 102, 241, 0.04)',
                }
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ p: 1 }}>
                <Avatar 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  sx={{ 
                    width: 40, 
                    height: 40,
                    border: '2px solid',
                    borderColor: '#6366F1'
                  }}
                />
                {!isMobileOrTablet && (
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      color: '#1a1a1a',
                      fontWeight: 600,
                      fontSize: '0.875rem'
                    }}
                  >
                    Tony Shaw
                  </Typography>
                )}
              </Stack>
            </Box>

            <UserMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onLogout={handleLogout}
              userName="Tony Shaw"
            />
          </Stack>
        </Toolbar>
      </Container>

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        navigationLinks={[
          { label: 'Home', path: '/' },
          { label: 'Projects', path: '/projects' },
          { label: 'Tickets', path: '/tickets' },
          { label: 'Clients', path: '/clients' },
          { label: 'Invoices', path: '/invoices' },
          { label: 'Messages', path: '/messages' }
        ]}
      />

      {/* Notifications Drawer */}
      <NotificationDrawer
        open={notificationsOpen}
        onClose={toggleNotifications}
        notifications={mockNotifications}
      />
    </AppBar>
  );
};

export default Navbar;
