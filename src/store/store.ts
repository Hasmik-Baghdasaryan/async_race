import { configureStore } from '@reduxjs/toolkit';

import engineReducer from '@/components/features/garage/engine/engineSlice';
import raceReducer from '@/components/features/garage/race/raceSlice';
import { raceListenerMiddleware } from '@/components/features/garage/race/raceListeners';

const store = configureStore({
  reducer: {
    engine: engineReducer,
    race: raceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(raceListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
