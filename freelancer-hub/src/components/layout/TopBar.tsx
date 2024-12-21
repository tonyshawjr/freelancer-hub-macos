import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Logo } from '../common/Logo';

interface TopBarProps {
  onMobileNavOpen: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMobileNavOpen }) => {
  return (
    <AppBar
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          height: 64,
          px: { xs: 2, sm: 3 }
        }}
      >
        <IconButton
          onClick={onMobileNavOpen}
          sx={{
            display: { lg: 'none' },
            mr: 2
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
