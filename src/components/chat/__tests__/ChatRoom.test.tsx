import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatRoom from '../ChatRoom';
import { Chat } from '../../../types/chat.types';
import { User } from '../../../types/auth.types';

describe('ChatRoom', () => {
  const mockRoom: Chat.Room = {
    id: '1',
    name: 'Test Room',
    participants: ['user1', 'user2'],
    lastMessage: {
      id: '1',
      content: 'Hello',
      sender: 'user1',
      timestamp: new Date('2025-02-13T18:40:22.000Z').getTime(),
      type: 'text',
      status: 'delivered'
    },
    unreadCount: 2
  };

  const mockUser: User = {
    id: 'user1',
    username: 'Mojim47',
    email: 'test@example.com',
    role: 'user',
    createdAt: '2025-02-13T18:40:22.000Z'
  };

  it('renders chat room with correct information', () => {
    render(<ChatRoom room={mockRoom} currentUser={mockUser} />);

    expect(screen.getByText('Test Room')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'span' && content.includes('وضعیت: delivered');
    })).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'p' && content.includes('پیام‌های جدید: 2');
    })).toBeInTheDocument();
  });
});