import { Typography } from '@mui/material';
import PageContainer from '../components/layout/PageContainer';

export default function Invoices() {
  return (
    <PageContainer>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Invoices
      </Typography>
    </PageContainer>
  );
}
