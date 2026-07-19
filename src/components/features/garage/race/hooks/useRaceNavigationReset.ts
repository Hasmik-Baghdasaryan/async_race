import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { raceReset, selectIsRaceActive } from '../raceSlice';

export function useRaceNavigationReset(carIds: number[]) {
  const dispatch = useAppDispatch();
  const isRaceActive = useAppSelector(selectIsRaceActive);
  const isRaceActiveRef = useRef(isRaceActive);

  useEffect(() => {
    isRaceActiveRef.current = isRaceActive;
  });

  const carIdsKey = carIds.join(',');

  useEffect(() => {
    return () => {
      if (isRaceActiveRef.current) {
        dispatch(raceReset());
      }
    };
  }, [carIdsKey, dispatch]);
}
