import { DATA_TYPE } from "../constants/dataTypes";

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
      throw new Error("접근 권한이 없습니다.");
    }

    const key = Object.keys(body).join();

    if (key !== DATA_TYPE.password) {
      localStorage.setItem(key, Object.values(body).join());
    }

    return response;
  } catch (error) {
    return error.message;
  }
};
