import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Button,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import NotificationIcon from './NotificationIcon';
import { Notification } from '../../types/notification';

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const formatTimeAgo = (time: string) => {
  const date = new Date(time);
  const now = new Date('2024-12-19T10:01:21-05:00');
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  }
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  open,
  onClose,
  notifications
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 380 },
          p: 0,
          bgcolor: '#FFFFFF',
          borderRadius: 0
        }
      }}
    >
      <Box sx={{ 
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          fontSize: '1.25rem',
          color: '#1a1a1a'
        }}>
          Notifications
        </Typography>
        <IconButton 
          onClick={onClose}
          sx={{ 
            color: '#1a1a1a',
            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ p: 0 }}>
        {notifications.map((notification) => (
          <React.Fragment key={notification.id}>
            <ListItem 
              sx={{ 
                px: 2.5,
                py: 2,
                bgcolor: notification.read ? 'transparent' : 'rgba(99, 102, 241, 0.04)',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.02)'
                }
              }}
            >
              <Box sx={{ mr: 2 }}>
                <NotificationIcon type={notification.type} />
              </Box>
              <ListItemText
                primary={
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#1a1a1a',
                      mb: 0.5
                    }}
                  >
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary',
                        mb: 1,
                        lineHeight: 1.4
                      }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'text.disabled',
                        fontSize: '0.75rem'
                      }}
                    >
                      {formatTimeAgo(notification.time)}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button
          fullWidth
          component={RouterLink}
          to="/notifications"
          onClick={onClose}
          sx={{ 
            color: '#6366F1',
            textAlign: 'center',
            py: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
            '&:hover': { 
              bgcolor: 'rgba(99, 102, 241, 0.04)' 
            } 
          }}
        >
          View All Notifications
        </Button>
      </Box>
    </Drawer>
  );
};

export default NotificationDrawer;
