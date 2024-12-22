import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

interface ViewToggleProps {
  value: 'list' | 'board';
  onChange: (view: 'list' | 'board') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ value, onChange }) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, newValue) => newValue && onChange(newValue)}
      size="small"
      sx={{
        '& .MuiToggleButton-root': {
          border: '1px solid #E5E7EB',
          '&.Mui-selected': {
            backgroundColor: '#F3F4F6',
            color: '#6366F1',
            '&:hover': {
              backgroundColor: '#E5E7EB',
            },
          },
        },
      }}
    >
      <ToggleButton value="list">
        <ViewListIcon />
      </ToggleButton>
      <ToggleButton value="board">
        <ViewKanbanIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewToggle;
