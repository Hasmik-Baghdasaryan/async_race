import React from 'react';
import type { ReactNode } from 'react';
import type { Car } from '@/types/car';

import { useSelectedCar } from '@/components/features/garage/context/SelectedCarContext';
import { useDeleteCar } from '@/components/features/garage/hooks/useDeleteCar';

import Button from '@/components/common/Button/Button';

import styles from './CarItemControlPanel.module.css';

interface CarItemControlPanelProps {
  car: Car;
}

function CarItemControlPanel({ car }: CarItemControlPanelProps): ReactNode {
  const { selectedCar, selectCar, unSelectCar } = useSelectedCar();
  const { deleteCar } = useDeleteCar();

  return (
    <div className={styles.controlPanel}>
      <div className={styles.btnContainer}>
        <Button
          btnClass="carTrackBtn"
          onClick={() => (selectedCar ? unSelectCar() : selectCar(car))}
          label={selectedCar ? 'Unselect' : 'Select'}
        />
        <Button
          btnClass="removeBtn"
          onClick={() => deleteCar(car.id)}
          label="Remove"
        />
      </div>
      <div className={styles.btnContainer}>
        <Button btnClass="carTrackBtn" onClick={() => {}} label="Start" />
        <Button btnClass="stopBtn" onClick={() => {}} label="Stop" />
      </div>
    </div>
  );
}

export default React.memo(CarItemControlPanel);
