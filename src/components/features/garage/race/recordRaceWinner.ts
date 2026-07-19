import {
  createWinnerApi,
  getWinnerApi,
  updateWinnerApi,
} from '@/components/features/winners/api/winnersApi';
import { HTTP_STATUS, HttpError } from '@/helpers/httpClient';

interface RecordRaceWinnerParams {
  carId: number;
  time: number;
}

export async function recordRaceWinner({
  carId,
  time,
}: RecordRaceWinnerParams) {
  try {
    const existing = await getWinnerApi(carId);
    await updateWinnerApi(carId, {
      wins: existing.wins + 1,
      time: Math.min(existing.time, time),
    });
  } catch (err) {
    if (err instanceof HttpError && err.status === HTTP_STATUS.NOT_FOUND) {
      await createWinnerApi({ id: carId, wins: 1, time });
      return;
    }
    throw err;
  }
}
