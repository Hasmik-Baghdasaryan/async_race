import { createSlice } from '@reduxjs/toolkit';
import { driveEngine } from '../engine/engineSlice';

interface RaceState {
  raceTrigger: number;
  resetTrigger: number;
  winnerCarId: number | null;
}

const initialState: RaceState = {
  raceTrigger: 0,
  resetTrigger: 0,
  winnerCarId: null,
};

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    raceStarted(state) {
      state.raceTrigger += 1;
      state.winnerCarId = null;
    },
    raceReset(state) {
      state.resetTrigger += 1;
      state.winnerCarId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(driveEngine.fulfilled, (state, action) => {
      const isRaceActive = state.raceTrigger > state.resetTrigger;
      if (isRaceActive && state.winnerCarId === null) {
        state.winnerCarId = action.payload;
      }
    });
  },
  selectors: {
    selectIsRaceActive: (state): boolean =>
      state.raceTrigger > state.resetTrigger,
    selectWinnerCarId: (state): number | null => state.winnerCarId,
    selectRaceTrigger: (state): number => state.raceTrigger,
    selectResetTrigger: (state): number => state.resetTrigger,
  },
});

export const { raceStarted, raceReset } = raceSlice.actions;

export const {
  selectIsRaceActive,
  selectWinnerCarId,
  selectRaceTrigger,
  selectResetTrigger,
} = raceSlice.selectors;

export default raceSlice.reducer;
