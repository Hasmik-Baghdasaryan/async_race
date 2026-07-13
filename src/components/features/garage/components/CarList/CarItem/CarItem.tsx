import type { Car } from '@/types/car';
import { useSelectedCar } from '@/components/features/garage/context/SelectedCarContext';

import CarTrack from './CarTrack/CarTrack';
import CarItemControlPanel from './CarItemControlPanel/CarItemControlPanel';

import styles from './CarItem.module.css';

interface CarItemProps {
  car: Car;
}

function CarItem({ car }: CarItemProps) {
  const { selectedCar } = useSelectedCar();
  return (
    <div className={selectedCar?.id === car.id ? styles.selected : ''}>
      <h4 className={styles.title}>{car.name}</h4>
      <div className={styles.carItemWrapper}>
        <CarItemControlPanel car={car} />
        <CarTrack car={car} />
      </div>
    </div>
  );
}

export default CarItem;
