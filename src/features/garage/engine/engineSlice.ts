import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type {
  DriveEngineRejection,
  EngineStatus,
} from '@/features/garage/types';
import { HTTP_STATUS, HttpError } from '@/lib/httpClient';

import { driveEngineApi, startEngineApi, stopEngineApi } from './engineApi';

export interface CarEngineState {
  status: EngineStatus;
  velocity: number;
  distance: number;
  isResetting: boolean;
}

interface EngineSliceState {
  cars: Record<number, CarEngineState>;
}

const initialCarEngineState: CarEngineState = {
  status: 'idle',
  velocity: 0,
  distance: 0,
  isResetting: false,
};

const initialState: EngineSliceState = {
  cars: {},
};

// Start engine, returns velocity and distance needed for animation calculation
export const startEngine = createAsyncThunk(
  'engine/start',
  async (carId: number) => {
    const { velocity, distance } = await startEngineApi(carId);
    return { carId, velocity, distance };
  },
);

//drive car. Signal is used to abort mid-drive call. In that case status should not be changed to broken

export const driveEngine = createAsyncThunk<
  number,
  { carId: number; signal?: AbortSignal },
  { rejectValue: DriveEngineRejection }
>(
  'engine/drive',
  async (
    { carId, signal }: { carId: number; signal?: AbortSignal },
    { rejectWithValue },
  ) => {
    try {
      await driveEngineApi(carId, signal);
      return carId;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return rejectWithValue({ carId, reason: 'aborted' });
      }
      if (
        err instanceof HttpError &&
        err.status === HTTP_STATUS.INTERNAL_SERVER_ERROR
      ) {
        return rejectWithValue({ carId, reason: 'broken' });
      }
      return rejectWithValue({ carId, reason: 'error' });
    }
  },
);

//Stop engine. Change the status back to idle
export const stopEngine = createAsyncThunk(
  'engine/stop',
  async (carId: number) => {
    await stopEngineApi(carId);
    return carId;
  },
);

const engineSlice = createSlice({
  name: 'engine',
  initialState,
  reducers: {
    engineRemoved(state, action: PayloadAction<number>) {
      const carId = action.payload;
      delete state.cars[carId];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startEngine.pending, (state, action) => {
        state.cars[action.meta.arg] = {
          ...initialCarEngineState,
          status: 'starting',
        };
      })
      .addCase(startEngine.fulfilled, (state, action) => {
        const { carId, velocity, distance } = action.payload;
        state.cars[carId] = {
          status: 'driving',
          velocity,
          distance,
          isResetting: false,
        };
      })
      .addCase(startEngine.rejected, (state, action) => {
        state.cars[action.meta.arg] = { ...initialCarEngineState };
      })
      .addCase(driveEngine.fulfilled, (state, action) => {
        const car = state.cars[action.payload];
        if (car) car.status = 'finished';
      })
      .addCase(driveEngine.rejected, (state, action) => {
        if (!action.payload) return;
        const { carId, reason } = action.payload;
        const car = state.cars[carId];
        if (car && (reason === 'broken' || reason === 'error')) {
          car.status = 'broken';
        }
      })
      .addCase(stopEngine.pending, (state, action) => {
        const car = state.cars[action.meta.arg];
        if (car) car.isResetting = true;
      })
      .addCase(stopEngine.fulfilled, (state, action) => {
        state.cars[action.payload] = { ...initialCarEngineState };
      });
  },
  selectors: {
    selectCarEngine: (state, carId: number): CarEngineState =>
      state.cars[carId] ?? initialCarEngineState,
    selectIsAnyCarRacing: (state): boolean =>
      Object.values(state.cars).some(
        (car) => car.status === 'starting' || car.status === 'driving',
      ),
  },
});

export const { engineRemoved } = engineSlice.actions;

export const { selectCarEngine, selectIsAnyCarRacing } = engineSlice.selectors;

export default engineSlice.reducer;
