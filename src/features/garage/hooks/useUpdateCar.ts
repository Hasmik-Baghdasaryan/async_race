import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { unSelectCar } from '@/features/garage/slices/selectedCarSlice';
import type { CarUpdateParams } from '@/features/garage/types';
import { useAppDispatch } from '@/store/hooks';

import { updateCarApi } from '../api/garageApi';

const CAR_UPDATE_TOAST_ID = 'car-update';

export function useUpdateCar() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { mutate: updateCar, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, body }: { id: number; body: CarUpdateParams }) =>
      updateCarApi(id, body),
    onSuccess: (_data, { body }) => {
      toast.success(`${body.name} has been successfully updated`, {
        id: CAR_UPDATE_TOAST_ID,
      });
      queryClient.invalidateQueries({
        queryKey: ['cars'],
      });
      dispatch(unSelectCar());
    },
  });

  return { isUpdating, updateCar };
}
