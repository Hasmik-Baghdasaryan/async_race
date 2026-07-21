import CarIcon from '@/components/CarIcon/CarIcon';
import { TIME_PRECISION } from '@/config/constants';
import { WINNERS_PER_PAGE } from '@/features/winners/constants';
import type { Winner } from '@/features/winners/types';

import styles from './WinnerRow.module.css';

interface WinnerRowProps {
  winner: Winner;
  index: number;
  page: number;
}

function WinnerRow({ winner, index, page }: WinnerRowProps) {
  return (
    <tr className={styles.row}>
      <td className={styles.column}>
        {(page - 1) * WINNERS_PER_PAGE + index + 1}
      </td>
      <td className={styles.column}>
        <CarIcon color={winner.color} width="40" height="40" />
      </td>
      <td className={styles.column}>{winner.name ?? 'Unknown'}</td>
      <td className={styles.column}>{winner.wins}</td>
      <td className={styles.column}>
        {Number.isFinite(winner.time)
          ? winner.time.toFixed(TIME_PRECISION)
          : '—'}
      </td>
    </tr>
  );
}

export default WinnerRow;
