import React from 'react';
import { Box, Drawer } from '@mui/material';

interface SidebarProps {
  width: number;
}

const Sidebar: React.FC<SidebarProps> = ({ width }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        {/* Sidebar content goes here */}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
