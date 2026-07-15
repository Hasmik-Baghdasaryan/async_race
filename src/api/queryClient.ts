import { QueryClient, MutationCache } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { HttpError } from '@/helpers/httpClient';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err) => {
      toast.error(
        err instanceof HttpError
          ? err.userMessage
          : 'Something went wrong. Please try again.',
      );
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 1,
    },
  },
});

export default queryClient;
