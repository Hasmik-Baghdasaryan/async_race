import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { GENERATE_CARS_COUNT } from '@/features/garage/constants';

import { generateRandomCars } from './randomCarGenerator';

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
