import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteWinnerApi } from '@/features/winners';
import { HTTP_STATUS, HttpError } from '@/lib/httpClient';

import { deleteCarApi } from '../api/garageApi';

const CAR_DELETE_TOAST_ID = 'car-delete';

async function deleteCarAndWinner(id: number) {
  await deleteCarApi(id);
  try {
    await deleteWinnerApi(id);
  } catch (err) {
    if (err instanceof HttpError && err.status === HTTP_STATUS.NOT_FOUND)
      return;
    throw err;
  }
}

export function useDeleteCar() {
  const queryClient = useQueryClient();

  const { mutate: deleteCar, isPending: isDeleting } = useMutation({
    mutationFn: ({ id }: { id: number; name: string }) =>
      deleteCarAndWinner(id),
    onSuccess: (_data, { name }) => {
      toast.success(`${name} has been successfully removed`, {
        id: CAR_DELETE_TOAST_ID,
      });
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      queryClient.invalidateQueries({ queryKey: ['winners'] });
    },
  });

  return { isDeleting, deleteCar };
}
