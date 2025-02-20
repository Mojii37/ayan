import type { User } from './user.types';
import type { ErrorLog, ErrorSeverity, ErrorSource } from './error.types';

// Basic Types
export type ChatMessageType = 'text' | 'image' | 'file' | 'system' | 'action';
export type ChatMessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
export type ChatRoomType = 'private' | 'group' | 'support';

// Message Related Interfaces
export interface MessageMetadata {
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  thumbnailUrl?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    type: 'user' | 'system';
  };
  timestamp: number;
  type: ChatMessageType;
  status: ChatMessageStatus;
  metadata?: MessageMetadata;
  replyTo?: string;
  editedAt?: number;
}

// Room Related Interfaces
export interface RoomMetadata {
  avatar?: string;
  description?: string;
  isArchived: boolean;
  isPinned: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'member';
  joinedAt: number;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: ChatRoomType;
  participants: ChatParticipant[];
  lastMessage: ChatMessage;
  unreadCount: number;
  metadata: RoomMetadata;
}

// State Management
export interface ChatState {
  rooms: ChatRoom[];
  activeRoom: string | null;
  messages: Record<string, ChatMessage[]>;
  loading: boolean;
  error: string | null;
  pagination: ChatPagination;
  filters: ChatFilters;
  typing: Record<string, { userId: string; timestamp: number }>;
}

// Pagination and Filters
export interface ChatPagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface ChatFilters {
  search?: string;
  type?: ChatMessageType[];
  status?: ChatMessageStatus[];
  from?: number;
  to?: number;
}

// Error Handling
export interface ChatServiceError extends Error {
  code?: string;
  context?: Record<string, unknown>;
}

export interface ChatErrorContext {
  component: string;
  message?: string;
  originalError?: string;
  roomId?: string;
  messageId?: string;
  userId?: string;
  timestamp?: string;
  [key: string]: unknown;
}

export interface ChatErrorLog extends Omit<ErrorLog, 'context'> {
  context: ChatErrorContext;
}

// API Response
export interface ChatResponse {
  success: boolean;
  data?: {
    message?: ChatMessage;
    room?: ChatRoom;
    messages?: ChatMessage[];
    rooms?: ChatRoom[];
    pagination?: ChatPagination;
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  text?: string;
  suggestions?: string[];
  action?: {
    type: string;
    [key: string]: unknown;
  };
}

// Type Guards
export const isChatMessage = (message: unknown): message is ChatMessage => {
  return (
    typeof message === 'object' &&
    message !== null &&
    'id' in message &&
    'content' in message &&
    'sender' in message &&
    'timestamp' in message &&
    'type' in message &&
    'status' in message
  );
};

export const isChatRoom = (room: unknown): room is ChatRoom => {
  return (
    typeof room === 'object' &&
    room !== null &&
    'id' in room &&
    'name' in room &&
    'type' in room &&
    'participants' in room &&
    Array.isArray((room as ChatRoom).participants) &&
    'lastMessage' in room &&
    'unreadCount' in room &&
    'metadata' in room
  );
};

export const isChatResponse = (response: unknown): response is ChatResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    ('success' in response ||
      ('text' in response && typeof response.text === 'string'))
  );
};

// Utility Types
export type ChatAction = {
  type: 'SEND_MESSAGE' | 'DELETE_MESSAGE' | 'EDIT_MESSAGE' | 'JOIN_ROOM' | 'LEAVE_ROOM';
  payload: Record<string, unknown>;
};

// Final exported type
export interface ChatTypes {
  Message: ChatMessage;
  Room: ChatRoom;
  State: ChatState;
  MessageType: ChatMessageType;
  MessageStatus: ChatMessageStatus;
  RoomType: ChatRoomType;
  Pagination: ChatPagination;
  Filters: ChatFilters;
  MessageMetadata: MessageMetadata;
  RoomMetadata: RoomMetadata;
  ServiceError: ChatServiceError;
  ErrorLog: ChatErrorLog;
  ErrorContext: ChatErrorContext;
  Response: ChatResponse;
  Action: ChatAction;
  Participant: ChatParticipant;
}

export default ChatTypes;