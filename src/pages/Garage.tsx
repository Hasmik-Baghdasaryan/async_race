import { SelectedCarProvider } from '@/components/features/garage/context/SelectedCarContext';
import { RaceRegistryProvider } from '@/components/features/garage/race/context/RaceRegistryContext';
import CarList from '@/components/features/garage/components/CarList/CarList';
import ControlPanel from '@/components/features/garage/components/ControlPanel/ControlPanel';

function Garage() {
  return (
    <SelectedCarProvider>
      <RaceRegistryProvider>
        <ControlPanel />
        <CarList />
      </RaceRegistryProvider>
    </SelectedCarProvider>
  );
}

export default Garage;
