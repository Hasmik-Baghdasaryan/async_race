import { type ReactNode, type Ref } from 'react';

import CarIcon from '@/components/CarIcon/CarIcon';
import type { Car } from '@/features/garage/types';

import styles from './CarTrack.module.css';

interface CarTrackProps {
  car: Car;
  carRef: Ref<HTMLDivElement>;
  finishLineRef: Ref<HTMLDivElement>;
}

function CarTrack({ car, carRef, finishLineRef }: CarTrackProps): ReactNode {
  return (
    <div className={styles.track}>
      <div className={styles.startLine}>
        <span className={`${styles.lineText} ${styles.startText}`}>START</span>
      </div>
      <div className={styles.car} ref={carRef}>
        <CarIcon color={car.color} />
      </div>
      <div className={styles.finishLine} ref={finishLineRef}>
        <span className={`${styles.lineText} ${styles.finishText}`}>
          FINISH
        </span>
      </div>
    </div>
  );
}

export default CarTrack;
