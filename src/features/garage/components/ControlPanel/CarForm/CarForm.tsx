import type { ReactNode } from 'react';

import Button from '@/components/Button/Button';
import Error from '@/components/Error/Error';
import { CAR_NAME_MAX_LENGTH } from '@/features/garage/constants';
import type { Car, CarCreateParams } from '@/features/garage/types';

import styles from './CarFrom.module.css';
import { useCarFormLogic } from './useCarFormLogic';

export interface CarFormProps {
  value?: Car | null;
  onSubmit: (params: CarCreateParams) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const nameValidation = {
  required: 'Car name is required',
  maxLength: {
    value: CAR_NAME_MAX_LENGTH,
    message: `Car name must be under ${CAR_NAME_MAX_LENGTH} characters`,
  },
};
const colorValidation = { required: 'Color is required' };

function CarForm(props: CarFormProps): ReactNode {
  const { value, isLoading, disabled } = props;
  const { register, formState, submitHandler } = useCarFormLogic(props);
  const { errors, isValid } = formState;

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.field}>
          <input
            type="text"
            className={styles.carName}
            placeholder="Type Car Brand"
            {...register('name', nameValidation)}
          />
        </div>

        <div className={styles.field}>
          <input
            type="color"
            className={styles.colorPicker}
            {...register('color', colorValidation)}
          />
        </div>
        <Button
          label={value ? 'Update' : 'Create'}
          type="submit"
          disabled={!isValid || disabled}
          isLoading={isLoading}
          loadingLabel={value ? 'Updating...' : 'Creating...'}
        />
      </form>
      {errors.name?.message && <Error message={errors.name?.message} />}
      {errors.color?.message && <Error message={errors.color?.message} />}
    </div>
  );
}

export default CarForm;
