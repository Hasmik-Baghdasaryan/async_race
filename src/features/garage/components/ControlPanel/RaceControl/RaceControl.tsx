import type { ReactNode } from 'react';

import Button from '@/components/Button/Button';
import { useCars } from '@/features/garage/hooks/useCars';
import { useRaceRegistry } from '@/features/garage/race/context/RaceRegistryContext';
import {
  raceReset,
  raceStarted,
  selectIsRaceActive,
} from '@/features/garage/race/raceSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import styles from './RaceControl.module.css';

function RaceControl(): ReactNode {
  const dispatch = useAppDispatch();
  const isRaceActive = useAppSelector(selectIsRaceActive);
  const { startAll, stopAll } = useRaceRegistry();
  const { totalCount } = useCars();

  if (totalCount === 0) return null;

  const handleRace = () => {
    dispatch(raceStarted());
    startAll();
  };

  const handleReset = () => {
    dispatch(raceReset());
    stopAll();
  };

  return (
    <div className={styles.raceControlContainer}>
      <Button
        label="Race"
        btnClass="raceBtn"
        onClick={handleRace}
        disabled={isRaceActive}
      />
      <Button
        label="Reset"
        btnClass="resetBtn"
        onClick={handleReset}
        disabled={!isRaceActive}
      />
    </div>
  );
}

export default RaceControl;
