import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Car } from '@/features/garage/types';

interface SelectedCarState {
  selectedCar: Car | null;
}

const initialState: SelectedCarState = {
  selectedCar: null,
};

const selectedCarSlice = createSlice({
  name: 'selectedCar',
  initialState,
  reducers: {
    selectCar(state, action: PayloadAction<Car>) {
      state.selectedCar = action.payload;
    },
    unSelectCar(state) {
      state.selectedCar = null;
    },
  },
  selectors: {
    getSelectedCar: (state): Car | null => state.selectedCar,
  },
});

export const { selectCar, unSelectCar } = selectedCarSlice.actions;

export const { getSelectedCar } = selectedCarSlice.selectors;

export default selectedCarSlice.reducer;
