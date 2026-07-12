import { Outlet } from 'react-router';

import Header from '@/components/layouts/Header/Header';
import Main from '@/components/layouts/Main/Main';

function App() {
  return (
    <div>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default App;
