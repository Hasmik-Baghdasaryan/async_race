import type { EngineStatus } from '@/types/engine';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CarEngineState {
  status: EngineStatus;
  velocity: number;
  distance: number;
}

interface EngineSliceState {
  cars: Record<number, CarEngineState>;
}

const initialCarEngineState: CarEngineState = {
  status: 'idle',
  velocity: 0,
  distance: 0,
};

const initialState: EngineSliceState = {
  cars: {},
};

function getOrInitCar(state: EngineSliceState, carId: number): CarEngineState {
  return state.cars[carId] ?? { ...initialCarEngineState };
}

const engineSlice = createSlice({
  name: 'engine',
  initialState,
  reducers: {
    engineStarting(state, action: PayloadAction<number>) {
      const carId = action.payload;
      state.cars[carId] = { ...getOrInitCar(state, carId), status: 'starting' };
    },
    engineStarted(
      state,
      action: PayloadAction<{
        carId: number;
        velocity: number;
        distance: number;
      }>,
    ) {
      const { carId, velocity, distance } = action.payload;
      state.cars[carId] = { status: 'driving', velocity, distance };
    },
    engineFinished(state, action: PayloadAction<number>) {
      const carId = action.payload;
      state.cars[carId] = { ...getOrInitCar(state, carId), status: 'finished' };
    },
    engineBroken(state, action: PayloadAction<number>) {
      const carId = action.payload;
      state.cars[carId] = { ...getOrInitCar(state, carId), status: 'broken' };
    },
    engineStopped(state, action: PayloadAction<number>) {
      const carId = action.payload;
      state.cars[carId] = { ...initialCarEngineState };
    },
    engineRemoved(state, action: PayloadAction<number>) {
      const carId = action.payload;
      delete state.cars[carId];
    },
  },
  selectors: {
    selectCarEngine: (state, carId: number): CarEngineState =>
      state.cars[carId] ?? initialCarEngineState,
  },
});

export const {
  engineStarting,
  engineStarted,
  engineFinished,
  engineBroken,
  engineStopped,
  engineRemoved,
} = engineSlice.actions;

export const { selectCarEngine } = engineSlice.selectors;

export default engineSlice.reducer;
