import { useEffect } from 'react';
import { useRaceRegistry } from '../context/RaceRegistryContext';

interface UseRaceRegistrationProps {
  carId: number;
  handleStart: () => void;
  handleStop: () => void;
}

export function useRaceRegistration({
  carId,
  handleStart,
  handleStop,
}: UseRaceRegistrationProps) {
  const { register, unregister } = useRaceRegistry();

  useEffect(() => {
    register(carId, { start: handleStart, stop: handleStop });
    return () => unregister(carId);
  });
}
