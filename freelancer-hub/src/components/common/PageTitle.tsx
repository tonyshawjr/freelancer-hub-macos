import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <Typography 
      variant="h4" 
      sx={{ 
        mb: 4, 
        fontWeight: 'bold',
        color: '#1F2937'  // Consistent with Projects title color
      }}
    >
      {children}
    </Typography>
  );
};

export default PageTitle;
