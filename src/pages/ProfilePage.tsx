import React from 'react';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  Divider 
} from '@mui/material';
import { UserProfile } from '../components/user';

const ProfilePage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
          }}
        >
          <Typography 
            variant="h4" 
            color="primary" 
            align="center" 
            gutterBottom
          >
            پروفایل کاربری
          </Typography>
          
          <Divider sx={{ mb: 3 }} />
          
          <UserProfile />
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;