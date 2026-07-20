import { useCars } from '@/components/features/garage/hooks/useCars';
import { useAppSelector } from '@/store/hooks';
import { selectWinnerCarId } from '@/components/features/garage/race/raceSlice';
import { useRaceNavigationReset } from '@/components/features/garage/race/hooks/useRaceNavigationReset';
import { CARS_PER_PAGE } from '@/constants/constants';
import { getErrorMessage } from '@/helpers/httpClient';

import Empty from '@/components/Empty/Empty';
import Error from '@/components/Error/Error';
import Loader from '@/components/Loader/Loader';
import Pagination from '@/components/Pagination/Pagination';
import CarItem from './CarItem/CarItem';
import WinnerModal from '@/components/features/garage/components/WinnerModal/WinnerModal';

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
