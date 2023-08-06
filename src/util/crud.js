import { ERROR_MESSAGE } from "../constants/dataTypes";

const header = (token) => {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getPost = async (url, token) => {
  try {
    const response = await fetch(url, {
      headers: header(token),
    });

    if (response.status === 401) {
      throw new Error(ERROR_MESSAGE.notAuthorized);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export const createPost = async (url, body, token) => {
  const response = await fetch(url, {
    method: "POST",
    headers: header(token),
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
};

export const updatePost = async (url, body, token) => {
  await fetch(url, {
    method: "PUT",
    headers: header(token),
    body: JSON.stringify(body),
  });
};

export const deletePost = async (url, token) => {
  await fetch(url, {
    method: "DELETE",
    headers: header(token),
  });
};

export const formatDate = (datetext) => {
  const date = new Date(datetext);
  let year = date.getFullYear().toString().slice(2);
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let hour = date.getHours().toString().padStart(2, "0");
  let minute = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
};
