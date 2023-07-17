import { header } from "./crud";

export const getUserInfo = () => {
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");
  const nickname = localStorage.getItem("nickname");

  return {
    email,
    username,
    nickname,
  };
};
