import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Stack,
  Avatar,
  IconButton,
  Typography,
  Badge,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { mockNotifications } from '../../data/mockNotifications';
import { navigationLinks } from '../../data/navigationLinks';
import NotificationDrawer from './NotificationDrawer';
import MobileMenu from './MobileMenu';
import UserMenu from './UserMenu';
import { Logo } from '../common/Logo';
import { useUserSettings } from '../../stores/userSettings';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const location = useLocation();
  const { firstName, lastName } = useUserSettings();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

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
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : 'Tony Shaw';
  const initials = firstName && lastName ? `${firstName[0]}${lastName[0]}` : 'TS';

  return (
    <Box sx={{ position: 'relative', zIndex: 1200 }}>
      <AppBar 
        position="fixed"
        elevation={0}
        sx={{ 
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Toolbar sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: { xs: 64, sm: 70 },
            width: '100%',
            margin: '0 auto',
            px: { xs: 2, sm: 3 }
          }}>
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
              
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                minWidth: 'fit-content'
              }}>
                <Logo fontSize={24} />
              </Box>

              {!isMobileOrTablet && (
                <Stack 
                  direction="row" 
                  spacing={1} 
                  sx={{ ml: 4 }}
                >
                  {navigationLinks.map((link) => (
                    <Button
                      key={link.path}
                      component={RouterLink}
                      to={link.path}
                      sx={{
                        color: '#1a1a1a',
                        px: 2,
                        py: 1,
                        fontSize: 18,
                        fontWeight: isActive(link.path) ? 700 : 500,
                        minWidth: 'auto',
                        position: 'relative',
                        bgcolor: isActive(link.path) ? 'rgba(99, 102, 241, 0.04)' : 'transparent',
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
                  >
                    {initials}
                  </Avatar>
                  {!isMobileOrTablet && (
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: '#1a1a1a',
                        fontWeight: 600,
                        fontSize: '0.875rem'
                      }}
                    >
                      {fullName}
                    </Typography>
                  )}
                </Stack>
              </Box>

              <UserMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onLogout={handleLogout}
                userName={fullName}
              />
            </Stack>
          </Toolbar>
        </Box>
      </AppBar>

      <Toolbar /> {/* Add spacer for fixed AppBar */}

      {/* Mobile Navigation Drawer */}
      <MobileMenu 
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        navigationLinks={navigationLinks}
      />

      {/* Notifications Drawer */}
      <NotificationDrawer 
        open={notificationsOpen}
        onClose={toggleNotifications}
        notifications={mockNotifications}
      />
    </Box>
  );
};

export default Navbar;
