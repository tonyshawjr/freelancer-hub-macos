import React from 'react';
import { Box, Typography, Stack, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Activity } from '../../../types/tickets';

interface ActivityLogProps {
  activities: Activity[];
}

const ActivityItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none'
  }
}));

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 600,
          color: 'text.primary',
          mb: 2
        }}
      >
        Activity Log
      </Typography>
      <Box
        sx={{
          backgroundColor: '#fff',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          overflow: 'hidden'
        }}
      >
        {activities.map((activity) => (
          <ActivityItem key={activity.id}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar
                src={activity.user.avatar}
                sx={{ width: 32, height: 32 }}
              >
                {!activity.user.avatar && <PersonIcon />}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 500,
                      color: 'text.primary'
                    }}
                  >
                    {activity.user.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary'
                    }}
                  >
                    {new Date(activity.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.primary'
                  }}
                >
                  {activity.action}
                </Typography>
                {activity.details && (
                  <Box sx={{ mt: 1 }}>
                    {activity.details.from && activity.details.to && (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={activity.details.from}
                          size="small"
                          sx={{
                            backgroundColor: 'error.lighter',
                            color: 'error.main'
                          }}
                        />
                        <Typography variant="body2">→</Typography>
                        <Chip
                          label={activity.details.to}
                          size="small"
                          sx={{
                            backgroundColor: 'success.lighter',
                            color: 'success.main'
                          }}
                        />
                      </Stack>
                    )}
                    {activity.details.fileName && (
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                        <AttachFileIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {activity.details.fileName}
                          {activity.details.fileSize && ` (${formatFileSize(activity.details.fileSize)})`}
                        </Typography>
                      </Stack>
                    )}
                  </Box>
                )}
              </Box>
            </Stack>
          </ActivityItem>
        ))}
      </Box>
    </Box>
  );
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export default ActivityLog;
