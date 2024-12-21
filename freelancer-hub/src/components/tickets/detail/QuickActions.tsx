import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Tooltip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface QuickActionsProps {
  ticket: {
    id: string;
    status: string;
  };
}

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
  },
}));

const StatusButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.875rem',
  minWidth: 140,
  justifyContent: 'space-between',
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
  '& .MuiButton-endIcon': {
    marginLeft: 'auto',
    marginRight: theme.spacing(-0.5),
  },
}));

const DangerButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  borderRadius: theme.shape.borderRadius,
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
  },
}));

const QuickActions: React.FC<QuickActionsProps> = ({ ticket }) => {
  const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null);

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setStatusAnchorEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setStatusAnchorEl(null);
  };

  const handleStatusChange = (newStatus: string) => {
    // Handle status change
    handleStatusClose();
  };

  const statuses = ['Open', 'In Progress', 'Under Review', 'Completed', 'Blocked'];

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Tooltip title="Change ticket status">
          <StatusButton
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleStatusClick}
            fullWidth
            variant="outlined"
            sx={{
              color: 'primary.main',
              borderColor: 'primary.main',
              borderWidth: '1px',
              borderStyle: 'solid',
              bgcolor: 'transparent',
              fontSize: '0.9375rem',
              fontWeight: 500,
              '&:hover': {
                bgcolor: 'primary.light',
                borderColor: 'primary.main'
              }
            }}
          >
            {ticket.status}
          </StatusButton>
        </Tooltip>

        
      </Stack>

      <Stack direction="row" spacing={1}>
        <Tooltip title="Archive ticket">
          <ActionButton
            startIcon={<ArchiveIcon />}
            fullWidth
            variant="outlined"
            sx={{
              color: 'primary.main',
              borderColor: 'primary.main',
              borderWidth: '1px',
              borderStyle: 'solid',
              bgcolor: 'transparent',
              fontSize: '0.9375rem',
              fontWeight: 500,
              '&:hover': {
                bgcolor: 'primary.light',
                borderColor: 'primary.main'
              }
            }}
          >
            Archive
          </ActionButton>
        </Tooltip>

        <Tooltip title="Delete ticket">
          <DangerButton
            startIcon={<DeleteOutlineIcon />}
            fullWidth
            variant="contained"
            sx={{
              bgcolor: 'error.main',
              color: 'error.contrastText',
              border: 'none',
              fontSize: '0.9375rem',
              fontWeight: 500,
              '&:hover': {
                bgcolor: 'error.dark'
              }
            }}
          >
            Delete
          </DangerButton>
        </Tooltip>
      </Stack>

      <Menu
        anchorEl={statusAnchorEl}
        open={Boolean(statusAnchorEl)}
        onClose={handleStatusClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1,
            minWidth: 180,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        {statuses.map((status) => (
          <MenuItem
            key={status}
            onClick={() => handleStatusChange(status)}
            selected={status === ticket.status}
            sx={{
              fontSize: '0.875rem',
              py: 1,
              px: 2,
              '&.Mui-selected': {
                bgcolor: 'primary.light',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.light',
                },
              },
            }}
          >
            {status === ticket.status && (
              <CheckCircleOutlineIcon
                sx={{
                  mr: 1,
                  fontSize: 18,
                  color: 'primary.main',
                }}
              />
            )}
            {status}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default QuickActions;
