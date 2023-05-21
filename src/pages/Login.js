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
  const path = window.location.pathname;
  const mode = path || "/user/login";

  if (mode !== "/user/login" && mode !== "/user/create") {
    throw json({ message: "지원하지 않는 모드 입니다." }, { status: 422 });
  }

  function hashPassword(password) {
    const hashedPassword = CryptoJS.SHA3(password).toString();
    return hashedPassword;
  }

  const data = await request.formData();
  const authData = {
    username: data.get("email"),
    password: hashPassword(data.get("password")),
  };

  const additionalData = {
    email: data.get("email"),
    nickname: data.get("nickname"),
  };

  let header = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let body = new URLSearchParams(authData);

  if (mode !== "/user/login") {
    header["Content-Type"] = "application/json";
    body = JSON.stringify({ ...authData, ...additionalData });
  }

  const response = await fetch("/api" + mode, {
    method: "POST",
    headers: header,
    body: body,
  });

  if (response.status === 401 || response.status === 409) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "사용자 인증 불가." }, { status: 500 });
  }

  if (mode !== "/user/login") {
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
