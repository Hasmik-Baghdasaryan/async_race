import { type ReactNode } from 'react';
import type { CarCreateParams } from '@/types/car';
import { useSelectedCar } from '@/components/features/garage/context/SelectedCarContext';
import { useCreateCar } from '@/components/features/garage/hooks/useCreateCar';
import { useUpdateCar } from '@/components/features/garage/hooks/useUpdateCar';

import Button from '@/components/common/Button/Button';
import CarForm from './CarForm/CarForm';

import styles from './ControlPanel.module.css';
import { useGenerateRandomCars } from '../../hooks/useGenerateRandomCars';

function ControlPanel(): ReactNode {
  const { selectedCar, setSelectedCar } = useSelectedCar();
  const { createCar, isCreating } = useCreateCar();
  const { updateCar, isUpdating } = useUpdateCar();
  const { generateCars, isGenerating } = useGenerateRandomCars();

  const handleSubmit = (formData: CarCreateParams) => {
    if (selectedCar) {
      updateCar(
        { id: selectedCar.id, body: formData },
        { onSuccess: () => setSelectedCar(null) },
      );
    } else {
      createCar(formData);
    }
  };

  return (
    <div className={styles.controlPanel}>
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
