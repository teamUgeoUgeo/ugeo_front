import { ERROR_MESSAGE } from "../constants/dataTypes";

const header = (token) => {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const updateUserInfo = async (url, body, token) => {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: header(token),
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      throw new Error(ERROR_MESSAGE.notAuthorized);
    }

    if (response.status === 400) {
      throw new Error(ERROR_MESSAGE.invalidPassword);
    }

    const key = Object.keys(body);

    if (!key.includes("new_password")) {
      localStorage.setItem(key, Object.values(body).join());
    }

    return response;
  } catch (error) {
    return error.message;
  }
};

export const searchUserInfo = async (url) => {
  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
};
