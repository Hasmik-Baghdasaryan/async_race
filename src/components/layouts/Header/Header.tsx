import { useState, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router';

import styles from './Header.module.css';

const GARAGE_PATH = '/';
const WINNERS_PATH = '/winners';

function Header(): ReactNode {
  const location = useLocation();
  const currentPath = location.pathname + location.search;
  const [prevPath, setPrevPath] = useState(currentPath);
  const [garagePath, setGaragePath] = useState(
    location.pathname === GARAGE_PATH ? currentPath : GARAGE_PATH,
  );
  const [winnersPath, setWinnersPath] = useState(
    location.pathname === WINNERS_PATH ? currentPath : WINNERS_PATH,
  );

  if (currentPath !== prevPath) {
    setPrevPath(currentPath);
    if (location.pathname === GARAGE_PATH) setGaragePath(currentPath);
    if (location.pathname === WINNERS_PATH) setWinnersPath(currentPath);
  }

  return (
    <header>
      <nav className={styles.header}>
        <NavLink to={garagePath}>Garage</NavLink>
        <NavLink to={winnersPath}>Winners</NavLink>
      </nav>
    </header>
  );
}

export default Header;
