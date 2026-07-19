import type { ReactNode } from 'react';

import Button from '@/components/common/Button/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  raceStarted,
  raceReset,
  selectIsRaceActive,
} from '@/components/features/garage/race/raceSlice';

import styles from './RaceControl.module.css';

function RaceControl(): ReactNode {
  const dispatch = useAppDispatch();
  const isRaceActive = useAppSelector(selectIsRaceActive);

  return (
    <div className={styles.raceControlContainer}>
      <Button
        label="Race"
        btnClass="raceBtn"
        onClick={() => dispatch(raceStarted())}
        disabled={isRaceActive}
      />
      <Button
        label="Reset"
        btnClass="resetBtn"
        onClick={() => dispatch(raceReset())}
        disabled={!isRaceActive}
      />
    </div>
  );
}

export default RaceControl;
