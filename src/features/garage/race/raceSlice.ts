import { createSlice } from '@reduxjs/toolkit';

import { driveEngine } from '../engine/engineSlice';

interface RaceState {
  isRaceActive: boolean;
  winnerCarId: number | null;
}

const initialState: RaceState = {
  isRaceActive: false,
  winnerCarId: null,
};

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    raceStarted(state) {
      state.isRaceActive = true;
      state.winnerCarId = null;
    },
    raceReset(state) {
      state.isRaceActive = false;
      state.winnerCarId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(driveEngine.fulfilled, (state, action) => {
      if (state.isRaceActive && state.winnerCarId === null) {
        state.winnerCarId = action.payload;
      }
    });
  },
  selectors: {
    selectIsRaceActive: (state): boolean => state.isRaceActive,
    selectWinnerCarId: (state): number | null => state.winnerCarId,
  },
});

export const { raceStarted, raceReset } = raceSlice.actions;

export const { selectIsRaceActive, selectWinnerCarId } = raceSlice.selectors;

export default raceSlice.reducer;
