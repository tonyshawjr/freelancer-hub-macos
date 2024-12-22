import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import PageContainer from './PageContainer';

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
        data-main-content="true"
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#FFFFFF',
          overflowY: 'auto',
        }}
      >
        <PageContainer>
          <Outlet />
        </PageContainer>
      </Box>
    </Box>
  );
};

export default Layout;
