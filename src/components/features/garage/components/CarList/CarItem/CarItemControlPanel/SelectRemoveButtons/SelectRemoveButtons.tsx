import type { EngineStatus } from '@/types/engine';
import type { Car } from '@/types/car';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectCar,
  unSelectCar,
  getSelectedCar,
} from '@/components/features/garage/selectedCarSlice';
import { useDeleteCar } from '@/components/features/garage/hooks/useDeleteCar';
import { useCarButtonStates } from '../useCarButtonStates';

import Button from '@/components/common/Button/Button';

import styles from './SelectRemoveButtons.module.css';

interface SelectRemoveButtonsProps {
  car: Car;
  status: EngineStatus;
}

function SelectRemoveButtons({ car, status }: SelectRemoveButtonsProps) {
  const { isRacing } = useCarButtonStates(status);
  const dispatch = useAppDispatch();
  const selectedCar = useAppSelector(getSelectedCar);
  const { deleteCar } = useDeleteCar();

  const isSelected = selectedCar?.id === car.id;
  const handleSelectToggle = () =>
    dispatch(isSelected ? unSelectCar() : selectCar(car));
  const selectLabel = isSelected ? 'Unselect' : 'Select';

  return (
    <div className={styles.btnContainer}>
      <Button
        btnClass="carTrackBtn"
        onClick={handleSelectToggle}
        label={selectLabel}
        disabled={isRacing}
      />
      <Button
        btnClass="removeBtn"
        onClick={() => deleteCar(car.id)}
        label="Remove"
        disabled={isRacing}
      />
    </div>
  );
}

export default SelectRemoveButtons;
