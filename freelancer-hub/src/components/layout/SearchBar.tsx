import React from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search...",
  onSearch 
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 2,
        bgcolor: '#F3F6F9',
        width: { xs: '100%', sm: 400 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <IconButton sx={{ p: 2 }}>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder={placeholder}
        onChange={handleSearch}
        sx={{
          flex: 1,
          color: 'inherit',
          '& .MuiInputBase-input': {
            width: '100%',
            py: 1,
            pr: 2,
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
