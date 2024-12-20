import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../navbar/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
          bgcolor: '#FFFFFF'
        }}
      >
        {/* Page Content */}
        <Box 
          sx={{ 
            p: { xs: 2, sm: 3 },
            maxWidth: '1600px',
            width: '100%',
            margin: '0 auto'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
