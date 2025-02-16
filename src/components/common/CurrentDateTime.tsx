import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

interface CurrentDateTimeProps {
  username: string;
  initialDate?: string;
}

const CurrentDateTime: React.FC<CurrentDateTimeProps> = ({ 
  username, 
  initialDate = '2025-02-13T17:56:59.000Z' 
}) => {
  const [currentDateTime, setCurrentDateTime] = useState<string>(() => {
    const now = new Date(initialDate);
    return now.toISOString().replace('T', ' ').slice(0, 19);
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date(initialDate);
      setCurrentDateTime(now.toISOString().replace('T', ' ').slice(0, 19));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, [initialDate]);

  return (
    <Box sx={{ p: 2, textAlign: 'right', direction: 'rtl' }}>
      <Typography variant="body1" component="div">
        {`Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${currentDateTime}`}
      </Typography>
      <Typography variant="body2" component="div">
        {`Current User's Login: ${username}`}
      </Typography>
    </Box>
  );
};

export default CurrentDateTime;