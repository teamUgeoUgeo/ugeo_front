import CryptoJS from "crypto-js";
import { ERROR_MESSAGE } from "../constants/dataTypes";

export const header = (body) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
};

export const checkExist = async (url, body) => {
  try {
    const response = await fetch(url, header(body));
    const keyname = Object.keys(body)[0];

    if (response.status === 409) {
      if (keyname === "email") {
        throw new Error(ERROR_MESSAGE.existEmail);
      }
      if (keyname === "username") {
        throw new Error(ERROR_MESSAGE.existUsername);
      }
    }
  } catch (error) {
    return error.message;
  }
};

export const hashPassword = (password) => {
  const hashedPassword = CryptoJS.SHA3(password).toString();
  return hashedPassword;
};

export const login = async (url, body) => {
  try {
    const response = await fetch(url, header(body));

    if (response.status === 401) {
      throw new Error(ERROR_MESSAGE.invalidLogin);
    }

    const data = await response.json();
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("expiration", expiration.toISOString());
    localStorage.setItem("email", data.email);
    localStorage.setItem("username", data.username);
    localStorage.setItem("nickname", data.nickname);

    return response.status;
  } catch (error) {
    return error.message;
  }
};

export const register = async (url, body) => {
  try {
    const response = await fetch(url, header(body));
    return response.status;
  } catch (error) {
    return error.message;
  }
};

export const logout = async () => {
  localStorage.clear();
};

export const getTokenDuration = () => {
  const expirationDate = new Date(localStorage.getItem("expiration"));
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return logout();
  }

  return token;
};
