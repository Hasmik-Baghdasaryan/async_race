import { QueryClient, MutationCache } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { getErrorMessage } from '@/helpers/httpClient';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err) => {
      toast.error(getErrorMessage(err));
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
