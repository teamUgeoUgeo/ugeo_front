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
      throw new Error("토큰을 찾을 수 없습니다.");
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
