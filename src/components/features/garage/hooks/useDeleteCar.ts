import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCarApi } from '../api/garageApi';

export function useDeleteCar() {
  const queryClient = useQueryClient();

  const { mutate: deleteCar, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCarApi(id),
    onSuccess: () => {
      toast.success('Car has been successfully removed');
      queryClient.invalidateQueries({
        queryKey: ['cars'],
      });
    },
  });

  return { isDeleting, deleteCar };
}
