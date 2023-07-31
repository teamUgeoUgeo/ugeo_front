import { useState } from "react";

const useUserinfo = () => {
  const [user, setUser] = useState({
    email: localStorage.getItem("email"),
    username: localStorage.getItem("username"),
    nickname: localStorage.getItem("nickname"),
  });

  return { user, setUser };
};

export default useUserinfo;
