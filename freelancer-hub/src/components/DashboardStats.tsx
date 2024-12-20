import { Box, Typography, Paper, Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const stats = [
  {
    name: 'Active Projects',
    value: '58%',
    trend: 'up',
    description: '5 of 10 projects active',
    comparison: 'vs. Last Month'
  },
  {
    name: 'Payment Rate',
    value: '100%',
    trend: 'up',
    description: '0 of 15 invoices paid',
    comparison: 'vs. Last Month'
  },
  {
    name: 'Client Growth',
    value: '0%',
    trend: 'down',
    description: '0 new clients this month',
    comparison: 'vs. Last Month'
  },
  {
    name: 'Ticket Resolution',
    value: '81%',
    trend: 'up',
    description: '5 of 32 tickets resolved',
    comparison: 'vs. Last Month'
  }
];

export default function DashboardStats() {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          fontWeight: 'bold',
          color: 'text.primary'
        }}
      >
        Your Monthly Stats
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.name}>
            <Paper>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 500,
                      color: 'text.primary'
                    }}
                  >
                    {stat.name}
                  </Typography>
                  {stat.trend === 'up' ? (
                    <TrendingUpIcon color="success" />
                  ) : (
                    <TrendingDownIcon color="error" />
                  )}
                </Box>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 'bold',
                    mb: 2
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 0.5
                  }}
                >
                  {stat.comparison}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                >
                  {stat.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
