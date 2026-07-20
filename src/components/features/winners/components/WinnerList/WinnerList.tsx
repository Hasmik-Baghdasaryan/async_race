import { WINNERS_PER_PAGE } from '@/constants/constants';
import { usePagination } from '@/hooks/usePagination';
import { useWinners } from '../../hooks/useWinners';
import { getErrorMessage } from '@/helpers/httpClient';

import Pagination from '@/components/common/Pagination/Pagination';
import WinnerHeader from './WinnerHeader/WinnerHeader';
import WinnerRow from './WinnerRow/WinnerRow';
import Loader from '@/components/common/Loader/Loader';
import Error from '@/components/common/Error/Error';
import Empty from '@/components/common/Empty/Empty';

import styles from './WinnerList.module.css';

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
