import { configureStore } from '@reduxjs/toolkit';

import engineReducer from '@/components/features/garage/engine/engineSlice';
import raceReducer from '@/components/features/garage/race/raceSlice';

const store = configureStore({
  reducer: {
    engine: engineReducer,
    race: raceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
