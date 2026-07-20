import { getCarApi } from '@/features/garage';
import { WINNERS_PER_PAGE } from '@/features/winners/constants';
import type {
  FetchWinnersParams,
  FetchWinnersResponse,
  UpdateWinnerParams,
  Winner,
} from '@/features/winners/types';
import { fetchData, fetchWithHeaders } from '@/lib/httpClient';

export function getAllWinnersApi({
  page,
  limit,
  sort,
  order,
}: FetchWinnersParams): Promise<FetchWinnersResponse> {
  const params = new URLSearchParams({
    _page: String(page || 1),
    _limit: String(limit || WINNERS_PER_PAGE),
    _sort: String(sort || 'id'),
    _order: String(order || 'ASC'),
  });

  return fetchWithHeaders<Winner[]>({
    endpoint: `winners?${params.toString()}`,
  }).then(async ({ data, headers }) => {
    const winnersWithCars = await Promise.all(
      data.map(async (winner) => {
        const car = await getCarApi(winner.id);
        return { ...winner, name: car.name, color: car.color };
      }),
    );
    return {
      winners: winnersWithCars,
      totalCount: Number(headers.get('X-Total-Count')),
    };
  });
}

export function createWinnerApi(body: Winner): Promise<Winner> {
  return fetchData<Winner>({
    endpoint: 'winners',
    method: 'POST',
    body,
  });
}

export function updateWinnerApi(
  id: number,
  body: UpdateWinnerParams,
): Promise<Winner> {
  return fetchData<Winner>({
    endpoint: `winners/${id}`,
    method: 'PUT',
    body,
  });
}

export function getWinnerApi(id: number): Promise<Winner> {
  return fetchData<Winner>({
    endpoint: `winners/${id}`,
  });
}

export function deleteWinnerApi(id: number): Promise<unknown> {
  return fetchData<void>({
    endpoint: `winners/${id}`,
    method: 'DELETE',
  });
}
