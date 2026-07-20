import PageTitle from '@/components/PageTitle/PageTitle';
import { CarList, ControlPanel, RaceRegistryProvider } from '@/features/garage';

function Garage() {
  return (
    <RaceRegistryProvider>
      <PageTitle>Garage</PageTitle>
      <ControlPanel />
      <CarList />
    </RaceRegistryProvider>
  );
}

export default Garage;
