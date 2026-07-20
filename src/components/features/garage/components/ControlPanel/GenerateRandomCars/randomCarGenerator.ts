import type { CarCreateParams } from '@/types/car';
import { createCarApi } from '../../../api/garageApi';

const carBrands = [
  'Tesla',
  'Ford',
  'BMW',
  'Mercedes',
  'Toyota',
  'Honda',
  'Hyundai',
  'Kia',
  'Jaguar',
  'Deepal',
];

const carModels = [
  'Sport',
  'GT',
  'Turbo',
  'Elite',
  'Limited',
  'Deluxe',
  'Pro',
  'Signature',
  'Plus',
  'Classic',
];

const MAX_HEX_COLOR_VALUE = 16777215;
const HEX_RADIX = 16;
const HEX_COLOR_LENGTH = 6;

function pickRandom(items: string[]): string {
  return items[Math.floor(Math.random() * items.length)];
}

function generateRandomCar(): CarCreateParams {
  return {
    name: `${pickRandom(carBrands)} ${pickRandom(carModels)}`,
    color:
      '#' +
      Math.floor(Math.random() * MAX_HEX_COLOR_VALUE)
        .toString(HEX_RADIX)
        .padStart(HEX_COLOR_LENGTH, '0'),
  };
}

export async function generateRandomCars(count: number) {
  const cars = Array.from({ length: count }, () => generateRandomCar());
  const results = await Promise.allSettled(
    cars.map((car) => createCarApi(car)),
  );

  const failedCount = results.filter((r) => r.status === 'rejected').length;
  if (failedCount > 0) {
    console.warn(
      `${count - failedCount}/${count} cars created, ${failedCount} failed.`,
    );
  }
}
