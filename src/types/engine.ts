export type EngineStatus =
  'idle' | 'starting' | 'driving' | 'finished' | 'broken';

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export interface DriveResponse {
  success: boolean;
}
