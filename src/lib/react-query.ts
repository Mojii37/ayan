import { QueryClient, QueryCache } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : 'خطایی رخ داده است');
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
