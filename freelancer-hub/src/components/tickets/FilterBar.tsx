import React from 'react';
import { Box, TextField, Select, MenuItem, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

interface FilterBarProps {
  onFilterChange: (filters: {
    search?: string;
    status?: string;
    category?: string;
    dateRange?: {
      start: string;
      end: string;
    };
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [status, setStatus] = React.useState<string>('all');
  const [category, setCategory] = React.useState<string>('all');
  const [dateRange, setDateRange] = React.useState<{ start: string; end: string }>({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const handleFilterChange = (type: string, value: string | { start: string; end: string }) => {
    let newFilters = {};
    
    if (type === 'status') {
      setStatus(value as string);
      newFilters = { status: value };
    } else if (type === 'category') {
      setCategory(value as string);
      newFilters = { category: value };
    } else if (type === 'dateRange') {
      setDateRange(value as { start: string; end: string });
      newFilters = { dateRange: value };
    } else if (type === 'search') {
      setSearchQuery(value as string);
      newFilters = { search: value };
    }

    onFilterChange(newFilters);
  };

  const handleClear = () => {
    setStatus('all');
    setCategory('all');
    setDateRange({ start: '', end: '' });
    setSearchQuery('');
    onFilterChange({});
  };

  return (
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      mb: 3
    }}>
      <TextField
        placeholder="Search tickets..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => handleFilterChange('search', e.target.value)}
        sx={{ 
          flex: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            boxShadow: 'none',
            '& fieldset': {
              borderColor: '#E5E7EB'
            },
            '&:hover fieldset': {
              borderColor: '#D1D5DB'
            }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
        }}
      />

      <Select
        value={status}
        size="small"
        onChange={(e) => handleFilterChange('status', e.target.value)}
        sx={{ 
          width: '100px',
          backgroundColor: '#FFFFFF',
          boxShadow: 'none',
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '8px',
            borderColor: '#E5E7EB'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1D5DB'
          }
        }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="open">Open</MenuItem>
        <MenuItem value="closed">Closed</MenuItem>
      </Select>

      <Select
        value={category}
        size="small"
        onChange={(e) => handleFilterChange('category', e.target.value)}
        sx={{ 
          width: '120px',
          backgroundColor: '#FFFFFF',
          boxShadow: 'none',
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '8px',
            borderColor: '#E5E7EB'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1D5DB'
          }
        }}
      >
        <MenuItem value="all">All...</MenuItem>
        <MenuItem value="bug">Bug</MenuItem>
        <MenuItem value="feature">Feature</MenuItem>
        <MenuItem value="support">Support</MenuItem>
      </Select>

      <TextField
        placeholder="mm/d"
        size="small"
        value={dateRange.start}
        onChange={(e) => handleFilterChange('dateRange', { ...dateRange, start: e.target.value })}
        sx={{ 
          width: '100px',
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            boxShadow: 'none',
            '& fieldset': {
              borderColor: '#E5E7EB'
            },
            '&:hover fieldset': {
              borderColor: '#D1D5DB'
            }
          }
        }}
      />

      <TextField
        placeholder="mm/d"
        size="small"
        value={dateRange.end}
        onChange={(e) => handleFilterChange('dateRange', { ...dateRange, end: e.target.value })}
        sx={{ 
          width: '100px',
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            boxShadow: 'none',
            '& fieldset': {
              borderColor: '#E5E7EB'
            },
            '&:hover fieldset': {
              borderColor: '#D1D5DB'
            }
          }
        }}
      />

      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={handleClear}
        sx={{ 
          ml: 'auto',
          borderRadius: '8px',
          borderColor: '#6366F1',
          color: '#6366F1',
          boxShadow: 'none',
          textTransform: 'none',
          '&:hover': {
            borderColor: '#4F46E5',
            backgroundColor: 'rgba(99, 102, 241, 0.04)',
            boxShadow: 'none'
          }
        }}
      >
        Clear Filters
      </Button>
    </Box>
  );
};

export default FilterBar;
