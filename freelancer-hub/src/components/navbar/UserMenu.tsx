import React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
  Box,
  Avatar,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

interface UserMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  userName: string;
  userAvatar: string;
}

const UserMenu: React.FC<UserMenuProps> = ({
  anchorEl,
  open,
  onClose,
  onLogout,
  userName,
  userAvatar
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          width: 220,
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
          mt: 1.5,
          '& .MuiMenuItem-root': {
            px: 2,
            py: 1.5,
            '&:hover': {
              bgcolor: 'rgba(99, 102, 241, 0.04)',
            },
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
          {userName}
        </Typography>
      </Box>
      <Divider />
      <MenuItem component={RouterLink} to="/profile">
        <ListItemIcon>
          <PersonIcon sx={{ color: '#6366F1' }} />
        </ListItemIcon>
        <Typography variant="body2">Profile</Typography>
      </MenuItem>
      <MenuItem component={RouterLink} to="/settings">
        <ListItemIcon>
          <SettingsIcon sx={{ color: '#6366F1' }} />
        </ListItemIcon>
        <Typography variant="body2">Settings</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onLogout}>
        <ListItemIcon>
          <LogoutIcon sx={{ color: '#6366F1' }} />
        </ListItemIcon>
        <Typography variant="body2">Logout</Typography>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
