import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import {
  Refresh,
  Save,
  RestartAlt,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const StateManager: React.FC = () => {
  const state = useSelector((state: RootState) => state);

  const handleResetState = () => {
    // اینجا می‌توانید state را ریست کنید
  };

  const handleExportState = () => {
    const stateJson = JSON.stringify(state, null, 2);
    const blob = new Blob([stateJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `state-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">مدیریت وضعیت</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Save />}
            onClick={handleExportState}
          >
            خروجی JSON
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<RestartAlt />}
            onClick={handleResetState}
          >
            ریست
          </Button>
        </Box>
      </Box>

      <List>
        {Object.entries(state).map(([key, value]) => (
          <React.Fragment key={key}>
            <ListItem>
              <ListItemText
                primary={key}
                secondary={`تعداد فیلدها: ${Object.keys(value).length}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => {
                    // اینجا می‌توانید اکشن‌های مربوط به هر reducer را اجرا کنید
                  }}
                >
                  <Refresh />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};