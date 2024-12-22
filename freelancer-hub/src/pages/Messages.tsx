import { Typography } from '@mui/material';
import PageContainer from '../components/layout/PageContainer';

const Messages = () => {
  return (
    <PageContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Messages
      </Typography>
      {/* Add your messages page content here */}
    </PageContainer>
  );
};

export default Messages;
