import type { ReactNode } from 'react';
import React from 'react';

import type { Car, EngineStatus } from '@/features/garage/types';

import styles from './CarItemControlPanel.module.css';
import SelectRemoveButtons from './SelectRemoveButtons/SelectRemoveButtons';
import StartStopButtons from './StartStopButtons/StartStopButtons';

interface CarItemControlPanelProps {
  car: Car;
  status: EngineStatus;
  start: () => void;
  stop: () => void;
}

function CarItemControlPanel({
  car,
  start,
  stop,
  status,
}: CarItemControlPanelProps): ReactNode {
  return (
    <div className={styles.controlPanel}>
      <SelectRemoveButtons car={car} status={status} />
      <StartStopButtons
        start={start}
        stop={stop}
        status={status}
        carId={car.id}
      />
    </div>
  );
}

export default React.memo(CarItemControlPanel);
