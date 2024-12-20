import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatsCardProps {
  title: string;
  value: number;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, color, trend }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        height: '100%',
        bgcolor: color,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        }
      }}
    >
      <Typography 
        sx={{ 
          fontSize: 48,
          fontWeight: 800,
          color: 'text.primary',
          mb: 1,
          lineHeight: 1
        }}
      >
        {value}
      </Typography>
      <Typography 
        sx={{ 
          color: 'text.secondary',
          fontWeight: 500,
          fontSize: 20,
          mb: trend ? 1 : 0
        }}
      >
        {title}
      </Typography>
      {trend && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: trend.isPositive ? 'success.main' : 'error.main',
            mt: 'auto'
          }}
        >
          {trend.isPositive ? (
            <TrendingUpIcon sx={{ fontSize: 24 }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 24 }} />
          )}
          <Typography 
            sx={{ 
              fontWeight: 600,
              fontSize: 18
            }}
          >
            {trend.value}% from last week
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default StatsCard;
