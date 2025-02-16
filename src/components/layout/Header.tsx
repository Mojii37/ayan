import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

interface HeaderProps {
  onDrawerToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'secondary.main' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            آیان طراز
          </Typography>

          {user ? (
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Tooltip title="تنظیمات کاربری">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.firstName} src={user.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => navigate('/profile')}>
                  <Typography textAlign="center">پروفایل</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate('/settings')}>
                  <Typography textAlign="center">تنظیمات</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate('/logout')}>
                  <Typography textAlign="center">خروج</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              ورود
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
