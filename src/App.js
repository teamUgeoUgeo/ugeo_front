import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateCompletePage from "./pages/CreateComplete";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RootLayout from "./pages/Root";
import SettingPage from "./pages/Setting";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "user",
          children: [
            { path: "login", element: <LoginPage /> },
            { path: "create", element: <LoginPage /> },
            {
              path: "create/complete",
              element: <CreateCompletePage />,
            },
            { path: "setting", element: <SettingPage /> },
          ],
        },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
