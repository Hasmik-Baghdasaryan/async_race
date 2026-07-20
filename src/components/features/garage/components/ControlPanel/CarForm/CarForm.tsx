import { useForm } from 'react-hook-form';
import type { ReactNode } from 'react';
import type { Car, CarCreateParams } from '@/types/car';
import { CAR_NAME_MAX_LENGTH } from '@/constants/constants';

import Button from '@/components/common/Button/Button';
import Error from '@/components/common/Error/Error';

import styles from './CarFrom.module.css';

interface CarFormProps {
  value?: Car | null;
  onSubmit: (params: CarCreateParams) => void;
  isLoading?: boolean;
}

const nameValidation = {
  required: 'Car name is required',
  maxLength: {
    value: CAR_NAME_MAX_LENGTH,
    message: `Car name must be under ${CAR_NAME_MAX_LENGTH} characters`,
  },
};
const colorValidation = { required: 'Color is required' };

function useCarForm(value?: Car | null) {
  const defaultValues = {
    name: value?.name ?? '',
    color: value?.color ?? '#000000',
  };
  return useForm({ mode: 'onChange', defaultValues });
}

function CarForm({ onSubmit, value, isLoading }: CarFormProps): ReactNode {
  const { register, handleSubmit, formState, reset } = useCarForm(value);

  const { errors, isValid } = formState;

  const onFormSubmit = (data: CarCreateParams) => {
    onSubmit(data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
      <div className={styles.field}>
        <input
          type="text"
          className={styles.carName}
          placeholder="Type Car Brand"
          {...register('name', nameValidation)}
        />
        {errors.name?.message && <Error message={errors.name?.message} />}
      </div>

      <div className={styles.field}>
        <input
          type="color"
          className={styles.colorPicker}
          {...register('color', colorValidation)}
        />
        {errors.color?.message && <Error message={errors.color?.message} />}
      </div>
      <Button
        label={value ? 'Update' : 'Create'}
        type="submit"
        disabled={!isValid}
        isLoading={isLoading}
        loadingLabel={value ? 'Updating...' : 'Creating...'}
      />
    </form>
  );
}

export default CarForm;
