export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface FetchCarsResponse {
  cars: Car[];
  totalCount: number;
}

export type CarCreateParams = Omit<Car, 'id'>;
export type CarUpdateParams = Omit<Car, 'id'>;

export type EngineStatus =
  'idle' | 'starting' | 'driving' | 'finished' | 'broken';

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export interface DriveResponse {
  success: boolean;
}

export type DriveEngineRejection = {
  carId: number;
  reason: 'aborted' | 'broken' | 'error';
};
