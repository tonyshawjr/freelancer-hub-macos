import { Box, Typography, Grid, Paper } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

const actions = [
  {
    name: 'Create Invoice',
    icon: ReceiptIcon,
    href: '/invoices/new'
  },
  {
    name: 'New Project',
    icon: AddIcon,
    href: '/projects/new'
  },
  {
    name: 'Send Message',
    icon: SendIcon,
    href: '/messages/new'
  }
];

export default function QuickActions() {
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
        Quick Actions
      </Typography>
      <Grid container spacing={3}>
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Grid item xs={12} sm={4} key={action.name}>
              <Paper
                component="a"
                href={action.href}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: theme => theme.transitions.create(['box-shadow']),
                  '&:hover': {
                    boxShadow: theme => theme.shadows[2]
                  }
                }}
              >
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon sx={{ color: 'primary.main', mr: 2 }} />
                    <Typography 
                      variant="subtitle1"
                      sx={{
                        color: 'text.primary',
                        fontWeight: 500
                      }}
                    >
                      {action.name}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
