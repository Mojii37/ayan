import React, { useState } from 'react'; // حذف useEffect چون استفاده نشده
import {
  Badge,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle,
  Warning,
  Error,
  Info,
  Payment,
  Message,
  VideoCall,
  Circle,
} from '@mui/icons-material';
import { Notification, NotificationType } from '../../types/notification';
import { useNavigate } from 'react-router-dom';

interface NotificationBarProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return <CheckCircle color="success" />;
    case 'warning':
      return <Warning color="warning" />;
    case 'error':
      return <Error color="error" />;
    case 'payment':
      return <Payment color="primary" />;
    case 'consultation':
      return <VideoCall color="primary" />;
    case 'message':
      return <Message color="primary" />;
    default:
      return <Info color="info" />;
  }
};

export const NotificationBar: React.FC<NotificationBarProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
    handleClose();
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: 360, maxHeight: 500 },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">اعلان‌ها</Typography>
          {unreadCount > 0 && (
            <Button size="small" onClick={onMarkAllAsRead}>
              علامت‌گذاری همه به عنوان خوانده شده
            </Button>
          )}
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <ListItem
                key={notification.id}
                button
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <ListItemIcon>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {notification.message}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, display: 'block' }}
                      >
                        {new Intl.DateTimeFormat('fa-IR', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        }).format(new Date(notification.createdAt))}
                      </Typography>
                    </Box>
                  }
                />
                {!notification.read && (
                  <Circle
                    sx={{
                      fontSize: 12,
                      color: theme.palette.primary.main,
                      ml: 1,
                    }}
                  />
                )}
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary={
                  <Typography align="center" color="text.secondary">
                    اعلان جدیدی وجود ندارد
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Popover>
    </>
  );
};
