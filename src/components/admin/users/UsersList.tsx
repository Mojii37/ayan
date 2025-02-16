import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import { MoreVert, Edit, Delete, Search } from '@mui/icons-material';
import { User } from '../../../types/user';

interface UsersListProps {
  users: User[];
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
  onStatusChange?: (userId: string, newStatus: 'active' | 'inactive') => void;
}

export const UsersList: React.FC<UsersListProps> = ({
  users,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    user: User
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(
    user =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <TextField
        fullWidth
        margin="normal"
        placeholder="جستجوی کاربر..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>کاربر</TableCell>
              <TableCell>ایمیل</TableCell>
              <TableCell>موبایل</TableCell>
              <TableCell>نقش</TableCell>
              <TableCell>وضعیت</TableCell>
              <TableCell>آخرین ورود</TableCell>
              <TableCell>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={user.avatar} alt={user.firstName}>
                      {user.firstName[0]}
                    </Avatar>
                    <Box>{`${user.firstName} ${user.lastName}`}</Box>
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>
                  <Chip label={user.role} color="primary" size="small" />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={user.status === 'active' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleDateString('fa-IR')
                    : '---'}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={e => handleMenuClick(e, user)}
                  >
                    <MoreVert />
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
            if (selectedUser && onEdit) {
              onEdit(selectedUser.id);
            }
            handleMenuClose();
          }}
        >
          <Edit sx={{ mr: 1 }} /> ویرایش
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedUser && onStatusChange) {
              onStatusChange(
                selectedUser.id,
                selectedUser.status === 'active' ? 'inactive' : 'active'
              );
            }
            handleMenuClose();
          }}
        >
          {selectedUser?.status === 'active' ? 'غیرفعال‌سازی' : 'فعال‌سازی'}
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedUser && onDelete) {
              onDelete(selectedUser.id);
            }
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Delete sx={{ mr: 1 }} /> حذف
        </MenuItem>
      </Menu>
    </Box>
  );
};
