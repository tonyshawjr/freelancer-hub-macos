import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

interface TopBarProps {
  sidebarWidth: number;
}

const TopBar: React.FC<TopBarProps> = ({ sidebarWidth }) => {
  const navigate = useNavigate();

  const handleNewProject = () => {
    navigate('/projects/new');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        ml: `${sidebarWidth}px`, 
        width: `calc(100% - ${sidebarWidth}px)`,
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        gap: 2,
        px: { xs: 2, sm: 3 }
      }}>
        <SearchBar />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewProject}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              whiteSpace: 'nowrap',
            }}
          >
            New Project
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
