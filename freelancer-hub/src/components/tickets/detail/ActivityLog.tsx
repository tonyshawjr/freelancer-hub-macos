import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import { Activity } from '../../../types/tickets';

interface ActivityLogProps {
  activities: Activity[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Activity Log
      </Typography>
      <List dense disablePadding>
        {activities.map((activity) => (
          <ListItem key={activity.id} disablePadding sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Box
                component="span"
                sx={{
                  width: '4px',
                  height: '4px',
                  bgcolor: 'text.secondary',
                  borderRadius: '50%',
                  mr: 1,
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {activity.user.name} {activity.action}
                  {activity.details?.from && activity.details?.to && (
                    <> from "{activity.details.from}" to "{activity.details.to}"</>
                  )}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {new Date(activity.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActivityLog;
