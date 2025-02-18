import React from 'react';
import { Typography, TextField, Button } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        تنظیمات
      </Typography>
      <TextField label="نام سایت" fullWidth margin="normal" />
      <TextField label="ایمیل مدیر" fullWidth margin="normal" />
      <TextField label="شماره تماس" fullWidth margin="normal" />
      <Button variant="contained" color="primary" style={{ marginTop: 16 }}>
        ذخیره تغییرات
      </Button>
    </div>
  );
};

export default Settings;