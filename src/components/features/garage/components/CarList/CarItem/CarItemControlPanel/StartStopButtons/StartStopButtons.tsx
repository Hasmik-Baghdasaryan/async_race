import Button from '@/components/common/Button/Button';
import type { EngineStatus } from '@/types/engine';
import { useCarButtonStates } from '../useCarButtonStates';

import styles from './StartStopButtons.module.css';
import { useAppSelector } from '@/store/hooks';
import { selectCarEngine } from '@/components/features/garage/engine/engineSlice';

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
