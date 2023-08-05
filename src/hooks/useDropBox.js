import { useState } from "react";

const useDropBox = () => {
  const [isChanged, setIsChanged] = useState(false);

  const changeHandler = (event) => {
    setIsChanged(event);
  };

  return {
    isChanged,
    setIsChanged,
    changeHandler,
  };
};

export default useDropBox;
