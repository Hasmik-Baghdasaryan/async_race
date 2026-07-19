import { type ReactNode } from 'react';
import type { CarCreateParams } from '@/types/car';
import { useSelectedCar } from '@/components/features/garage/context/SelectedCarContext';
import { useCreateCar } from '@/components/features/garage/hooks/useCreateCar';
import { useUpdateCar } from '@/components/features/garage/hooks/useUpdateCar';
import { useGenerateRandomCars } from '../../hooks/useGenerateRandomCars';

import Button from '@/components/common/Button/Button';
import CarForm from './CarForm/CarForm';
import RaceControl from './RaceControl/RaceControl';

import styles from './ControlPanel.module.css';

function ControlPanel(): ReactNode {
  const { selectedCar, unSelectCar } = useSelectedCar();
  const { createCar, isCreating } = useCreateCar();
  const { updateCar, isUpdating } = useUpdateCar();
  const { generateCars, isGenerating } = useGenerateRandomCars();

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
      />
      <Button
        label="Create Cars"
        btnClass="createCarsBtn"
        onClick={generateCars}
        isLoading={isGenerating}
        loadingLabel="Generating..."
        disabled={isGenerating}
      />
    </div>
  );
}

export default ControlPanel;
