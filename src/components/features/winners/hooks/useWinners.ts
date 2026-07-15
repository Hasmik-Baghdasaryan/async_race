import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import {
  WINNERS_PER_PAGE,
  WINNERS_SORT_DEFAULT,
  WINNERS_SORT_ORDER_DEFAULT,
} from '@/constants/constants';
import { useSort } from '@/hooks/useSort';
import type { SortTypes } from '@/types/winner';
import { getAllWinnersApi } from '../api/winnersApi';

export function useWinners() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { sort, order } = useSort<SortTypes>(
    WINNERS_SORT_DEFAULT,
    WINNERS_SORT_ORDER_DEFAULT,
  );

  const {
    isLoading,
    data: { winners, totalCount } = {},
    error,
  } = useQuery({
    queryKey: ['winners', page, sort, order],
    queryFn: () =>
      getAllWinnersApi({ page, limit: WINNERS_PER_PAGE, sort, order }),
  });

  return { isLoading, error, winners, totalCount };
}
