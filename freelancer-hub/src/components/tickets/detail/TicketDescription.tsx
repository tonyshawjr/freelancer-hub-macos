import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Tooltip, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

interface TicketDescriptionProps {
  description: string;
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

const TicketDescription: React.FC<TicketDescriptionProps> = ({ description }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save changes
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
                  setEditedDescription(description);
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
            {formatBulletPoints(description)}
          </Typography>
        )}
      </StyledBox>
    </Box>
  );
};

export default TicketDescription;
