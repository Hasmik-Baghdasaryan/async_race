import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  selectCarFormValues,
  selectEditDraft,
  updateCarForm,
  updateEditDraftValue,
} from '@/features/garage/slices/carFormSlice';
import { getSelectedCar } from '@/features/garage/slices/selectedCarSlice';
import type { CarCreateParams } from '@/features/garage/types';
import { useAppDispatch, useAppSelector, useAppStore } from '@/store/hooks';

import type { CarFormProps } from './CarForm';

const EMPTY_FORM: CarCreateParams = { name: '', color: '#000000' };

export function useCarFormLogic(props: CarFormProps) {
  const { onSubmit, value } = props;
  const carId = value?.id;

  const dispatch = useAppDispatch();
  const store = useAppStore();
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
        return;
      }
      if (getSelectedCar(store.getState())) return;
      dispatch(updateCarForm(getValues()));
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
