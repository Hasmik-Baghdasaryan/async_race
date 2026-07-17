import { useEffect, type RefObject } from 'react';

const CAR_CENTER_OFFSET_RATIO = 0.5;

export interface BuildAnimation {
  animation: Animation;
  baseLeft: number;
  baseWidth: number;
}

export type BaseMeasurements = { left: number; width: number } | null;

export function buildAnimation(
  carEl: HTMLDivElement,
  finishLineEl: HTMLDivElement,
  velocity: number,
  distance: number,
): BuildAnimation {
  const duration = distance / velocity;
  const carRect = carEl.getBoundingClientRect();
  const finishRect = finishLineEl.getBoundingClientRect();

  const distancePx =
    finishRect.left - carRect.left + carRect.width * CAR_CENTER_OFFSET_RATIO;

  const animation = carEl.animate(
    [
      { transform: 'translateX(0px)' },
      { transform: `translateX(${distancePx}px)` },
    ],
    { duration, easing: 'linear', fill: 'forwards' },
  );

  return { animation, baseLeft: carRect.left, baseWidth: carRect.width };
}

function recalculateAnimationTarget(
  finishLineRef: RefObject<HTMLDivElement | null>,
  animationRef: RefObject<Animation | null>,
  baseMeasurementsRef: RefObject<BaseMeasurements>,
) {
  if (
    finishLineRef.current == null ||
    animationRef.current == null ||
    baseMeasurementsRef.current == null
  )
    return;

  const finishRect = finishLineRef.current.getBoundingClientRect();
  const distancePx =
    finishRect.left -
    baseMeasurementsRef.current.left +
    baseMeasurementsRef.current.width * CAR_CENTER_OFFSET_RATIO;

  const effect = animationRef.current?.effect;

  if (effect instanceof KeyframeEffect) {
    effect.setKeyframes([
      { transform: 'translateX(0px)' },
      { transform: `translateX(${distancePx}px)` },
    ]);
  }
}

export function useAnimationResize(
  finishLineRef: RefObject<HTMLDivElement | null>,
  animationRef: RefObject<Animation | null>,
  baseMeasurementsRef: RefObject<BaseMeasurements>,
) {
  useEffect(() => {
    function handleResize() {
      recalculateAnimationTarget(
        finishLineRef,
        animationRef,
        baseMeasurementsRef,
      );
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [finishLineRef, animationRef, baseMeasurementsRef]);
}
