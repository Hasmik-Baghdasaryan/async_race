import { type ReactNode } from 'react';
import type { Car } from '@/types/car';

import CarIcon from '@/components/common/CarIcon/CarIcon';

import styles from './CarTrack.module.css';

interface CarTrackProps {
  car: Car;
}

function CarTrack({ car }: CarTrackProps): ReactNode {
  return (
    <div className={styles.track}>
      <div className={styles.startLine}>
        <span className={`${styles.lineText} ${styles.startText}`}>START</span>
      </div>
      <div className={styles.car}>
        <CarIcon color={car.color} />
      </div>
      <div className={styles.finishLine}>
        <span className={`${styles.lineText} ${styles.finishText}`}>
          FINISH
        </span>
      </div>
    </div>
  );
}

export default CarTrack;
