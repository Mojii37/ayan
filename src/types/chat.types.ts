import type { User } from './user';

export type ChatMessageType = 'text' | 'image' | 'file' | 'system' | 'action';
export type ChatMessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
export type ChatRoomType = 'private' | 'group' | 'support';

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

export interface RoomMetadata {
  avatar?: string;
  description?: string;
  isArchived: boolean;
  isPinned: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: ChatRoomType;
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
    role: 'admin' | 'member';
    joinedAt: number;
  }>;
  lastMessage: ChatMessage;
  unreadCount: number;
  metadata: RoomMetadata;
}

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
    'participants' in room &&
    Array.isArray((room as ChatRoom).participants) &&
    'lastMessage' in room &&
    'unreadCount' in room
  );
};

// Final exported type
export type ChatTypes = {
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
};

export default ChatTypes;