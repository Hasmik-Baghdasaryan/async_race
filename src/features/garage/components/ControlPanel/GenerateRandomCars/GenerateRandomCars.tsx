import type { ReactNode } from 'react';

import Button from '@/components/Button/Button';
import { selectIsAnyCarRacing } from '@/features/garage/engine/engineSlice';
import { useAppSelector } from '@/store/hooks';

import styles from './GenerateRandomCars.module.css';
import { useGenerateRandomCars } from './useGenerateRandomCars';

function GenerateRandomCars(): ReactNode {
  const { generateCars, isGenerating } = useGenerateRandomCars();
  const isAnyCarRacing = useAppSelector(selectIsAnyCarRacing);

  return (
    <div className={styles.generateRandomCarsContainer}>
      <Button
        label="Create Cars"
        btnClass="createCarsBtn"
        onClick={generateCars}
        isLoading={isGenerating}
        loadingLabel="Generating..."
        disabled={isGenerating || isAnyCarRacing}
      />
    </div>
  );
}

export default GenerateRandomCars;
