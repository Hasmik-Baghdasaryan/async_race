import { useCars } from '@/components/features/garage/hooks/useCars';
import Empty from '@/components/common/Empty/Empty';
import Error from '@/components/common/Error/Error';
import Loader from '@/components/common/Loader/Loader';
import CarItem from './CarItem/CarItem';

import styles from './CarList.module.css';

function CarList() {
  const { isLoading, cars, error, totalCount } = useCars();

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;
  if (!cars || !cars.length) return <Empty name="cars" />;

  return (
    <>
      <div className={styles.carsWrapper}>
        {cars.map((car) => (
          <CarItem car={car} key={car.id} />
        ))}
      </div>
      <div className={styles.footer}>
        <p className={styles.total}>Total Cars: {totalCount}</p>
      </div>
    </>
  );
}

export default CarList;
