import { createCarApi } from '@/services/garageApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateCar() {
  const queryClient = useQueryClient();

  const { mutate: createCar, isPending: isCreating } = useMutation({
    mutationFn: createCarApi,
    onSuccess: () => {
      toast.success('Car has been successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cars'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCar };
}
