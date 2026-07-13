import { createCarApi } from '@/services/garageApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateCar() {
  const queryClient = useQueryClient();

  const { mutate: createCar, isPending: isCreating } = useMutation({
    mutationFn: createCarApi,
    onSuccess: () => {
      //TODO change to toast
      alert('Car has been successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cars'],
      });
    },
    // //TODO change to toast
    onError: (err) => alert(err.message),
  });

  return { isCreating, createCar };
}
