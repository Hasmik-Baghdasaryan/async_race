import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRef, type RefObject } from 'react';
import { selectCarEngine } from '../../engine/engineSlice';
import { useAnimationResize, type BaseMeasurements } from '../animation';
import { runRace } from '../runRace';
import { stopCar } from '../stopCar';
import { useCleanupEffect } from './useCleanupEffect';
import { useRaceRegistration } from './useRaceRegistration';
import type { Car } from '@/types/car';

interface UseCarEngineProps {
  car: Car;
  carRef: RefObject<HTMLDivElement | null>;
  finishLineRef: RefObject<HTMLDivElement | null>;
}

export function useCarEngine({
  car,
  carRef,
  finishLineRef,
}: UseCarEngineProps) {
  const dispatch = useAppDispatch();
  const engine = useAppSelector((state) => selectCarEngine(state, car.id));
  const animationRef = useRef<Animation | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const baseMeasurementsRef = useRef<BaseMeasurements>(null);

  const handleStart = () => {
    if (engine.status === 'starting' || engine.status === 'driving') return;
    runRace({
      carId: car.id,
      dispatch,
      refs: {
        carRef,
        finishLineRef,
        animationRef,
        abortControllerRef,
        baseMeasurementsRef,
      },
    });
  };

  const handleStop = () =>
    stopCar({
      carId: car.id,
      dispatch,
      refs: { abortControllerRef, animationRef, carRef },
    });

  useAnimationResize(finishLineRef, animationRef, baseMeasurementsRef);
  useCleanupEffect({
    carId: car.id,
    abortControllerRef,
    animationRef,
    dispatch,
  });

  useRaceRegistration({ carId: car.id, handleStart, handleStop });

  return { handleStart, handleStop, status: engine.status };
}
