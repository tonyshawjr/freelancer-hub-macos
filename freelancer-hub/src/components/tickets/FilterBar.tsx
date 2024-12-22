import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { TICKET_CATEGORIES } from '../../types/tickets';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onClearFilters }) => {
  const [status, setStatus] = React.useState('All');
  const [category, setCategory] = React.useState('All');
  const [dateRange, setDateRange] = React.useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleFilterChange = (field: string, value: any) => {
    const newValue = { [field]: value };
    if (field === 'status') setStatus(value);
    if (field === 'category') setCategory(value);
    if (field === 'dateRange') setDateRange(value);
    if (field === 'search') setSearchQuery(value);
    onFilterChange(newValue);
  };

  const handleClear = () => {
    setStatus('All');
    setCategory('All');
    setDateRange({ start: '', end: '' });
    setSearchQuery('');
    onClearFilters();
  };

  return (
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      mb: 3
    }}>
      <TextField
        fullWidth
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

      <FormControl size="small">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          label="Status"
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
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
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
          <MenuItem value="All">All Categories</MenuItem>
          {Object.keys(TICKET_CATEGORIES).map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        size="small"
        type="date"
        label="From"
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
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        size="small"
        type="date"
        label="To"
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
        InputLabelProps={{ shrink: true }}
      />

      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={handleClear}
        size="small"
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
