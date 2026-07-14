import { usePagination } from '@/hooks/usePagination';
import Button from '../Button/Button';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

function Pagination({ totalItems, itemsPerPage }: PaginationProps) {
  const {
    page: currentPage,
    pageCount,
    setPage,
  } = usePagination({
    totalCount: totalItems,
    itemsPerPage,
  });

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    setPage(next);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    setPage(prev);
  }

  if (pageCount <= 1) return null;

  return (
    <div className={styles.pagination}>
      <Button
        label="Prev"
        btnClass="paginationBtn"
        onClick={prevPage}
        disabled={currentPage === 1}
      />
      <span className={styles.count}>
        {currentPage} of {pageCount}
      </span>
      <Button
        label="Next"
        btnClass="paginationBtn"
        onClick={nextPage}
        disabled={currentPage === pageCount}
      />
    </div>
  );
}

export default Pagination;
