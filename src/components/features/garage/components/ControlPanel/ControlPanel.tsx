import { type ReactNode } from 'react';
import type { CarCreateParams } from '@/types/car';
import { useAppSelector } from '@/store/hooks';
import { selectIsRaceActive } from '@/components/features/garage/race/raceSlice';
import { selectIsAnyCarRacing } from '@/components/features/garage/engine/engineSlice';
import { useSelectedCar } from '@/components/features/garage/context/SelectedCarContext';
import { useCreateCar } from '@/components/features/garage/hooks/useCreateCar';
import { useUpdateCar } from '@/components/features/garage/hooks/useUpdateCar';

import CarForm from './CarForm/CarForm';
import RaceControl from './RaceControl/RaceControl';
import GenerateRandomCars from './GenerateRandomCars/GenerateRandomCars';

import styles from './ControlPanel.module.css';

function ControlPanel(): ReactNode {
  const { selectedCar, unSelectCar } = useSelectedCar();
  const { createCar, isCreating } = useCreateCar();
  const { updateCar, isUpdating } = useUpdateCar();
  const isRaceActive = useAppSelector(selectIsRaceActive);
  const isAnyCarRacing = useAppSelector(selectIsAnyCarRacing);
  const blockCarActions = isRaceActive || isAnyCarRacing;

  const handleSubmit = (formData: CarCreateParams) => {
    if (selectedCar) {
      updateCar(
        { id: selectedCar.id, body: formData },
        { onSuccess: () => unSelectCar() },
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
