import { useForm } from 'react-hook-form';
import type { ReactNode } from 'react';
import type { Car, CarCreateParams } from '@/types/car';

import Button from '@/components/common/Button/Button';
import Error from '@/components/common/Error/Error';

import styles from './CarFrom.module.css';

interface CarFormProps {
  value?: Car | null;
  onSubmit: (params: CarCreateParams) => void;
  isLoading?: boolean;
}

function CarForm({ onSubmit, value, isLoading }: CarFormProps): ReactNode {
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      name: value?.name ?? '',
      color: value?.color ?? '#000000',
    },
  });

  const { errors, isValid } = formState;

  const onFormSubmit = (data: CarCreateParams) => {
    onSubmit(data);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
      <input
        type="text"
        className={styles.carName}
        placeholder="Type Car Brand"
        {...register('name', { required: 'Car name is required' })}
      />
      {errors.name?.message && <Error message={errors.name?.message} />}

      <input
        type="color"
        className={styles.colorPicker}
        {...register('color', { required: 'Color is required' })}
      />
      {errors.color?.message && <Error message={errors.color?.message} />}
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
