import { RaceRegistryProvider } from '@/components/features/garage/race/context/RaceRegistryContext';
import CarList from '@/components/features/garage/components/CarList/CarList';
import ControlPanel from '@/components/features/garage/components/ControlPanel/ControlPanel';

function Garage() {
  return (
    <RaceRegistryProvider>
      <ControlPanel />
      <CarList />
    </RaceRegistryProvider>
  );
}

export default Garage;
