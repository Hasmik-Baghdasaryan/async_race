import Button from '@/components/Button/Button';
import { selectCarEngine } from '@/features/garage/engine/engineSlice';
import type { EngineStatus } from '@/features/garage/types';
import { useAppSelector } from '@/store/hooks';

import { useCarButtonStates } from '../useCarButtonStates';
import styles from './StartStopButtons.module.css';

interface StartStopButtonsProps {
  start: () => void;
  stop: () => void;
  status: EngineStatus;
  carId: number;
}

function StartStopButtons({
  start,
  stop,
  status,
  carId,
}: StartStopButtonsProps) {
  const { startDisabled, stopEnabled, stopLabel, isStarting } =
    useCarButtonStates(status);

  const { isResetting } = useAppSelector((state) =>
    selectCarEngine(state, carId),
  );

  return (
    <div className={styles.btnContainer}>
      <Button
        btnClass="carTrackBtn"
        onClick={start}
        label="Start"
        disabled={startDisabled}
        isLoading={isStarting}
      />
      <Button
        btnClass="stopBtn"
        onClick={stop}
        label={stopLabel}
        disabled={!stopEnabled}
        isLoading={isResetting}
      />
    </div>
  );
}

export default StartStopButtons;
