import React from 'react';
import { Box, Typography, Badge } from '@mui/material';
import type { ChatRoom as ChatRoomType } from '../../types/chat.types';
import type { User } from '../../types/auth.types';

interface ChatRoomProps {
  room: ChatRoomType;
  currentUser: User;
}

// اضافه کردن پیشوند _ به currentUser چون استفاده نشده
const ChatRoom: React.FC<ChatRoomProps> = ({ room, _currentUser }) => {
  const { name, lastMessage, unreadCount } = room;

  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: 1,
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">{name}</Typography>
        <Badge badgeContent={unreadCount} color="primary">
          <Typography variant="body2">
            پیام‌های جدید: {unreadCount}
          </Typography>
        </Badge>
      </Box>

      <Typography variant="body2" color="text.secondary">
        {lastMessage.content}
      </Typography>

      <Typography variant="caption" color="text.secondary">
        وضعیت: {lastMessage.status}
      </Typography>
    </Box>
  );
};

export default ChatRoom;