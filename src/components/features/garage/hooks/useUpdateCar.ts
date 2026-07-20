import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import type { CarUpdateParams } from '@/types/car';

import { useAppDispatch } from '@/store/hooks';
import { unSelectCar } from '../selectedCarSlice';
import { updateCarApi } from '../api/garageApi';

export function useUpdateCar() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { mutate: updateCar, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, body }: { id: number; body: CarUpdateParams }) =>
      updateCarApi(id, body),
    onSuccess: () => {
      toast.success('Car has been successfully updated');
      queryClient.invalidateQueries({
        queryKey: ['cars'],
      });
      dispatch(unSelectCar());
    },
  });

  return { isUpdating, updateCar };
}
