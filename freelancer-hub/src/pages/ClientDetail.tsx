import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ClientDetail() {
  const { id } = useParams();

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Client Details - {id}
      </Typography>
    </Container>
  );
}
