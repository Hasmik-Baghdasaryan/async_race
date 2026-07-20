import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createCarApi } from '../api/garageApi';

const CAR_CREATE_TOAST_ID = 'car-create';

export function useCreateCar() {
  const queryClient = useQueryClient();

  const { mutate: createCar, isPending: isCreating } = useMutation({
    mutationFn: createCarApi,
    onSuccess: (_data, { name }) => {
      toast.success(`${name} has been successfully created`, {
        id: CAR_CREATE_TOAST_ID,
      });
      queryClient.invalidateQueries({
        queryKey: ['cars'],
      });
    },
  });

  return { isCreating, createCar };
}
