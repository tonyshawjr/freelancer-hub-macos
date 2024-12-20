import React from 'react';
import { 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  IconButton,
  Paper,
  Divider,
  Button
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { mockNotifications } from '../data/mockNotifications';

const Notifications = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Notifications
        </Typography>
        <Button
          variant="outlined"
          startIcon={<CheckCircleIcon />}
          sx={{
            borderColor: '#6366F1',
            color: '#6366F1',
            '&:hover': {
              borderColor: '#4F46E5',
              bgcolor: 'rgba(99, 102, 241, 0.04)'
            }
          }}
        >
          Mark All as Read
        </Button>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {mockNotifications.map((notification, index) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  bgcolor: notification.read ? 'transparent' : 'rgba(99, 102, 241, 0.04)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
                secondaryAction={
                  <IconButton edge="end" aria-label="mark as read">
                    <CheckCircleIcon 
                      sx={{ 
                        color: notification.read ? '#9CA3AF' : '#6366F1'
                      }} 
                    />
                  </IconButton>
                }
              >
                <ListItemIcon sx={{ mt: 1 }}>
                  <NotificationsIcon sx={{ color: '#6366F1' }} />
                </ListItemIcon>
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {notification.message}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                      >
                        {notification.time}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < mockNotifications.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Notifications;
