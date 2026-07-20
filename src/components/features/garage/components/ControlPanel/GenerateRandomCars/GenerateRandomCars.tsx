import type { ReactNode } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectIsRaceActive } from '@/components/features/garage/race/raceSlice';
import { selectIsAnyCarRacing } from '@/components/features/garage/engine/engineSlice';

import Button from '@/components/common/Button/Button';
import { useGenerateRandomCars } from './useGenerateRandomCars';

import styles from './GenerateRandomCars.module.css';

function GenerateRandomCars(): ReactNode {
  const { generateCars, isGenerating } = useGenerateRandomCars();
  const isRaceActive = useAppSelector(selectIsRaceActive);
  const isAnyCarRacing = useAppSelector(selectIsAnyCarRacing);

  return (
    <div className={styles.generateRandomCarsContainer}>
      <Button
        label="Create Cars"
        btnClass="createCarsBtn"
        onClick={generateCars}
        isLoading={isGenerating}
        loadingLabel="Generating..."
        disabled={isGenerating || isRaceActive || isAnyCarRacing}
      />
    </div>
  );
}

export default GenerateRandomCars;
