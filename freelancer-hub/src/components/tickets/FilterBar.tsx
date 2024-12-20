import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
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
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <MenuItem value="All">All Categories</MenuItem>
              {Object.keys(TICKET_CATEGORIES).map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              type="date"
              label="From"
              value={dateRange.start}
              onChange={(e) => handleFilterChange('dateRange', { ...dateRange, start: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              type="date"
              label="To"
              value={dateRange.end}
              onChange={(e) => handleFilterChange('dateRange', { ...dateRange, end: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleClear}
              size="small"
            >
              Clear Filters
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterBar;
