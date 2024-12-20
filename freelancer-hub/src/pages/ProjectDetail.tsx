import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ProjectDetail() {
  const { id } = useParams();

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Project Details - {id}
      </Typography>
    </Container>
  );
}
