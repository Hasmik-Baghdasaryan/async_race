import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import type { CarUpdateParams } from '@/types/car';

import { useSelectedCar } from '../context/SelectedCarContext';
import { updateCarApi } from '../api/garageApi';

export function useUpdateCar() {
  const queryClient = useQueryClient();
  const { unSelectCar } = useSelectedCar();

  const { mutate: updateCar, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, body }: { id: number; body: CarUpdateParams }) =>
      updateCarApi(id, body),
    onSuccess: () => {
      toast.success('Car has been successfully updated');
      queryClient.invalidateQueries({
        queryKey: ['cars'],
      });
      unSelectCar();
    },
  });

  return { isUpdating, updateCar };
}
