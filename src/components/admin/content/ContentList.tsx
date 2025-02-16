// src/components/admin/content/ContentList.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  TextField,
  Button,
  Tooltip,
} from '@mui/material';
import { Edit, MoreVert, Add, Visibility, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Content } from '../../../types/content';

interface ContentListProps {
  type: 'article' | 'tutorial';
  items: Content[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

export const ContentList: React.FC<ContentListProps> = ({
  type,
  items,
  onDelete,
  onStatusChange,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">
          مدیریت {type === 'article' ? 'مقالات' : 'آموزش‌ها'}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate(`/admin/${type}s/new`)}
        >
          افزودن {type === 'article' ? 'مقاله' : 'آموزش'} جدید
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="جستجو..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search />,
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>عنوان</TableCell>
              <TableCell>نویسنده</TableCell>
              <TableCell>دسته‌بندی</TableCell>
              <TableCell>تاریخ انتشار</TableCell>
              <TableCell>بازدید</TableCell>
              <TableCell>وضعیت</TableCell>
              <TableCell>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.author.name}</TableCell>
                <TableCell>{item.category.title}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString('fa-IR')}
                </TableCell>
                <TableCell>{item.viewCount}</TableCell>
                <TableCell>
                  <Chip
                    label={item.status}
                    color={
                      item.status === 'published'
                        ? 'success'
                        : item.status === 'draft'
                          ? 'default'
                          : 'warning'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="مشاهده">
                    <IconButton
                      size="small"
                      onClick={() =>
                        window.open(`/${type}s/${item.slug}`, '_blank')
                      }
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="ویرایش">
                    <IconButton
                      size="small"
                      onClick={() =>
                        navigate(`/admin/${type}s/${item.id}/edit`)
                      }
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    size="small"
                    onClick={e => handleMenuOpen(e, item.id)}
                  >
                    <MoreVert fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            if (selectedItem) onStatusChange(selectedItem, 'published');
            handleMenuClose();
          }}
        >
          انتشار
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedItem) onStatusChange(selectedItem, 'draft');
            handleMenuClose();
          }}
        >
          پیش‌نویس
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedItem) onDelete(selectedItem);
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          حذف
        </MenuItem>
      </Menu>
    </Paper>
  );
};
