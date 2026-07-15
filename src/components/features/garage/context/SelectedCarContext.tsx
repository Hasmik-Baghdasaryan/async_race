import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Car } from '@/types/car';

interface SelectedCarContextValue {
  selectedCar: Car | null;
  selectCar: (car: Car) => void;
  unSelectCar: () => void;
}

const SelectedCarContext = createContext<SelectedCarContextValue | undefined>(
  undefined,
);

function SelectedCarProvider({ children }: { children: ReactNode }) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  function selectCar(car: Car) {
    setSelectedCar(car);
  }

  function unSelectCar() {
    setSelectedCar(null);
  }

  return (
    <SelectedCarContext.Provider
      value={{ selectedCar, selectCar, unSelectCar }}
    >
      {children}
    </SelectedCarContext.Provider>
  );
}

function useSelectedCar() {
  const context = useContext(SelectedCarContext);
  if (!context)
    throw new Error('useSelectedCar must be used within SelectedCarProvider');
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { SelectedCarProvider, useSelectedCar };
