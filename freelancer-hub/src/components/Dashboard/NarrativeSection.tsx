import { Box, Typography, CircularProgress } from '@mui/material';

export default function NarrativeSection() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
      <CircularProgress color="primary" />
    </Box>
  );
}
