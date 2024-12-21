import { Box, Typography } from '@mui/material';

interface LogoProps {
  fontSize?: number;
  color?: string;
  onClick?: () => void;
}

export const Logo = ({ fontSize = 24, color = '#6366F1', onClick }: LogoProps) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          opacity: 0.8,
          transition: 'opacity 0.2s'
        } : {}
      }}
      onClick={onClick}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize,
          color,
        }}
      >
        Solo
      </Typography>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize,
          color,
        }}
      >
        Studio
      </Typography>
    </Box>
  );
};
