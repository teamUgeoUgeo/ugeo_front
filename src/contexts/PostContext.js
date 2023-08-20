import { createContext } from "react";
import { useCrud } from "../hooks/useCrud";

const PostContext = createContext();
export default PostContext;

export const PostProvider = ({ children }) => {
  const { data, fetchData, onDelete, onSubmit, onModify } = useCrud("/api/article/");
  return (
    <PostContext.Provider value={{ data, fetchData, onDelete, onSubmit, onModify }}>
      {children}
    </PostContext.Provider>
  );
};
