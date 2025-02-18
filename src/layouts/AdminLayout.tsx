import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const AdminLayout: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            پنل مدیریت
          </Typography>
          <Button color="inherit" component={RouterLink} to="/admin/articles">
            مقالات
          </Button>
          <Button color="inherit" component={RouterLink} to="/admin/settings">
            تنظیمات
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ padding: 16 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;