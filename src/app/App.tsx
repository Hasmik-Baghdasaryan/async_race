import { Outlet } from 'react-router';

import Header from '@/components/layouts/Header/Header';
import Main from '@/components/layouts/Main/Main';
import Toast from '@/components/common/Toast/Toast';

function App() {
  return (
    <div>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Toast />
    </div>
  );
}

export default App;
