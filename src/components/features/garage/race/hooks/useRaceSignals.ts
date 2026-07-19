import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectRaceTrigger, selectResetTrigger } from '../raceSlice';

interface UseRaceSignalsProps {
  handleStart: () => void;
  handleStop: () => void;
}

export function useRaceSignals({
  handleStart,
  handleStop,
}: UseRaceSignalsProps) {
  const raceTrigger = useAppSelector(selectRaceTrigger);
  const resetTrigger = useAppSelector(selectResetTrigger);
  const prevRaceTrigger = useRef(raceTrigger);
  const prevResetTrigger = useRef(resetTrigger);

  useEffect(() => {
    if (raceTrigger !== prevRaceTrigger.current) {
      prevRaceTrigger.current = raceTrigger;
      handleStart();
    }
  }, [raceTrigger, handleStart]);

  useEffect(() => {
    if (resetTrigger !== prevResetTrigger.current) {
      prevResetTrigger.current = resetTrigger;
      handleStop();
    }
  }, [resetTrigger, handleStop]);
}
