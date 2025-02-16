// src/pages/admin/Users.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { UsersList } from '../../components/admin/users/UsersList';
import { User, UserRole } from '../../types/user';

const Users = () => {
  // در نسخه واقعی، این داده‌ها از API دریافت می‌شوند
  const users: User[] = [];

  const handleDeleteUser = async (id: string) => {
    // حذف کاربر
    console.log('Deleting user:', id);
  };

  const handleStatusChange = async (id: string, status: string) => {
    // تغییر وضعیت کاربر
    console.log('Changing user status:', id, status);
  };

  const handleRoleChange = async (id: string, role: UserRole) => {
    // تغییر نقش کاربر
    console.log('Changing user role:', id, role);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        مدیریت کاربران
      </Typography>

      <UsersList
        users={users}
        onDelete={handleDeleteUser}
        onStatusChange={handleStatusChange}
        onRoleChange={handleRoleChange}
      />
    </Box>
  );
};

export default Users;
