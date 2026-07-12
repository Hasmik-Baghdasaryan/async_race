import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

import styles from './Header.module.css';

function Header(): ReactNode {
  return (
    <header>
      <nav className={styles.header}>
        <NavLink to="/">Garage</NavLink>
        <NavLink to="/winners">Winners</NavLink>
      </nav>
    </header>
  );
}

export default Header;
