import { getAuthToken } from "./auth";
const token = getAuthToken();
const header = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

export const getPost = async (url) => {
  const response = await fetch(url, {
    headers: header,
  });

  const data = await response.json();
  return data;
};

export const createPost = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: header,
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
};

export const updatePost = async (url, body) => {
  await fetch(url, {
    method: "PUT",
    headers: header,
    body: JSON.stringify(body),
  });
};

export const deletePost = async (url) => {
  await fetch(url, {
    method: "DELETE",
    headers: header,
  });
};
