import { configureStore } from '@reduxjs/toolkit';

import engineReducer from '@/components/features/garage/engine/engineSlice';

const store = configureStore({
  reducer: {
    engine: engineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
