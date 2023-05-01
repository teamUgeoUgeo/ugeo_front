import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';
import AuthPage, { action as authAction } from './pages/Auth';
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
      { path: '/auth/Login/', element: <AuthPage />, action: authAction, loader: checkAuthLoader},
      { path: '/register/', element: <AuthPage />, action: authAction, loader: checkAuthLoader},
      { path: '/auth/logout/', action: logoutAction },
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
