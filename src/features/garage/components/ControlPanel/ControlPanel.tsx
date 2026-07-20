import { type ReactNode } from 'react';

import { selectIsAnyCarRacing } from '@/features/garage/engine/engineSlice';
import { useCreateCar } from '@/features/garage/hooks/useCreateCar';
import { useUpdateCar } from '@/features/garage/hooks/useUpdateCar';
import { selectIsRaceActive } from '@/features/garage/race/raceSlice';
import {
  getSelectedCar,
  unSelectCar,
} from '@/features/garage/slices/selectedCarSlice';
import type { CarCreateParams } from '@/features/garage/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import CarForm from './CarForm/CarForm';
import styles from './ControlPanel.module.css';
import GenerateRandomCars from './GenerateRandomCars/GenerateRandomCars';
import RaceControl from './RaceControl/RaceControl';

function ControlPanel(): ReactNode {
  const dispatch = useAppDispatch();
  const selectedCar = useAppSelector(getSelectedCar);
  const { createCar, isCreating } = useCreateCar();
  const { updateCar, isUpdating } = useUpdateCar();
  const isRaceActive = useAppSelector(selectIsRaceActive);
  const isAnyCarRacing = useAppSelector(selectIsAnyCarRacing);
  const blockCarActions = isRaceActive || isAnyCarRacing;

  const handleSubmit = (formData: CarCreateParams) => {
    if (selectedCar) {
      updateCar(
        { id: selectedCar.id, body: formData },
        { onSuccess: () => dispatch(unSelectCar()) },
      );
    } else {
      createCar(formData);
    }
  };

  return (
    <div className={styles.controlPanel}>
      <RaceControl />
      <CarForm
        key={selectedCar?.id || 'create'}
        value={selectedCar}
        onSubmit={handleSubmit}
        isLoading={isCreating || isUpdating}
        disabled={blockCarActions}
      />
      <GenerateRandomCars />
    </div>
  );
}

export default ControlPanel;
