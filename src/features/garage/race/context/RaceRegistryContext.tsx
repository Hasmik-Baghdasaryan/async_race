import { createContext, type ReactNode, useContext, useRef } from 'react';

interface RaceParticipant {
  start: () => void;
  stop: () => void;
}

interface RaceRegistryContextValue {
  register: (carId: number, participant: RaceParticipant) => void;
  unregister: (carId: number) => void;
  startAll: () => void;
  stopAll: () => void;
}

const RaceRegistryContext = createContext<RaceRegistryContextValue | undefined>(
  undefined,
);

function RaceRegistryProvider({ children }: { children: ReactNode }) {
  const participantsRef = useRef<Map<number, RaceParticipant>>(new Map());

  function register(carId: number, participant: RaceParticipant) {
    participantsRef.current.set(carId, participant);
  }

  function unregister(carId: number) {
    participantsRef.current.delete(carId);
  }

  function startAll() {
    participantsRef.current.forEach((participant) => participant.start());
  }

  function stopAll() {
    participantsRef.current.forEach((participant) => participant.stop());
  }

  return (
    <RaceRegistryContext.Provider
      value={{ register, unregister, startAll, stopAll }}
    >
      {children}
    </RaceRegistryContext.Provider>
  );
}

function useRaceRegistry() {
  const context = useContext(RaceRegistryContext);
  if (!context)
    throw new Error('useRaceRegistry must be used within RaceRegistryProvider');
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { RaceRegistryProvider, useRaceRegistry };
