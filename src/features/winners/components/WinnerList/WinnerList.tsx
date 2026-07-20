import Empty from '@/components/Empty/Empty';
import Error from '@/components/Error/Error';
import Loader from '@/components/Loader/Loader';
import Pagination from '@/components/Pagination/Pagination';
import { WINNERS_PER_PAGE } from '@/features/winners/constants';
import { usePagination } from '@/hooks/usePagination';
import { getErrorMessage } from '@/lib/httpClient';

import { useWinners } from '../../hooks/useWinners';
import WinnerHeader from './WinnerHeader/WinnerHeader';
import styles from './WinnerList.module.css';
import WinnerRow from './WinnerRow/WinnerRow';

function WinnerList() {
  const { winners, totalCount = 0, isLoading, error } = useWinners();
  const { page } = usePagination({
    totalCount,
    itemsPerPage: WINNERS_PER_PAGE,
  });

  if (isLoading) return <Loader />;
  if (error) return <Error message={getErrorMessage(error)} />;
  if (!winners || !winners.length) return <Empty name="winners" />;

  return (
    <>
      <table className={styles.table}>
        <WinnerHeader />
        <tbody className={styles.tbody}>
          {winners?.map((winner, index) => (
            <WinnerRow
              winner={winner}
              index={index}
              page={page}
              key={winner.id}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.footer}>
        <p className={styles.total}>Total Winners: {totalCount}</p>
        <Pagination totalItems={totalCount} itemsPerPage={WINNERS_PER_PAGE} />
      </div>
    </>
  );
}

export default WinnerList;
