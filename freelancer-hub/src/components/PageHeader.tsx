import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
  };
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, icon: Icon, action }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {Icon && (
          <Icon
            size={32}
            style={{ 
              color: theme => theme.palette.text.primary,
              opacity: 0.8
            }}
          />
        )}
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold',
              color: 'text.primary',
              lineHeight: 1.2
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant="body2"
              sx={{ 
                mt: 0.5,
                color: 'text.secondary'
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {action && (
        <Button
          variant="contained"
          onClick={action.onClick}
          startIcon={action.icon && <action.icon size={20} />}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            px: 2,
            py: 1,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            '& .MuiButton-startIcon': {
              mr: 1
            }
          }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
};

export default PageHeader;
