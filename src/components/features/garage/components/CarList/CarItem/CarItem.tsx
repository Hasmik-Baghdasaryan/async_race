import { useRef } from 'react';
import type { Car } from '@/types/car';
import { useSelectedCar } from '@/components/features/garage/context/SelectedCarContext';

import CarTrack from './CarTrack/CarTrack';
import CarItemControlPanel from './CarItemControlPanel/CarItemControlPanel';

import styles from './CarItem.module.css';
import { useCarEngine } from '../../../engine/useCarEngine';

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
  const { selectedCar } = useSelectedCar();

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
