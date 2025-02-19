import axios from 'axios';
import { ErrorService } from '../ErrorService';
import {
  ChatMessage,
  ChatResponse,
  ChatAction,
  ChatServiceError,
  ChatErrorLog
} from '../../types/chat.types';
import { ErrorSeverity, ErrorSource } from '../../types/error';

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
  ): ChatErrorLog {
    return {
      severity: ErrorSeverity.Error,
      source: ErrorSource.Client,
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
      if (process.env.NODE_ENV === 'production') {
        const response = await axios.post<ChatResponse>(this.API_URL, { message });
        return response.data;
      } else {
        return this.getMockResponse(message);
      }
    } catch (error) {
      const chatError = new Error('خطا در سرویس چت') as ChatServiceError;
      chatError.context = { originalMessage: message };

      await ErrorService.logError(
        this.createErrorLog(chatError, {
          message,
          originalError: error instanceof Error ? error.message : 'Unknown error'
        })
      );

      throw chatError;
    }
  }

  private static getMockResponse(message: string): ChatResponse {
    const mockResponses: Record<string, ChatResponse> = {
      tax: {
        text: 'آیا مایل به محاسبه مالیات هستید؟',
        suggestions: ['بله، محاسبه کن', 'خیر، سوال دیگری دارم'],
        action: {
          type: 'CALCULATE_TAX'
        },
      },
      consultation: {
        text: 'آیا می‌خواهید وقت مشاوره رزرو کنید؟',
        suggestions: ['بله، رزرو کن', 'اطلاعات بیشتر'],
        action: {
          type: 'BOOK_CONSULTATION'
        },
      },
      default: {
        text: 'چطور می‌توانم کمکتان کنم؟',
        suggestions: ['محاسبه مالیات', 'رزرو مشاوره', 'سوالات متداول'],
      },
    };

    if (this.matchesKeywords(message, this.TAX_KEYWORDS)) {
      return mockResponses.tax;
    }

    if (this.matchesKeywords(message, this.CONSULTATION_KEYWORDS)) {
      return mockResponses.consultation;
    }

    return mockResponses.default;
  }
}

export const isChatResponse = (response: unknown): response is ChatResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'text' in response &&
    typeof response.text === 'string'
  );
};