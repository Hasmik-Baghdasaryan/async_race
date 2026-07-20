import { type RefObject, useEffect } from 'react';

import type { AppDispatch } from '@/store/store';

import { stopEngine } from '../../engine/engineSlice';

interface UseCleanupEffectProps {
  carId: number;
  dispatch: AppDispatch;
  abortControllerRef: RefObject<AbortController | null>;
  animationRef: RefObject<Animation | null>;
}

export function useCleanupEffect({
  carId,
  abortControllerRef,
  animationRef,
  dispatch,
}: UseCleanupEffectProps) {
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const abortController = abortControllerRef.current;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const animation = animationRef.current;
      abortController?.abort();
      animation?.cancel();
      if (abortController) {
        void dispatch(stopEngine(carId));
      }
    };
  }, [carId, dispatch, abortControllerRef, animationRef]);
}
