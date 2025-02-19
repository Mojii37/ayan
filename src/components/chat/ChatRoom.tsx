import React from 'react';
import { Box, Typography, Badge } from '@mui/material';
import PropTypes from 'prop-types';
import type { ChatRoom as ChatRoomType } from '../../types/chat.types';

interface ChatRoomProps {
  room: ChatRoomType;
  onSelect?: (roomId: string) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ room, onSelect }) => {
  const { id, name, lastMessage, unreadCount } = room;

  return (
    <Box
      onClick={() => onSelect?.(id)}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: 1,
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">{name}</Typography>
        {unreadCount > 0 && (
          <Badge badgeContent={unreadCount} color="primary">
            <Typography variant="body2">
              پیام‌های جدید
            </Typography>
          </Badge>
        )}
      </Box>

      {lastMessage && (
        <>
          <Typography variant="body2" color="text.secondary" noWrap>
            {lastMessage.content}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(lastMessage.timestamp).toLocaleString('fa-IR')}
          </Typography>
        </>
      )}
    </Box>
  );
};

ChatRoom.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastMessage: PropTypes.shape({
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      status: PropTypes.oneOf(['sent', 'delivered', 'read', 'failed']).isRequired,
    }),
    unreadCount: PropTypes.number.isRequired,
  }).isRequired,
  onSelect: PropTypes.func,
};

export default ChatRoom;