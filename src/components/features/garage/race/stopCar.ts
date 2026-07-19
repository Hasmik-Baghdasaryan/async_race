import type { AppDispatch } from '@/store/store';
import type { RefObject } from 'react';
import { stopEngine } from '../engine/engineSlice';
import { RESET_ANIMATION_DURATION_MS } from '@/constants/constants';

interface StopCarProps {
  carId: number;
  dispatch: AppDispatch;
  refs: {
    abortControllerRef: RefObject<AbortController | null>;
    animationRef: RefObject<Animation | null>;
    carRef: RefObject<HTMLDivElement | null>;
  };
}

export async function stopCar({
  carId,
  dispatch,
  refs,
}: StopCarProps): Promise<void> {
  const { abortControllerRef, animationRef, carRef } = refs;
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
