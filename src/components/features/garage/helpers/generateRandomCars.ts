import { createCarApi } from '@/services/garageApi';
import type { CarCreateParams } from '@/types/car';

const carModelsByBrand: Record<string, string[]> = {
  Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y'],
  Ford: ['Mustang', 'Focus', 'Fiesta', 'Explorer'],
  BMW: ['X5', 'M3', '3 Series', '5 Series'],
  Deepal: ['S07', 'SL03', 'S05', 'G318'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLE'],
  Jaguar: ['F-Type', 'F-Pace', 'XE', 'XF'],
  Kia: ['Sportage', 'Sorento', 'Optima', 'Telluride'],
  Toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander'],
  Hyundai: ['Elantra', 'Tucson', 'Santa Fe', 'Sonata'],
};

const carBrands = Object.keys(carModelsByBrand);

const MAX_HEX_COLOR_VALUE = 16777215;
const HEX_RADIX = 16;
const HEX_COLOR_LENGTH = 6;

function generateRandomCar(): CarCreateParams {
  const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
  const models = carModelsByBrand[brand];
  const model = models[Math.floor(Math.random() * models.length)];

  return {
    name: `${brand} ${model}`,
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
