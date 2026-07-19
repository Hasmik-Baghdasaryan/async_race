import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '@/store/hooks';
import { selectCarEngine } from '@/components/features/garage/engine/engineSlice';
import { useRecordRaceWinner } from '@/components/features/garage/race/hooks/useRecordRaceWinner';
import { MS_PER_SECOND, TIME_PRECISION } from '@/constants/constants';

import type { Car } from '@/types/car';
import styles from './WinnerModal.module.css';

interface WinnerModalProps {
  car: Car;
}

function WinnerModal({ car }: WinnerModalProps): ReactNode {
  const engine = useAppSelector((state) => selectCarEngine(state, car.id));
  const { recordWinner } = useRecordRaceWinner();
  const time = engine.distance / engine.velocity / MS_PER_SECOND;
  const hasRecordedRef = useRef(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (hasRecordedRef.current || !Number.isFinite(time)) return;
    hasRecordedRef.current = true;
    recordWinner({ carId: car.id, time });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car.id]);

  if (isClosed) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close"
          onClick={() => setIsClosed(true)}
        >
          ×
        </button>
        <p className={styles.title}>🏆 {car.name} wins!</p>
        <p className={styles.time}>
          Time: {Number.isFinite(time) ? time.toFixed(TIME_PRECISION) : '—'}s
        </p>
      </div>
    </div>,
    document.body,
  );
}

export default WinnerModal;
