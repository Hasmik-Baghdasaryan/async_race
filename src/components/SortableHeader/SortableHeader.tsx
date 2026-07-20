// components/common/SortableHeader/SortableHeader.tsx
import styles from './SortableHeader.module.css';

interface SortableHeaderProps<T extends string> {
  label: string;
  sortKey: T;
  currentSort: T;
  currentOrder: 'ASC' | 'DESC';
  onSort: (key: T) => void;
}

function SortableHeader<T extends string>({
  label,
  sortKey,
  currentSort,
  currentOrder,
  onSort,
}: SortableHeaderProps<T>) {
  const isActive = currentSort === sortKey;
  const arrow = isActive ? (currentOrder === 'ASC' ? '▲' : '▼') : '↕';

  return (
    <th
      onClick={() => onSort(sortKey)}
      className={styles.sortable}
      aria-sort={
        isActive
          ? currentOrder === 'ASC'
            ? 'ascending'
            : 'descending'
          : 'none'
      }
    >
      <span className={styles.headerContent}>
        {label}
        <span className={isActive ? styles.arrowActive : styles.arrowInactive}>
          {arrow}
        </span>
      </span>
    </th>
  );
}

export default SortableHeader;
