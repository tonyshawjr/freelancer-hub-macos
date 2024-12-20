import React from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from './SearchBar';

interface TopBarProps {
  onSidebarOpen: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Tickets', path: '/tickets' },
    { label: 'Projects', path: '/projects' },
    { label: 'Clients', path: '/clients' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ minHeight: 70 }}>
        <IconButton
          color="inherit"
          onClick={onSidebarOpen}
          sx={{ display: { lg: 'none' }, mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            cursor: 'pointer',
            fontSize: 18
          }}
          onClick={() => navigate('/')}
        >
          Freelancer Hub
        </Typography>

        {/* Navigation Menu */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            ml: 6,
            display: { xs: 'none', md: 'flex' }
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                px: 3,
                py: 2.5,
                fontSize: 18,
                color: 'text.primary',
                fontWeight: isActive(item.path) ? 700 : 500,
                borderBottom: isActive(item.path) ? '3px solid' : '3px solid transparent',
                borderColor: isActive(item.path) ? 'primary.main' : 'transparent',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  borderBottom: '3px solid',
                  borderColor: isActive(item.path) ? 'primary.main' : 'divider',
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ ml: 2 }}
        >
          <SearchBar />
          <IconButton 
            sx={{ 
              width: 45, 
              height: 45,
              '& .MuiSvgIcon-root': {
                fontSize: 28
              }
            }}
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton 
            sx={{ 
              width: 45, 
              height: 45,
              '& .MuiSvgIcon-root': {
                fontSize: 28
              }
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
