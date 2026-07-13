import { CARS_PER_PAGE } from '@/constants/constants';
import { fetchData, fetchWithHeaders } from '@/helpers/httpClient';
import type {
  Car,
  CarCreateParams,
  CarUpdateParams,
  FetchCarsResponse,
} from '@/types/car';

export function createCarApi(body: CarCreateParams): Promise<Car> {
  return fetchData<Car>({
    endpoint: 'garage',
    method: 'POST',
    body,
  });
}

export function getCarApi(id: number): Promise<Car> {
  return fetchData<Car>({
    endpoint: `garage/${id}`,
  });
}

export function updateCarApi(id: number, body: CarUpdateParams): Promise<Car> {
  return fetchData<Car>({
    endpoint: `garage/${id}`,
    method: 'PUT',
    body,
  });
}

export function deleteCarApi(id: number): Promise<unknown> {
  return fetchData<void>({
    endpoint: `garage/${id}`,
    method: 'DELETE',
  });
}

export function getAllCarsApi(
  page: number,
  limit: number,
): Promise<FetchCarsResponse> {
  const params = new URLSearchParams({
    _page: String(page || 1),
    _limit: String(limit || CARS_PER_PAGE),
  });

  return fetchWithHeaders<Car[]>({
    endpoint: `garage?${params.toString()}`,
  }).then(({ data, headers }) => ({
    cars: data,
    totalCount: Number(headers.get('X-Total-Count')),
  }));
}
