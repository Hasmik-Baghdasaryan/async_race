import { useEffect, useRef, type RefObject } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { AppDispatch } from '@/store/store';
import type { Car } from '@/types/car';
import type { EngineStatus } from '@/types/engine';
import { HTTP_STATUS, HttpError } from '@/helpers/httpClient';
import {
  buildAnimation,
  useAnimationResize,
  type BaseMeasurements,
} from './animation';
import { driveEngineApi, startEngineApi, stopEngineApi } from './engineApi';
import {
  engineBroken,
  engineFinished,
  engineStarted,
  engineStarting,
  engineStopped,
  selectCarEngine,
} from './engineSlice';

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
  const status = useAppSelector(
    (state) => selectCarEngine(state, car.id).status,
  );
  const animationRef = useRef<Animation | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const baseMeasurementsRef = useRef<BaseMeasurements>(null);

  function handleStart() {
    void startEngine(
      car.id,
      status,
      carRef,
      finishLineRef,
      animationRef,
      abortControllerRef,
      baseMeasurementsRef,
      dispatch,
    );
  }

  function handleStop() {
    void stopEngine(car.id, animationRef, abortControllerRef, dispatch);
  }

  useAnimationResize(finishLineRef, animationRef, baseMeasurementsRef);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort(); // eslint-disable-line react-hooks/exhaustive-deps
      animationRef.current?.cancel(); // eslint-disable-line react-hooks/exhaustive-deps
      dispatch(engineStopped(car.id));
    };
  }, [car.id, dispatch]);

  return { handleStart, handleStop, status };
}

async function driveCar(
  carId: number,
  animationRef: RefObject<Animation | null>,
  abortControllerRef: RefObject<AbortController | null>,
  dispatch: AppDispatch,
) {
  const controller = new AbortController();
  abortControllerRef.current = controller;

  try {
    await driveEngineApi(carId, controller.signal);
    if (abortControllerRef.current !== controller) return;
    dispatch(engineFinished(carId));
  } catch (err) {
    if (abortControllerRef.current !== controller) return;
    if (
      err instanceof HttpError &&
      err.status === HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) {
      animationRef.current?.pause();
      dispatch(engineBroken(carId));
    } else if (err instanceof DOMException && err.name === 'AbortError') {
      //no need to do anything
    } else {
      animationRef.current?.pause();
      dispatch(engineBroken(carId));
      toast.error('Something went wrong!');
    }
  }
}

async function startEngine(
  carId: number,
  status: EngineStatus,
  carRef: RefObject<HTMLDivElement | null>,
  finishLineRef: RefObject<HTMLDivElement | null>,
  animationRef: RefObject<Animation | null>,
  abortControllerRef: RefObject<AbortController | null>,
  baseMeasurementsRef: RefObject<BaseMeasurements>,
  dispatch: AppDispatch,
) {
  if (status === 'starting' || status === 'driving') return;

  dispatch(engineStarting(carId));

  try {
    const { velocity, distance } = await startEngineApi(carId);
    dispatch(engineStarted({ carId, velocity, distance }));

    if (carRef.current == null || finishLineRef.current == null) return;

    const { animation, baseLeft, baseWidth } = buildAnimation(
      carRef.current,
      finishLineRef.current,
      velocity,
      distance,
    );
    animationRef.current = animation;
    baseMeasurementsRef.current = { left: baseLeft, width: baseWidth };

    void driveCar(carId, animationRef, abortControllerRef, dispatch);
  } catch {
    dispatch(engineStopped(carId));
    toast.error('Something went wrong!');
  }
}

function stopEngine(
  carId: number,
  animationRef: RefObject<Animation | null>,
  abortControllerRef: RefObject<AbortController | null>,
  dispatch: AppDispatch,
) {
  abortControllerRef.current?.abort();
  abortControllerRef.current = null;
  animationRef.current?.cancel();

  dispatch(engineStopped(carId));
  void stopEngineApi(carId);
}
