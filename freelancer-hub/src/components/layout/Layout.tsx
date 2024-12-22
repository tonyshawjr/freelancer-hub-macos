import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

const Layout: React.FC = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      bgcolor: '#FFFFFF'
    }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#FFFFFF',
          overflowY: 'auto',
          marginTop: '40px', // Navbar margin
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

export default Layout;
