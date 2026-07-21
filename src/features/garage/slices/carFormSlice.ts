import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { selectCar } from './selectedCarSlice';

interface CarFormValues {
  name: string;
  color: string;
}

interface CarFormState {
  createDraft: CarFormValues;
  editDrafts: Record<number, CarFormValues>;
}

const initialState: CarFormState = {
  createDraft: { name: '', color: '#000000' },
  editDrafts: {},
};

const carFormSlice = createSlice({
  name: 'carForm',
  initialState,
  reducers: {
    updateCarForm(state, action: PayloadAction<CarFormValues>) {
      state.createDraft = action.payload;
    },
    updateEditDraftValue(
      state,
      action: PayloadAction<CarFormValues & { carId: number }>,
    ) {
      const { carId, ...values } = action.payload;
      state.editDrafts[carId] = values;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(selectCar, (state) => {
      state.createDraft = { name: '', color: '#000000' };
    });
  },
  selectors: {
    selectCarFormValues: (state): CarFormValues => state.createDraft,
    selectEditDraft: (state, carId: number): CarFormValues | null =>
      state.editDrafts[carId] ?? null,
  },
});

export const { updateCarForm, updateEditDraftValue } = carFormSlice.actions;

export const { selectCarFormValues, selectEditDraft } = carFormSlice.selectors;

export default carFormSlice.reducer;
