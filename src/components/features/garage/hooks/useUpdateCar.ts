import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import type { CarUpdateParams } from '@/types/car';
import { updateCarApi } from '@/services/garageApi';

export function useUpdateCar() {
  const queryClient = useQueryClient();

  const { mutate: updateCar, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, body }: { id: number; body: CarUpdateParams }) =>
      updateCarApi(id, body),
    onSuccess: () => {
      toast.success('Car has been successfully updated');
      queryClient.invalidateQueries({
        queryKey: ['cars'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateCar };
}
