// src/components/admin/settings/NotificationSettings.tsx
import React, { useState } from 'react';
import { 
  Typography, 
  Switch, 
  FormControlLabel, 
  Button, 
  Paper, 
  Grid 
} from '@mui/material';

interface NotificationPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
}

export const NotificationSettings: React.FC = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false
  });

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    // TODO: Implement save logic to backend
    console.log('Saving notification preferences:', preferences);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        تنظیمات اعلان‌ها
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={preferences.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
            }
            label="اعلان‌های ایمیلی"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={preferences.smsNotifications}
                onChange={() => handleToggle('smsNotifications')}
              />
            }
            label="اعلان‌های پیامکی"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={preferences.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
              />
            }
            label="اعلان‌های موبایل"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={preferences.marketingEmails}
                onChange={() => handleToggle('marketingEmails')}
              />
            }
            label="ایمیل‌های بازاریابی"
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSave}
          >
            ذخیره تغییرات
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NotificationSettings;