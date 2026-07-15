import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCarApi } from '../api/garageApi';

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
  });

  return { isCreating, createCar };
}
