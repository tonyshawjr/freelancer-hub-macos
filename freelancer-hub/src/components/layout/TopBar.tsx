import React from 'react';
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from './SearchBar';
import { Logo } from '../common/Logo';

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

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        position: 'relative',
        zIndex: 1100
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: { xs: 64, sm: 70 },
          px: { xs: 2, sm: 4 },
          maxWidth: 'none',
          margin: '0 auto'
        }}
      >
        {/* Left Section: Menu & Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onSidebarOpen}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Logo fontSize={18} onClick={handleLogoClick} />
        </Box>

        {/* Center Section: Search (if needed) */}
        <Box sx={{ flexGrow: 1 }} />
        <SearchBar />

        {/* Right Section: Notifications & Avatar */}
        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center"
        >
          <IconButton
            size="large"
            aria-label="show notifications"
            color="primary"
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account"
            color="primary"
          >
            <AccountCircleIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default TopBar;
