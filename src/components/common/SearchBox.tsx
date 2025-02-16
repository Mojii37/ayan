import React, { useState } from 'react';
import {
  Box,
  InputBase,
  IconButton,
  Paper,
  Popper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // اینجا منطق جستجو را پیاده‌سازی کنید
    console.log('Searching for:', searchTerm);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 250,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'primary.main',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="جستجو..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onFocus={e => setAnchorEl(e.currentTarget)}
        />
        <IconButton type="submit" sx={{ p: '10px', color: 'primary.main' }}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <Popper
        open={Boolean(anchorEl) && searchTerm.length > 0}
        anchorEl={anchorEl}
        placement="bottom-start" // بررسی کنید که این مقدار صحیح است
      >
        <Paper sx={{ width: 250, maxHeight: 300, overflow: 'auto' }}>
          <List>
            <ListItem button>
              <ListItemText primary="تعليق جديد" />
            </ListItem>
          </List>
        </Paper>
      </Popper>
    </Box>
  );
};
