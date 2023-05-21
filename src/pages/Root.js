import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Header from "../components/Header";
import { getTokenDuration } from "../util/auth";

const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/user/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
