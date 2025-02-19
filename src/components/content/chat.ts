export const CHAT_CONSTANTS = {
    API: {
      BASE_URL: '/api/chat',
      ENDPOINTS: {
        SEND_MESSAGE: '/send',
        GET_HISTORY: '/history',
        GET_ROOMS: '/rooms'
      }
    },
    KEYWORDS: {
      TAX: ['مالیات', 'محاسبه', 'درآمد', 'مالیاتی'] as const,
      CONSULTATION: ['مشاوره', 'وقت', 'رزرو', 'قرار'] as const
    },
    MESSAGES: {
      ERROR: 'متأسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.',
      LOADING: 'در حال ارسال...',
      SEND: 'ارسال'
    }
  };