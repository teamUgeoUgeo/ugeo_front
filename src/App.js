import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';
import LoginPage, { action as loginAction } from './pages/Login';
import CreatePage, { action as createAction } from './pages/Create';
import CreateCompletePage from './pages/CreateComplete';
import SettingPage from './pages/Setting';
import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/user/Login', element: <LoginPage />, action: loginAction, loader: checkAuthLoader},
      { path: '/user/create', element: <CreatePage />, action: createAction},
      { path: '/user/create/complete', element: <CreateCompletePage /> },
      { path:  '/user/setting', element: <SettingPage />},
      { path: '/auth/logout', action: logoutAction },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
