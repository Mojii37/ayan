import React from 'react';
import { Container } from '@mui/material';
import { UserProfile } from '../components/user';

const ProfilePage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <UserProfile />
    </Container>
  );
};

export default ProfilePage;