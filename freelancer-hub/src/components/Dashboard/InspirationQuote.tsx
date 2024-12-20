import { Box, Typography } from '@mui/material';

export default function InspirationQuote() {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h6" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
        "Success is not final, failure is not fatal: it is the courage to continue that counts."
      </Typography>
      <Typography variant="subtitle2" sx={{ mt: 2, color: 'text.secondary' }}>
        - Winston Churchill
      </Typography>
    </Box>
  );
}
