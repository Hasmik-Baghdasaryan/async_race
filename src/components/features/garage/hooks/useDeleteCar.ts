import { deleteCarApi } from '@/services/garageApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteCar() {
  const queryClient = useQueryClient();

  const { mutate: deleteCar, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCarApi(id),
    onSuccess: () => {
      //TODO change to toast
      alert('Car has been successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['cars'],
      });
    },
    // //TODO change to toast
    onError: (err) => alert(err.message),
  });

  return { isDeleting, deleteCar };
}
