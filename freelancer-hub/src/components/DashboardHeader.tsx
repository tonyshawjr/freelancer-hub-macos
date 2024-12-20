import { Typography, Button, Stack, Box } from '@mui/material';

export default function DashboardHeader() {
  return (
    <Box sx={{ mb: 8, display: 'flex', gap: 8 }}>
      <Box sx={{ flex: 1 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'text.primary',
            mb: 1
          }}
        >
          Good morning, Tony
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: 'primary.main',
            mb: 2
          }}
        >
          Thursday, December 19th, 2024
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            maxWidth: '700px',
            mb: 4
          }}
        >
          You're currently juggling 5 active projects with $7,991.35 in pending
          payments waiting to be processed. There are 9 urgent tickets requiring your
          attention, so prioritize these support requests to maintain client satisfaction.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained" 
            color="primary"
          >
            View Projects
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
          >
            View Tickets
          </Button>
        </Stack>
      </Box>
      <Box 
        component="img"
        src="/dashboard-preview.png"
        sx={{ 
          width: '400px',
          height: '250px',
          objectFit: 'cover',
          borderRadius: 2,
          boxShadow: theme => theme.shadows[1]
        }}
      />
    </Box>
  );
}
