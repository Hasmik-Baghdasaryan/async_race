import { fetchData } from '@/helpers/httpClient';
import type { DriveResponse, EngineResponse } from '@/types/engine';

export function startEngineApi(
  id: number,
  signal?: AbortSignal,
): Promise<EngineResponse> {
  return fetchData<EngineResponse>({
    endpoint: `engine?id=${id}&status=started`,
    method: 'PATCH',
    signal,
  });
}

export function stopEngineApi(
  id: number,
  signal?: AbortSignal,
): Promise<EngineResponse> {
  return fetchData<EngineResponse>({
    endpoint: `engine?id=${id}&status=stopped`,
    method: 'PATCH',
    signal,
  });
}

export function driveEngineApi(
  id: number,
  signal?: AbortSignal,
): Promise<DriveResponse> {
  return fetchData<DriveResponse>({
    endpoint: `engine?id=${id}&status=drive`,
    method: 'PATCH',
    signal,
  });
}
