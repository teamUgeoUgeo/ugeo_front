import { useContext, useState } from "react";
import UserinfoContext from "../contexts/UserinfoContext";
import { getAuthToken } from "../util/auth";
import { createPost, deletePost, getPost, updatePost } from "../util/crud";

export const useCrud = (url) => {
  const token = getAuthToken();
  const { user } = useContext(UserinfoContext);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const resdata = await getPost(url, token);
    setData(resdata);
  };

  const onDelete = async (id) => {
    setData(data.filter((el) => el.id !== id));
    await deletePost(url + id, token);
  };

  const onSubmit = async (postData) => {
    const response = await createPost(url, postData, token);
    postData["id"] = response.article_id;

    postData = {
      ...postData,
      id: response.article_id,
      create_at: response.created_at,
      username: user.username,
      nickname: user.nickname,
    };

    setData([postData, ...data]);
  };

  const onModify = async (postData) => {
    setData(
      data.map((el) => {
        if (el.id === postData.article_id) {
          el = {
            ...el,
            amount: postData.amount,
            detail: postData.detail,
          };
        }
        return el;
      }),
    );
    await updatePost(url, postData, token);
  };

  return { data, fetchData, onDelete, onSubmit, onModify };
};
