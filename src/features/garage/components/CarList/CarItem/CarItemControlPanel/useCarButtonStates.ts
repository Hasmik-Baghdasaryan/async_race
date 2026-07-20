import type { EngineStatus } from '@/features/garage/types';

export function useCarButtonStates(status: EngineStatus) {
  const isRacing = status === 'starting' || status === 'driving';
  const isTerminal = status === 'finished' || status === 'broken';

  return {
    isRacing,
    startDisabled: isRacing || isTerminal,
    stopEnabled: status === 'driving' || isTerminal,
    stopLabel: isTerminal ? 'Reset' : 'Stop',
    isStarting: status === 'starting',
  };
}
