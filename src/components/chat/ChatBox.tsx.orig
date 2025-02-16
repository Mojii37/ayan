import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatAction {
  type: 'CALCULATE_TAX' | 'BOOK_CONSULTATION' | string;
  payload?: Record<string, unknown>;
}

const ChatBox: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleAction = useCallback(
    (action: ChatAction) => {
      switch (action.type) {
        case 'CALCULATE_TAX':
          navigate('/tax-calculator');
          break;
        case 'BOOK_CONSULTATION':
          navigate('/consultation');
          break;
        default:
          console.log('Unknown action:', action.type);
      }
    },
    [navigate]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    const botResponse: ChatAction = { type: 'CALCULATE_TAX' };
    handleAction(botResponse);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <List sx={{ height: 400, overflow: 'auto' }}>
        {messages.map(message => (
          <ListItem
            key={message.id}
            sx={{
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 1,
                bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100',
              }}
            >
              <ListItemText
                primary={message.text}
                secondary={message.timestamp.toLocaleTimeString('fa-IR')}
              />
            </Paper>
          </ListItem>
        ))}
      </List>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="پیام خود را بنویسید..."
          variant="outlined"
          size="small"
        />
        <Button type="submit" variant="contained" sx={{ mt: 1 }} fullWidth>
          ارسال
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatBox;