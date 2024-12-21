import React from 'react';
import { Box, Typography, Avatar, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LabelIcon from '@mui/icons-material/Label';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import PersonIcon from '@mui/icons-material/Person';
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface ActivityLogProps {
  activities: Array<{
    id: string;
    type: string;
    action: string;
    user: {
      name: string;
      avatar: string;
    };
    timestamp: string;
    details?: {
      from?: string;
      to?: string;
      fileName?: string;
      fileSize?: number;
    };
  }>;
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
                    {activity.timestamp}
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
                            backgroundColor: 'rgba(99, 102, 241, 0.08)',
                            color: 'text.secondary'
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">→</Typography>
                        <Chip
                          label={activity.details.to}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(99, 102, 241, 0.08)',
                            color: 'primary.main'
                          }}
                        />
                      </Stack>
                    )}
                    {activity.details.fileName && (
                      <Box sx={{ mt: 1 }}>
                        <Chip
                          icon={<AttachFileIcon fontSize="small" />}
                          label={`${activity.details.fileName} (${activity.details.fileSize}KB)`}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(99, 102, 241, 0.08)',
                            color: 'primary.main',
                            '& .MuiChip-icon': {
                              color: 'primary.main'
                            }
                          }}
                        />
                      </Box>
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

export default ActivityLog;
