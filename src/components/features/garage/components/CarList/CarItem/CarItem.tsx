import { useRef } from 'react';
import { useAppSelector } from '@/store/hooks';
import { getSelectedCar } from '@/components/features/garage/selectedCarSlice';

import CarTrack from './CarTrack/CarTrack';
import CarItemControlPanel from './CarItemControlPanel/CarItemControlPanel';
import { useCarEngine } from '../../../race/hooks/useCarEngine';

import type { Car } from '@/types/car';
import styles from './CarItem.module.css';

interface CarItemProps {
  car: Car;
}

function CarItem({ car }: CarItemProps) {
  const carRef = useRef<HTMLDivElement>(null);
  const finishLineRef = useRef<HTMLDivElement>(null);
  const { handleStart, handleStop, status } = useCarEngine({
    car,
    carRef,
    finishLineRef,
  });
  const selectedCar = useAppSelector(getSelectedCar);

  return (
    <div className={selectedCar?.id === car.id ? styles.selected : ''}>
      <h4 className={styles.title}>{car.name}</h4>
      <div className={styles.carItemWrapper}>
        <CarItemControlPanel
          car={car}
          start={handleStart}
          stop={handleStop}
          status={status}
        />
        <CarTrack car={car} carRef={carRef} finishLineRef={finishLineRef} />
      </div>
    </div>
  );
}

export default CarItem;
