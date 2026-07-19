import { useEffect, useRef, type RefObject } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { AppDispatch } from '@/store/store';
import type { Car } from '@/types/car';
import { RESET_ANIMATION_DURATION_MS } from '@/constants/constants';
import {
  buildAnimation,
  useAnimationResize,
  type BaseMeasurements,
} from './animation';
import {
  startEngine,
  driveEngine,
  stopEngine,
  selectCarEngine,
} from './engineSlice';
import type { DriveEngineRejection } from '@/types/engine';

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
    void startRace(
      car.id,
      carRef,
      finishLineRef,
      animationRef,
      abortControllerRef,
      baseMeasurementsRef,
      dispatch,
    );
  };

  const handleStop = () => {
    void stopCar(car.id, abortControllerRef, animationRef, carRef, dispatch);
  };

  useAnimationResize(finishLineRef, animationRef, baseMeasurementsRef);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const abortController = abortControllerRef.current;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const animation = animationRef.current;
      abortController?.abort();
      animation?.cancel();
      if (abortController) {
        void dispatch(stopEngine(car.id));
      }
    };
  }, [car.id, dispatch]);

  return { handleStart, handleStop, status: engine.status };
}

async function startRace(
  carId: number,
  carRef: RefObject<HTMLDivElement | null>,
  finishLineRef: RefObject<HTMLDivElement | null>,
  animationRef: RefObject<Animation | null>,
  abortControllerRef: RefObject<AbortController | null>,
  baseMeasurementsRef: RefObject<BaseMeasurements>,
  dispatch: AppDispatch,
): Promise<void> {
  try {
    const { velocity, distance } = await dispatch(startEngine(carId)).unwrap();

    if (!carRef.current || !finishLineRef.current) return;

    const { animation, baseLeft, baseWidth } = buildAnimation(
      carRef.current,
      finishLineRef.current,
      velocity,
      distance,
    );
    animationRef.current = animation;
    baseMeasurementsRef.current = { left: baseLeft, width: baseWidth };

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await dispatch(
        driveEngine({ carId, signal: controller.signal }),
      ).unwrap();
    } catch (err) {
      const error = err as DriveEngineRejection;
      if (error.reason === 'broken' || error.reason === 'error') {
        animationRef.current?.pause();
      }
    }
  } catch {
    return;
  }
}

async function stopCar(
  carId: number,
  abortControllerRef: RefObject<AbortController | null>,
  animationRef: RefObject<Animation | null>,
  carRef: RefObject<HTMLDivElement | null>,
  dispatch: AppDispatch,
): Promise<void> {
  abortControllerRef.current?.abort();
  abortControllerRef.current = null;
  animationRef.current?.pause();

  await dispatch(stopEngine(carId));

  if (carRef.current && animationRef.current) {
    const currentTransform = carRef.current.style.transform;

    animationRef.current.effect = new KeyframeEffect(
      carRef.current,
      [
        { transform: currentTransform || 'translateX(0px)' },
        { transform: 'translateX(0px)' },
      ],
      { duration: RESET_ANIMATION_DURATION_MS },
    );
    animationRef.current.play();
  }
}
