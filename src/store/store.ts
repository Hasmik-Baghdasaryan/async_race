import { configureStore } from '@reduxjs/toolkit';

import engineReducer from '@/components/features/garage/engine/engineSlice';
import raceReducer from '@/components/features/garage/race/raceSlice';
import carFormReducer from '@/components/features/garage/carFormSlice';
import selectedCarReducer from '@/components/features/garage/selectedCarSlice';
import { raceListenerMiddleware } from '@/components/features/garage/race/raceListeners';

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

export default store;
