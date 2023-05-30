import React from "react";
import { redirect } from "react-router-dom";
import PageContent from "../components/PageContent";
import CryptoJS from "crypto-js";
import AuthForm from "../components/AuthForm";
import classes from "../components/PageContent.module.css";

const LoginPage = () => {
  return (
    <PageContent>
      <div className={`${classes.logout} max-width`}>
        <AuthForm />
      </div>
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

  let body = authData;

  const loginPath = "/user/login";
  let mode = window.location.pathname;

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
