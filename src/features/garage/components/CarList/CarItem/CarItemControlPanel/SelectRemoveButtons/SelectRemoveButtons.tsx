import Button from '@/components/Button/Button';
import { useDeleteCar } from '@/features/garage/hooks/useDeleteCar';
import {
  getSelectedCar,
  selectCar,
  unSelectCar,
} from '@/features/garage/slices/selectedCarSlice';
import type { Car, EngineStatus } from '@/features/garage/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { useCarButtonStates } from '../useCarButtonStates';
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
        onClick={() => deleteCar({ id: car.id, name: car.name })}
        label="Remove"
        disabled={isRacing}
      />
    </div>
  );
}

export default SelectRemoveButtons;
