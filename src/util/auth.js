import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const expirationDate = new Date(localStorage.getItem("expiration"));
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (token) {
    alert("이미 로그인 하셨습니다.");
    return redirect("/");
  }

  return null;
}
