import SortableHeader from '@/components/SortableHeader/SortableHeader';
import {
  WINNERS_SORT_DEFAULT,
  WINNERS_SORT_ORDER_DEFAULT,
} from '@/features/winners/constants';
import type { SortTypes } from '@/features/winners/types';
import { useSort } from '@/hooks/useSort';

import styles from './WinnerHeader.module.css';

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
