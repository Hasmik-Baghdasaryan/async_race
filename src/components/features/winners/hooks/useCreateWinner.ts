import { createWinnerApi } from '@/services/winnersApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateWinner() {
  const queryClient = useQueryClient();

  const { mutate: createWinner, isPending: isCreating } = useMutation({
    mutationFn: createWinnerApi,
    onSuccess: () => {
      toast.success('Car has been successfully created');
      queryClient.invalidateQueries({
        queryKey: ['winners'],
      });
    },
  });

  return { isCreating, createWinner };
}
