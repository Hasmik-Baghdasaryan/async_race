import type { RefObject } from 'react';

import type { DriveEngineRejection } from '@/features/garage/types';
import type { AppDispatch } from '@/store/store';

import { driveEngine, startEngine } from '../engine/engineSlice';
import { buildAnimation } from './animation';

interface RunRaceProps {
  carId: number;
  dispatch: AppDispatch;
  refs: {
    carRef: RefObject<HTMLDivElement | null>;
    finishLineRef: RefObject<HTMLDivElement | null>;
    animationRef: RefObject<Animation | null>;
    abortControllerRef: RefObject<AbortController | null>;
  };
}

export async function runRace({ refs, dispatch, carId }: RunRaceProps) {
  const { carRef, finishLineRef, animationRef, abortControllerRef } = refs;

  try {
    const { velocity, distance } = await dispatch(startEngine(carId)).unwrap();

    if (!carRef.current || !finishLineRef.current) return;

    const { animation } = buildAnimation(
      carRef.current,
      finishLineRef.current,
      velocity,
      distance,
    );
    animationRef.current = animation;

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
