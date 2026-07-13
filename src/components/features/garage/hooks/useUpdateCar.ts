import { updateCarApi } from '@/services/garageApi';
import type { CarUpdateParams } from '@/types/car';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateCar() {
  const queryClient = useQueryClient();

  const { mutate: updateCar, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, body }: { id: number; body: CarUpdateParams }) =>
      updateCarApi(id, body),
    onSuccess: () => {
      //TODO change to toast
      alert('Car has been successfully updated');
      queryClient.invalidateQueries({
        queryKey: ['cars'],
      });
    },
    // //TODO change to toast
    onError: (err) => alert(err.message),
  });

  return { isUpdating, updateCar };
}
