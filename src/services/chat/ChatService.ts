import axios from 'axios';
import { ErrorService } from '../ErrorService';
import { ErrorLog, ErrorSource, ErrorSeverity } from '../../types/error';

// Interfaces
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export type ChatActionType = 'REDIRECT' | 'CALCULATE_TAX' | 'BOOK_CONSULTATION';

export interface ChatAction {
  type: ChatActionType;
  payload?: unknown;
}

export interface ChatResponse {
  text: string;
  suggestions?: string[];
  action?: ChatAction;
}

// Custom error class for Chat service
export class ChatServiceError extends Error {
  constructor(
    message: string,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ChatServiceError';
  }
}

// Main Service Class
export class ChatService {
  private static readonly API_URL = '/api/chat';
  
  private static readonly TAX_KEYWORDS = [
    'مالیات',
    'محاسبه',
    'درآمد',
    'مالیاتی',
  ] as const;
  
  private static readonly CONSULTATION_KEYWORDS = [
    'مشاوره',
    'وقت',
    'رزرو',
    'قرار',
  ] as const;

  private static createErrorLog(
    error: Error,
    context: Record<string, unknown>
  ): Omit<ErrorLog, 'id' | 'timestamp'> {
    return {
      severity: 'error' as ErrorSeverity,
      source: 'client' as ErrorSource,
      message: error.message,
      stack: error.stack,
      context: {
        component: 'ChatService',
        ...context
      }
    };
  }

  private static matchesKeywords(message: string, keywords: readonly string[]): boolean {
    const lowerMessage = message.toLowerCase();
    return keywords.some(keyword => lowerMessage.includes(keyword));
  }

  static async sendMessage(message: string): Promise<ChatResponse> {
    try {
      // در نسخه production از API استفاده می‌شود
      if (process.env.NODE_ENV === 'production') {
        const response = await axios.post<ChatResponse>(this.API_URL, { message });
        return response.data;
      }

      // پیاده‌سازی mock برای محیط development
      if (this.matchesKeywords(message, this.TAX_KEYWORDS)) {
        return {
          text: 'آیا مایل به محاسبه مالیات هستید؟',
          suggestions: ['بله، محاسبه کن', 'خیر، سوال دیگری دارم'],
          action: {
            type: 'CALCULATE_TAX'
          },
        };
      }

      if (this.matchesKeywords(message, this.CONSULTATION_KEYWORDS)) {
        return {
          text: 'آیا می‌خواهید وقت مشاوره رزرو کنید؟',
          suggestions: ['بله، رزرو کن', 'اطلاعات بیشتر'],
          action: {
            type: 'BOOK_CONSULTATION'
          },
        };
      }

      return {
        text: 'چطور می‌توانم کمکتان کنم؟',
        suggestions: ['محاسبه مالیات', 'رزرو مشاوره', 'سوالات متداول'],
      };

    } catch (error) {
      const chatError = new ChatServiceError(
        'خطا در سرویس چت',
        { originalMessage: message }
      );

      await ErrorService.logError(
        this.createErrorLog(chatError, {
          message,
          originalError: error instanceof Error ? error.message : 'Unknown error'
        })
      );

      throw chatError;
    }
  }
}

// Type guard for ChatResponse
export const isChatResponse = (response: unknown): response is ChatResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'text' in response &&
    typeof (response as ChatResponse).text === 'string'
  );
};