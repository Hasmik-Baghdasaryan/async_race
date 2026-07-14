import { useSearchParams } from 'react-router';

export function useSort<T extends string>(
  defaultSort: T,
  defaultOrder: 'ASC' | 'DESC' = 'ASC',
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const sort = (sortParam ?? defaultSort) as T;

  const orderParam = searchParams.get('order');
  const order = (orderParam ?? defaultOrder) as 'ASC' | 'DESC';

  const handleSort = (newSort: T) => {
    const newParams = new URLSearchParams(searchParams);
    if (sort === newSort) {
      newParams.set('order', order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      newParams.set('sort', newSort);
      newParams.set('order', 'ASC');
    }
    setSearchParams(newParams);
  };

  return { sort, order, handleSort };
}
