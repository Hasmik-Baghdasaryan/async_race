import SortableHeader from '@/components/common/SortableHeader/SortableHeader';
import styles from './WinnerHeader.module.css';
import { useSort } from '@/hooks/useSort';
import type { SortTypes } from '@/types/winner';
import {
  WINNERS_SORT_DEFAULT,
  WINNERS_SORT_ORDER_DEFAULT,
} from '@/constants/constants';

function WinnerHeader() {
  const { sort, order, handleSort } = useSort<SortTypes>(
    WINNERS_SORT_DEFAULT,
    WINNERS_SORT_ORDER_DEFAULT,
  );
  return (
    <thead className={styles.thead}>
      <tr>
        <th>N:</th>
        <th>Car</th>
        <th>Name</th>
        <SortableHeader
          label="Wins"
          sortKey="wins"
          currentSort={sort}
          currentOrder={order}
          onSort={handleSort}
        />
        <SortableHeader
          label="Best Time"
          sortKey="time"
          currentSort={sort}
          currentOrder={order}
          onSort={handleSort}
        />
      </tr>
    </thead>
  );
}

export default WinnerHeader;
