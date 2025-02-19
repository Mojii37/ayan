import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress, Avatar, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  fetchUserProfile, 
  selectUser, 
  selectAuthLoading,
  selectAuthError
} from '../../store/slices/authSlice';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">خطا: {error}</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box p={2}>
        <Typography>کاربر یافت نشد</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 80, height: 80, mr: 2 }}
        />
        <Box>
          <Typography variant="h5" gutterBottom>
            {user.name}
          </Typography>
          <Typography color="textSecondary">
            {user.email}
          </Typography>
          {user.role && (
            <Typography variant="body2" color="primary">
              {user.role}
            </Typography>
          )}
        </Box>
      </Box>
      
      {user.createdAt && (
        <Typography variant="body2" color="textSecondary">
          تاریخ عضویت: {new Date(user.createdAt).toLocaleDateString('fa-IR')}
        </Typography>
      )}
    </Paper>
  );
};

export default UserProfile;