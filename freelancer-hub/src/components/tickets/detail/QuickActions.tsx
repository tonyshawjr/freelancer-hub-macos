import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

interface QuickActionsProps {
  onStatusChange?: (status: string) => void;
  onAction?: (action: string) => void;
}

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#6366F1',
  color: '#fff',
  borderRadius: theme.shape.borderRadius,
  padding: '12px 24px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1.25rem',
  '&:hover': {
    backgroundColor: '#4F46E5',
  },
}));

const OutlinedActionButton = styled(Button)(({ theme }) => ({
  borderColor: '#6366F1',
  color: '#6366F1',
  borderRadius: theme.shape.borderRadius,
  padding: '12px 24px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1.25rem',
  '&:hover': {
    borderColor: '#4F46E5',
    backgroundColor: 'rgba(99, 102, 241, 0.04)',
  },
}));

const QuickActions: React.FC<QuickActionsProps> = ({ onStatusChange, onAction }) => {
  const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null);
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(null);

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setStatusAnchorEl(event.currentTarget);
  };

  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setActionsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setStatusAnchorEl(null);
    setActionsAnchorEl(null);
  };

  const statuses = ['Open', 'In Progress', 'Under Review', 'Completed', 'Blocked'];

  return (
    <Box>
      <Stack spacing={2}>
        <ActionButton
          onClick={handleStatusClick}
          fullWidth
        >
          Change Status
        </ActionButton>
        <OutlinedActionButton
          onClick={handleActionsClick}
          fullWidth
          variant="outlined"
        >
          More Actions
        </OutlinedActionButton>
      </Stack>

      <Menu
        anchorEl={statusAnchorEl}
        open={Boolean(statusAnchorEl)}
        onClose={handleClose}
      >
        {statuses.map((status) => (
          <MenuItem
            key={status}
            onClick={() => onStatusChange && onStatusChange(status)}
            sx={{
              fontSize: '1rem',
              fontWeight: 500,
              py: 1.5,
              px: 2,
            }}
          >
            {status}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={actionsAnchorEl}
        open={Boolean(actionsAnchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
          onClick={() => onAction && onAction('Mark as Complete')}
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            py: 1.5,
            px: 2,
          }}
        >
          Mark as Complete
        </MenuItem>
        <MenuItem 
          onClick={() => onAction && onAction('Archive')}
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            py: 1.5,
            px: 2,
          }}
        >
          Archive
        </MenuItem>
        <MenuItem 
          onClick={() => onAction && onAction('Share')}
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            py: 1.5,
            px: 2,
          }}
        >
          Share
        </MenuItem>
        <MenuItem 
          onClick={() => onAction && onAction('Duplicate')}
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            py: 1.5,
            px: 2,
          }}
        >
          Duplicate
        </MenuItem>
        <MenuItem 
          onClick={() => onAction && onAction('Delete')}
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            py: 1.5,
            px: 2,
            color: 'error.main',
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default QuickActions;
