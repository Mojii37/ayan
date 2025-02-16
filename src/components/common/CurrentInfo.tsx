import React from 'react';
import { getCurrentInfo } from '../../utils/getCurrentInfo';
import { Box, Typography } from '@mui/material';

interface CurrentInfoProps {
  username: string;
}

const CurrentInfo: React.FC<CurrentInfoProps> = ({ username }) => {
  const info = getCurrentInfo(username);
  const [dateTime, userLogin] = info.split('\n');

  return (
    <Box sx={{ p: 2, textAlign: 'right', direction: 'rtl' }}>
      <Typography variant="body1">{dateTime}</Typography>
      <Typography variant="body2">{userLogin}</Typography>
    </Box>
  );
};

export default CurrentInfo;