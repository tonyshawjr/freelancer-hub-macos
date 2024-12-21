import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Tooltip, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

interface TicketDescriptionProps {
  ticket: {
    description: string;
    dueDate: string;
    assignedTo: string;
  };
}

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  backgroundColor: '#fff',
  '& ul': {
    margin: theme.spacing(2, 0),
    paddingLeft: theme.spacing(2),
    '& li': {
      marginBottom: theme.spacing(1),
      color: theme.palette.text.primary,
      '&::marker': {
        color: theme.palette.primary.main,
      }
    }
  },
}));

const MetaBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.grey[700],
  '& .MuiSvgIcon-root': {
    fontSize: 20,
    color: theme.palette.grey[500],
  },
}));

const TicketDescription: React.FC<TicketDescriptionProps> = ({ ticket }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(ticket.description);
  const [editedDueDate, setEditedDueDate] = useState<Date | null>(
    ticket.dueDate ? new Date(ticket.dueDate) : null
  );

  const handleSave = () => {
    // TODO: Implement save logic
    setIsEditing(false);
  };

  const formatBulletPoints = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim().startsWith('-')) {
        return (
          <Box 
            key={index} 
            sx={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              mb: 1
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                mt: 1.5,
                mr: 2,
                flexShrink: 0
              }}
            />
            <Typography sx={{ fontSize: 16 }}>
              {line.trim().substring(1).trim()}
            </Typography>
          </Box>
        );
      }
      return (
        <Typography key={index} sx={{ mb: 1, fontSize: 16 }}>
          {line}
        </Typography>
      );
    });
  };

  const formatDueDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ color: 'grey.900', fontWeight: 600 }}>
          Description
        </Typography>
        {!isEditing && (
          <Tooltip title="Edit description">
            <IconButton 
              onClick={() => setIsEditing(true)}
              size="small"
              sx={{ 
                color: 'grey.400',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'primary.50'
                }
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <StyledBox>
        {isEditing ? (
          <Box>
            <Typography 
              component="div" 
              sx={{ 
                whiteSpace: 'pre-wrap',
                color: 'grey.800',
                fontSize: '0.875rem',
                lineHeight: 1.6,
              }}
            >
              {formatBulletPoints(editedDescription)}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleSave}
                sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }}
              >
                Save Changes
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => {
                  setEditedDescription(ticket.description);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        ) : (
          <Typography 
            component="div" 
            sx={{ 
              whiteSpace: 'pre-wrap',
              color: 'grey.800',
              fontSize: '0.875rem',
              lineHeight: 1.6,
            }}
          >
            {formatBulletPoints(ticket.description)}
          </Typography>
        )}

        <Stack 
          direction="row" 
          spacing={3} 
          sx={{ 
            mt: 3,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'grey.200'
          }}
        >
          <MetaBox>
            <AccessTimeIcon />
            <Typography variant="body2">
              Due {formatDueDate(ticket.dueDate)}
            </Typography>
          </MetaBox>

          <MetaBox>
            <PersonIcon />
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: '0.75rem',
                bgcolor: 'primary.main',
              }}
            >
              {ticket.assignedTo.charAt(0)}
            </Avatar>
            <Typography variant="body2">
              {ticket.assignedTo}
            </Typography>
          </MetaBox>
        </Stack>
      </StyledBox>
    </Box>
  );
};

export default TicketDescription;
