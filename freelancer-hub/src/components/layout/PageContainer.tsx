import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Box
      component="main"
      data-main-content="true"
      sx={{
        flexGrow: 1,
        minHeight: '100%',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1280px !important',
          px: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageContainer;
