import Button from '@/components/common/Button/Button';
import type { EngineStatus } from '@/types/engine';
import { useCarButtonStates } from '../useCarButtonStates';

import styles from './StartStopButtons.module.css';

interface StartStopButtonsProps {
  start: () => void;
  stop: () => void;
  status: EngineStatus;
}

function StartStopButtons({ start, stop, status }: StartStopButtonsProps) {
  const { startDisabled, stopEnabled, stopLabel, isStarting } =
    useCarButtonStates(status);
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
      />
    </div>
  );
}

export default StartStopButtons;
