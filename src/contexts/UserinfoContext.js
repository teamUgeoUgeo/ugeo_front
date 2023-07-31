import { createContext } from "react";
import useUserinfo from "../hooks/useUserinfo";

const UserinfoContext = createContext();
export default UserinfoContext;

export const UserinfoProvider = ({ children }) => {
  const { user, setUser } = useUserinfo();
  return <UserinfoContext.Provider value={{ user, setUser }}>{children}</UserinfoContext.Provider>;
};
