export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: number;
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
}


export interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  lastMessage: ChatMessage;
  unreadCount: number;
}


export interface ChatState {
  rooms: ChatRoom[];
  activeRoom: string | null;
  messages: Record<string, ChatMessage[]>;
  loading: boolean;
  error: string | null;
}


export type ChatMessageType = 'text' | 'image' | 'file';
export type ChatMessageStatus = 'sent' | 'delivered' | 'read';


export type ChatTypes = {
  Message: ChatMessage;
  Room: ChatRoom;
  State: ChatState;
  MessageType: ChatMessageType;
  MessageStatus: ChatMessageStatus;
};