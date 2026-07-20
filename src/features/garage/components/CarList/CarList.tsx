import Empty from '@/components/Empty/Empty';
import Error from '@/components/Error/Error';
import Loader from '@/components/Loader/Loader';
import Pagination from '@/components/Pagination/Pagination';
import WinnerModal from '@/features/garage/components/WinnerModal/WinnerModal';
import { CARS_PER_PAGE } from '@/features/garage/constants';
import { useCars } from '@/features/garage/hooks/useCars';
import { useRaceNavigationReset } from '@/features/garage/race/hooks/useRaceNavigationReset';
import { selectWinnerCarId } from '@/features/garage/race/raceSlice';
import { getErrorMessage } from '@/lib/httpClient';
import { useAppSelector } from '@/store/hooks';

import CarItem from './CarItem/CarItem';
import styles from './CarList.module.css';

function CarList() {
  const { isLoading, cars, error, totalCount = 0 } = useCars();
  const winnerCarId = useAppSelector(selectWinnerCarId);
  const winnerCar = cars?.find((car) => car.id === winnerCarId);
  useRaceNavigationReset(cars?.map((car) => car.id) ?? []);

  if (isLoading) return <Loader />;
  if (error) return <Error message={getErrorMessage(error)} />;
  if (!cars || !cars.length) return <Empty name="cars" />;

  return (
    <>
      {winnerCar && <WinnerModal car={winnerCar} />}
      <div className={styles.carsWrapper}>
        {cars.map((car) => (
          <CarItem car={car} key={car.id} />
        ))}
      </div>
      <div className={styles.footer}>
        <p className={styles.total}>Total Cars: {totalCount}</p>
        <Pagination totalItems={totalCount} itemsPerPage={CARS_PER_PAGE} />
      </div>
    </>
  );
}

export default CarList;
