import { configureStore } from '@reduxjs/toolkit';

import engineReducer from '@/features/garage/engine/engineSlice';
import raceReducer from '@/features/garage/race/raceSlice';
import carFormReducer from '@/features/garage/slices/carFormSlice';
import selectedCarReducer from '@/features/garage/slices/selectedCarSlice';
import { raceListenerMiddleware } from '@/store/listeners/raceWinnerListener';

const store = configureStore({
  reducer: {
    engine: engineReducer,
    race: raceReducer,
    carForm: carFormReducer,
    selectedCar: selectedCarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(raceListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
