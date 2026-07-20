import { CarList, ControlPanel, RaceRegistryProvider } from '@/features/garage';

function Garage() {
  return (
    <RaceRegistryProvider>
      <ControlPanel />
      <CarList />
    </RaceRegistryProvider>
  );
}

export default Garage;
