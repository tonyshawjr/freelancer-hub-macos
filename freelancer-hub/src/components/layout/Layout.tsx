import React from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const Layout: React.FC = () => {
  const location = useLocation();
  console.log('Layout rendering, current path:', location.pathname);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      bgcolor: '#FFFFFF',
      p: { xs: 2, sm: 3 }  
    }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#FFFFFF',
          overflowY: 'auto',
          marginTop: '64px',  
        }}
      >
        <Box
          sx={{
            maxWidth: '1280px',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '24px',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Layout);
