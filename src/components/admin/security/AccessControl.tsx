// src/components/admin/security/AccessControl.tsx
import React, { useState } from 'react';
import { 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Switch, 
  Button 
} from '@mui/material';

interface AccessRole {
  id: string;
  name: string;
  canCreateContent: boolean;
  canEditContent: boolean;
  canDeleteContent: boolean;
  canManageUsers: boolean;
}

export const AccessControl: React.FC = () => {
  const [roles, setRoles] = useState<AccessRole[]>([
    {
      id: 'admin',
      name: 'مدیر ارشد',
      canCreateContent: true,
      canEditContent: true,
      canDeleteContent: true,
      canManageUsers: true
    },
    {
      id: 'editor',
      name: 'ویرایشگر',
      canCreateContent: true,
      canEditContent: true,
      canDeleteContent: false,
      canManageUsers: false
    },
    {
      id: 'viewer',
      name: 'مشاهده‌کننده',
      canCreateContent: false,
      canEditContent: false,
      canDeleteContent: false,
      canManageUsers: false
    }
  ]);

  const handlePermissionToggle = (roleId: string, permission: keyof AccessRole) => {
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.id === roleId 
          ? { ...role, [permission]: !role[permission] }
          : role
      )
    );
  };

  const handleSaveRoles = () => {
    // TODO: Implement save logic to backend
    console.log('Saving access control roles:', roles);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        کنترل دسترسی
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>نقش</TableCell>
              <TableCell align="center">ایجاد محتوا</TableCell>
              <TableCell align="center">ویرایش محتوا</TableCell>
              <TableCell align="center">حذف محتوا</TableCell>
              <TableCell align="center">مدیریت کاربران</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell component="th" scope="row">
                  {role.name}
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={role.canCreateContent}
                    onChange={() => handlePermissionToggle(role.id, 'canCreateContent')}
                    disabled={role.id === 'admin'}
                  />
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={role.canEditContent}
                    onChange={() => handlePermissionToggle(role.id, 'canEditContent')}
                    disabled={role.id === 'admin'}
                  />
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={role.canDeleteContent}
                    onChange={() => handlePermissionToggle(role.id, 'canDeleteContent')}
                    disabled={role.id === 'admin'}
                  />
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={role.canManageUsers}
                    onChange={() => handlePermissionToggle(role.id, 'canManageUsers')}
                    disabled={role.id === 'admin'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSaveRoles}
        sx={{ mt: 2 }}
      >
        ذخیره تغییرات
      </Button>
    </Paper>
  );
};

export default AccessControl;