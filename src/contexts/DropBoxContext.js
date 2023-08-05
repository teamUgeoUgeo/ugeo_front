import { createContext } from "react";
import useDropBox from "../hooks/useDropBox";

const DropBoxContext = createContext();
export default DropBoxContext;

export const DropBoxProvider = ({ children }) => {
  const { isChanged, setIsChanged, changeHandler } = useDropBox();
  return (
    <DropBoxContext.Provider value={{ isChanged, setIsChanged, changeHandler }}>
      {children}
    </DropBoxContext.Provider>
  );
};
