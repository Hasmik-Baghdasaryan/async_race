import { createBrowserRouter, type RouteObject } from 'react-router';

import App from '@/app/App';
import Garage from '@/app/routes/Garage';
import NotFoundPage from '@/app/routes/NotFoundPage';
import Winners from '@/app/routes/Winners';

const router: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Garage /> },
      { path: '/winners', element: <Winners /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export default createBrowserRouter(router);
