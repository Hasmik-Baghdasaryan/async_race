import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

import { CARS_PER_PAGE } from '@/constants/constants';
import { usePagination } from '@/hooks/usePagination';
import { getAllCarsApi } from '../api/garageApi';

export function useCars() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: { cars, totalCount = 0 } = {},
    error,
  } = useQuery({
    queryKey: ['cars', page],
    queryFn: () => getAllCarsApi(page, CARS_PER_PAGE),
  });

  const { pageCount } = usePagination({
    totalCount,
    itemsPerPage: CARS_PER_PAGE,
  });

  //Pre-fetching
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['cars', page + 1],
      queryFn: () => getAllCarsApi(page + 1, CARS_PER_PAGE),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['cars', page - 1],
      queryFn: () => getAllCarsApi(page - 1, CARS_PER_PAGE),
    });

  return { isLoading, cars, error, totalCount };
}
