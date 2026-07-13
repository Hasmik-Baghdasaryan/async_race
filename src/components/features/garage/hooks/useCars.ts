import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

import { getAllCarsApi } from '@/services/garageApi';
import { CARS_PER_PAGE } from '@/constants/constants';

export function useCars() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: { cars, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ['cars', page],
    queryFn: () => getAllCarsApi(page, CARS_PER_PAGE),
  });

  return { isLoading, cars, error, totalCount };
}
