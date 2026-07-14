import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

interface UsePaginationProps {
  totalCount: number;
  itemsPerPage: number;
}
export function usePagination({
  totalCount,
  itemsPerPage,
}: UsePaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const pageCount = Math.ceil(totalCount / itemsPerPage);

  function setPage(page: number | string) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(page));
    setSearchParams(newParams);
  }

  useEffect(() => {
    if (totalCount > 0 && page > pageCount) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', String(pageCount));
      setSearchParams(newParams);
    }
  }, [page, pageCount, totalCount, searchParams, setSearchParams]);

  return { page, pageCount, setPage };
}
