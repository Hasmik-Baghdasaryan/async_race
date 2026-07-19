import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { HTTP_STATUS, HttpError } from '@/helpers/httpClient';
import { deleteWinnerApi } from '@/components/features/winners/api/winnersApi';
import { deleteCarApi } from '../api/garageApi';

async function deleteCarAndWinner(id: number) {
  await deleteCarApi(id);
  try {
    await deleteWinnerApi(id);
  } catch (err) {
    if (err instanceof HttpError && err.status === HTTP_STATUS.NOT_FOUND) return;
    throw err;
  }
}

export function useDeleteCar() {
  const queryClient = useQueryClient();

  const { mutate: deleteCar, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCarAndWinner(id),
    onSuccess: () => {
      toast.success('Car has been successfully removed');
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      queryClient.invalidateQueries({ queryKey: ['winners'] });
    },
  });

  return { isDeleting, deleteCar };
}
