import type { 
  ChatMessage,
  ChatRoom,
  ChatParticipant,
  RoomMetadata,
  MessageMetadata,
  ChatPagination,
  ChatFilters,
  ChatState,
  ChatResponse,
  ChatErrorLog,
  ChatErrorContext,
  ChatTypes
} from '../types/chat.types';
import { ErrorSeverity, ErrorSource } from '../types/error.types';

// Constants
export const CURRENT_USER = {
  id: 'usr_mojii37',
  username: 'Mojii37',
  name: 'Mojtaba',
  email: 'mojii37@example.com',
  avatar: 'https://github.com/Mojii37.png',
  type: 'user' as const
};

export const CURRENT_TIMESTAMP = new Date('2025-02-20T08:04:10Z').getTime();

// Message Related Mocks
export const mockMessageMetadata: MessageMetadata = {
  fileUrl: 'https://storage.ayan.com/files/doc.pdf',
  fileName: 'report.pdf',
  fileSize: 1024 * 1024,
  mimeType: 'application/pdf',
  thumbnailUrl: 'https://storage.ayan.com/thumbnails/doc.jpg'
};

export const mockMessage: ChatMessage = {
  id: `msg_${CURRENT_TIMESTAMP}`,
  content: 'سلام! چطور می‌تونم کمکتون کنم؟',
  sender: {
    id: CURRENT_USER.id,
    name: CURRENT_USER.name,
    avatar: CURRENT_USER.avatar,
    type: 'user'
  },
  timestamp: CURRENT_TIMESTAMP,
  type: 'text',
  status: 'sent',
  metadata: undefined,
  replyTo: undefined,
  editedAt: undefined
};

// Room Related Mocks
export const mockRoomMetadata: RoomMetadata = {
  avatar: 'https://storage.ayan.com/rooms/support.jpg',
  description: 'پشتیبانی فنی آیان',
  isArchived: false,
  isPinned: true,
  createdAt: CURRENT_TIMESTAMP - 86400000,
  updatedAt: CURRENT_TIMESTAMP
};

export const mockParticipant: ChatParticipant = {
  id: CURRENT_USER.id,
  name: CURRENT_USER.name,
  avatar: CURRENT_USER.avatar,
  role: 'admin',
  joinedAt: CURRENT_TIMESTAMP - 86400000
};

export const mockRoom: ChatRoom = {
  id: 'room_support',
  name: 'پشتیبانی فنی',
  type: 'support',
  participants: [mockParticipant],
  lastMessage: mockMessage,
  unreadCount: 0,
  metadata: mockRoomMetadata
};

// Pagination and Filters
export const mockPagination: ChatPagination = {
  page: 1,
  limit: 20,
  totalPages: 5,
  totalItems: 100
};

export const mockFilters: ChatFilters = {
  search: '',
  type: ['text'],
  status: ['sent', 'delivered'],
  from: CURRENT_TIMESTAMP - 604800000, // 1 week ago
  to: CURRENT_TIMESTAMP
};

// State
export const mockChatState: ChatState = {
  rooms: [mockRoom],
  activeRoom: mockRoom.id,
  messages: {
    [mockRoom.id]: [mockMessage]
  },
  loading: false,
  error: null,
  pagination: mockPagination,
  filters: mockFilters,
  typing: {
    [mockRoom.id]: {
      userId: CURRENT_USER.id,
      timestamp: CURRENT_TIMESTAMP
    }
  }
};

// Error Handling
export const mockErrorContext: ChatErrorContext = {
  component: 'ChatService',
  message: 'خطا در ارسال پیام',
  originalError: 'Network Error',
  roomId: mockRoom.id,
  messageId: mockMessage.id,
  userId: CURRENT_USER.id,
  timestamp: new Date(CURRENT_TIMESTAMP).toISOString()
};

export const mockErrorLog: ChatErrorLog = {
  severity: ErrorSeverity.ERROR,
  source: ErrorSource.CLIENT,
  message: 'خطا در ارسال پیام',
  stack: 'Error: Failed to send message\n    at ChatService.ts:42',
  context: mockErrorContext
};

// API Response
export const mockSuccessResponse: ChatResponse = {
  success: true,
  data: {
    message: mockMessage,
    room: mockRoom,
    messages: [mockMessage],
    rooms: [mockRoom],
    pagination: mockPagination
  }
};

export const mockErrorResponse: ChatResponse = {
  success: false,
  error: {
    code: 'CHAT_ERROR',
    message: 'خطا در ارسال پیام',
    details: {
      roomId: mockRoom.id,
      messageId: mockMessage.id
    }
  }
};

// Utility Functions
export const generateMessageId = () => `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`;
export const generateRoomId = () => `room_${Date.now()}_${Math.random().toString(36).slice(2)}`;

export const createMessage = (content: string, type: ChatTypes['MessageType'] = 'text'): ChatMessage => ({
  id: generateMessageId(),
  content,
  sender: {
    id: CURRENT_USER.id,
    name: CURRENT_USER.name,
    avatar: CURRENT_USER.avatar,
    type: 'user'
  },
  timestamp: Date.now(),
  type,
  status: 'pending',
  metadata: type === 'file' ? mockMessageMetadata : undefined
});

export const createRoom = (name: string, type: ChatTypes['RoomType'] = 'private'): ChatRoom => ({
  id: generateRoomId(),
  name,
  type,
  participants: [mockParticipant],
  lastMessage: mockMessage,
  unreadCount: 0,
  metadata: {
    ...mockRoomMetadata,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
});