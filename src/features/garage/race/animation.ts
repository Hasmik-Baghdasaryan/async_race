import { type RefObject, useEffect } from 'react';

import { CAR_CENTER_OFFSET_RATIO } from '@/features/garage/constants';

export interface BuildAnimation {
  animation: Animation;
}

function calculateDistancePx(
  carEl: HTMLDivElement,
  finishLineEl: HTMLDivElement,
): number {
  const trackRect = carEl.parentElement?.getBoundingClientRect();
  const carRect = carEl.getBoundingClientRect();
  const finishRect = finishLineEl.getBoundingClientRect();

  return (
    finishRect.left -
    (trackRect?.left ?? carRect.left) +
    carRect.width * CAR_CENTER_OFFSET_RATIO
  );
}

export function buildAnimation(
  carEl: HTMLDivElement,
  finishLineEl: HTMLDivElement,
  velocity: number,
  distance: number,
): BuildAnimation {
  const duration = distance / velocity;
  const distancePx = calculateDistancePx(carEl, finishLineEl);

  const animation = carEl.animate(
    [
      { transform: 'translateX(0px)' },
      { transform: `translateX(${distancePx}px)` },
    ],
    { duration, easing: 'linear', fill: 'forwards' },
  );

  return { animation };
}

function recalculateAnimationTarget(
  carRef: RefObject<HTMLDivElement | null>,
  finishLineRef: RefObject<HTMLDivElement | null>,
  animationRef: RefObject<Animation | null>,
) {
  if (
    carRef.current == null ||
    finishLineRef.current == null ||
    animationRef.current == null
  )
    return;

  const distancePx = calculateDistancePx(carRef.current, finishLineRef.current);
  const effect = animationRef.current.effect;

  if (effect instanceof KeyframeEffect) {
    effect.setKeyframes([
      { transform: 'translateX(0px)' },
      { transform: `translateX(${distancePx}px)` },
    ]);
  }
}

export function useAnimationResize(
  carRef: RefObject<HTMLDivElement | null>,
  finishLineRef: RefObject<HTMLDivElement | null>,
  animationRef: RefObject<Animation | null>,
) {
  useEffect(() => {
    function handleResize() {
      recalculateAnimationTarget(carRef, finishLineRef, animationRef);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [carRef, finishLineRef, animationRef]);
}
