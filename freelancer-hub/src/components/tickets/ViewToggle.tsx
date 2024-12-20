import React from 'react';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

interface ViewToggleProps {
  view: string;
  onViewChange: (view: string) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  const handleChange = (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      onViewChange(newView);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleChange}
        aria-label="ticket view"
        size="small"
        sx={{
          '& .MuiToggleButton-root': {
            px: 3,
            py: 1,
            '&.Mui-selected': {
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            },
          },
        }}
      >
        <ToggleButton value="all" aria-label="all tickets">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AllInboxIcon fontSize="small" />
            All Tickets
          </Box>
        </ToggleButton>
        <ToggleButton value="active" aria-label="my active tickets">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AssignmentIcon fontSize="small" />
            My Active
          </Box>
        </ToggleButton>
        <ToggleButton value="thisWeek" aria-label="due this week">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DateRangeIcon fontSize="small" />
            Due This Week
          </Box>
        </ToggleButton>
        <ToggleButton value="attention" aria-label="needs attention">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PriorityHighIcon fontSize="small" />
            Needs Attention
          </Box>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ViewToggle;
