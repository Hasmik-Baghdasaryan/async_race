import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  updateCarForm,
  selectCarFormValues,
  updateEditDraftValue,
  selectEditDraft,
} from '@/components/features/garage/carFormSlice';

import type { CarCreateParams } from '@/types/car';
import type { CarFormProps } from './CarForm';

const EMPTY_FORM: CarCreateParams = { name: '', color: '#000000' };

export function useCarFormLogic(props: CarFormProps) {
  const { onSubmit, value } = props;
  const carId = value?.id;

  const dispatch = useAppDispatch();
  const createdDraft = useAppSelector(selectCarFormValues);
  const editedDraft = useAppSelector((state) =>
    carId === undefined ? null : selectEditDraft(state, carId),
  );

  const defaultValues = value ? (editedDraft ?? value) : createdDraft;
  const { register, handleSubmit, formState, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    return () => {
      if (value) {
        dispatch(updateEditDraftValue({ carId: value.id, ...getValues() }));
      } else {
        dispatch(updateCarForm(getValues()));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = (data: CarCreateParams) => {
    onSubmit(data);
    reset(EMPTY_FORM);
    if (!value) dispatch(updateCarForm(EMPTY_FORM));
  };

  return { register, formState, submitHandler: handleSubmit(onFormSubmit) };
}
