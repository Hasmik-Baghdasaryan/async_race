import { SelectedCarProvider } from '@/components/features/garage/context/SelectedCarContext';
import CarList from '@/components/features/garage/components/CarList/CarList';
import ControlPanel from '@/components/features/garage/components/ControlPanel/ControlPanel';

function Garage() {
  return (
    <SelectedCarProvider>
      <ControlPanel />
      <CarList />
    </SelectedCarProvider>
  );
}

export default Garage;
