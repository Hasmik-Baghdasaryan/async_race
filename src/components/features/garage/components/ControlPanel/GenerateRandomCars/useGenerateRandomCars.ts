import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateRandomCars } from './randomCarGenerator';
import { GENERATE_CARS_COUNT } from '@/constants/constants';
import toast from 'react-hot-toast';

export function useGenerateRandomCars() {
  const queryClient = useQueryClient();

  const { mutate: generateCars, isPending: isGenerating } = useMutation({
    mutationFn: () => generateRandomCars(GENERATE_CARS_COUNT),
    onSuccess: () => {
      toast.success('Cars have been successfully created');
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });

  return { generateCars, isGenerating };
}
