import { createListenerMiddleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { MS_PER_SECOND } from '@/config/constants';
import {
  driveEngine,
  selectCarEngine,
} from '@/features/garage/engine/engineSlice';
import { selectWinnerCarId } from '@/features/garage/race/raceSlice';
import { recordRaceWinner } from '@/features/winners/recordRaceWinner';
import { HttpError } from '@/lib/httpClient';
import queryClient from '@/lib/queryClient';
import type { RootState } from '@/store/store';

export const raceListenerMiddleware = createListenerMiddleware();

raceListenerMiddleware.startListening({
  actionCreator: driveEngine.fulfilled,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    if (selectWinnerCarId(state) !== action.payload) return;

    const { distance, velocity } = selectCarEngine(state, action.payload);
    const time = distance / velocity / MS_PER_SECOND;
    if (!Number.isFinite(time)) return;

    try {
      await recordRaceWinner({ carId: action.payload, time });
      queryClient.invalidateQueries({ queryKey: ['winners'] });
    } catch (err) {
      toast.error(
        err instanceof HttpError
          ? err.userMessage
          : 'Something went wrong. Please try again.',
      );
    }
  },
});
