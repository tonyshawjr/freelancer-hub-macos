import { Box, Grid, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface MetricCardProps {
  value: string | number;
  trend: 'up' | 'down';
  title: string;
  subtitle?: string;
  detail: string;
}

const MetricCard = ({ value, trend, title, subtitle = 'vs. Last Month', detail }: MetricCardProps) => {
  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: '#F9FAFB',
      borderRadius: '12px'
    }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <Typography variant="h3" sx={{ 
            fontSize: '2.5rem', 
            fontWeight: 700,
            color: '#6366F1',
            mb: 1
          }}>
            {value}
          </Typography>
        </Grid>
        <Grid item>
          {trend === 'up' ? (
            <TrendingUpIcon sx={{ color: '#10B981' }} />
          ) : (
            <TrendingDownIcon sx={{ color: '#EF4444' }} />
          )}
        </Grid>
      </Grid>
      <Typography 
        variant="subtitle1" 
        className="card-title"
      >
        {title}
      </Typography>
      <Typography 
        variant="body2" 
        className="card-subtitle"
      >
        {subtitle}
      </Typography>
      <Typography 
        variant="body2" 
        className="card-detail"
      >
        {detail}
      </Typography>
    </Box>
  );
};

export default MetricCard;
