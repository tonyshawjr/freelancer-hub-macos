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
      flex: 1,
      width: '100%',
      bgcolor: '#FFFFFF'
    }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#FFFFFF',
          overflowY: 'auto'
        }}
      >
        {/* Page Content */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
