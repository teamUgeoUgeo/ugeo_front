import { json, redirect } from "react-router-dom";
import PageContent from "../components/PageContent";
import CryptoJS from "crypto-js";

import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  return (
    <PageContent>
      <AuthForm />
    </PageContent>
  );
};

export default LoginPage;

export async function action({ request }) {

  function hashPassword(password) {
    const hashedPassword = CryptoJS.SHA3(password).toString();
    return hashedPassword;
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: hashPassword(data.get("password")),
  };

  const additionalData = {
    username: data.get("username"),
    nickname: data.get("nickname"),
  };

  let header = {
    "Content-Type": "application/json",
  };

  let body = authData

  const loginPath = `/user/login?email=${authData.email}&password=${authData.password}`
  const path = window.location.pathname;
  let mode = "/user/create" 

  if(path !== "/user/create" ){
    mode = loginPath
  }

  if (mode !== loginPath && mode !== "/user/create") {
    throw json({ message: "지원하지 않는 모드 입니다." }, { status: 422 });
  }

  if (mode !== loginPath) {
    body = { ...authData, ...additionalData };
  }

  const response = await fetch("/api" + mode, {
    method: "POST",
    headers: header,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return response;
  }

  if (mode !== loginPath) {
    return redirect("/user/create/complete");
  } else {
    const resData = await response.json();
    const token = resData.access_token;

    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
  }
}
