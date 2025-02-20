import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ChatResponse,
  ChatAction,
  ChatServiceError
} from '../../types/chat.types';

// نوع استیت چت
interface ChatState {
  currentResponse?: ChatResponse;
  loading: boolean;
  error?: string;
}

// تابع اولیه استیت
const initialState: ChatState = {
  loading: false,
};

// کلمات کلیدی
const TAX_KEYWORDS = [
  'مالیات',
  'محاسبه',
  'درآمد',
  'مالیاتی',
] as const;

const CONSULTATION_KEYWORDS = [
  'مشاوره',
  'وقت',
  'رزرو',
  'قرار',
] as const;

// تابع تطبیق کلمات کلیدی
const matchesKeywords = (message: string, keywords: readonly string[]): boolean => {
  const lowerMessage = message.toLowerCase();
  return keywords.some(keyword => lowerMessage.includes(keyword));
};

// اسلایس چت
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: {
      reducer: (state, action: PayloadAction<string>) => {
        const message = action.payload;
        state.loading = true;
        state.error = undefined;

        try {
          state.currentResponse = getMockResponse(message);
          state.loading = false;
        } catch (error) {
          state.loading = false;
          state.error = error instanceof Error ? error.message : 'خطای ناشناخته';
        }
      },
      prepare: (message: string) => ({ payload: message })
    }
  }
});

// پاسخ‌های موک
const getMockResponse = (message: string): ChatResponse => {
  const mockResponses = {
    tax: {
      text: 'آیا مایل به محاسبه مالیات هستید؟',
      suggestions: ['بله، محاسبه کن', 'خیر، سوال دیگری دارم'],
      action: {
        type: 'CALCULATE_TAX'
      }
    },
    consultation: {
      text: 'آیا می‌خواهید وقت مشاوره رزرو کنید؟',
      suggestions: ['بله، رزرو کن', 'اطلاعات بیشتر'],
      action: {
        type: 'BOOK_CONSULTATION'
      }
    },
    default: {
      text: 'چطور می‌توانم کمکتان کنم؟',
      suggestions: ['محاسبه مالیات', 'رزرو مشاوره', 'سوالات متداول'],
    },
  };

  if (matchesKeywords(message, TAX_KEYWORDS)) {
    return mockResponses.tax;
  }

  if (matchesKeywords(message, CONSULTATION_KEYWORDS)) {
    return mockResponses.consultation;
  }

  return mockResponses.default;
};

export const { sendMessage } = chatSlice.actions;
export default chatSlice.reducer;