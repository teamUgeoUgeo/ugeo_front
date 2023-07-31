import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageContent from "../components/PageContent";
import classes from "../components/PageContent.module.css";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";
import UserinfoContext from "../contexts/UserinfoContext";
import { getAuthToken } from "../util/auth";
import { createPost, deletePost, getPost, updatePost } from "../util/crud";

const HomePage = () => {
  const token = getAuthToken();
  const navigate = useNavigate();
  const { user } = useContext(UserinfoContext);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const resdata = await getPost("/api/article/", token);
    setData(resdata);
  };

  useEffect(() => {
    if (!token) {
      navigate("/", { forceRefresh: true });
      return;
    }
    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    setData(data.filter((el) => el.id !== id));
    await deletePost(`/api/article/${id}`, token);
  };

  const handleSubmit = async (postData) => {
    const response = await createPost("/api/article/", postData, token);
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

  const handleModify = async (postData) => {
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
      })
    );
    await updatePost("/api/article/", postData, token);
  };

  return (
    <PageContent>
      <>
        {!token && (
          <div className={`${classes.logout} max-width`}>
            <h1>메인화면</h1>
            <p>로그인 이전의 메인화면입니다.</p>
            <p>로그인을 해 주세요.</p>
            <Link className={classes.link + " link"} to="/user/login">
              로그인하기
            </Link>
          </div>
        )}
        {token && (
          <div className={`${classes.login} max-width`}>
            <Sidebar />
            <section className={classes.section}>
              <PostForm onSubmit={handleSubmit} />
              <PostList datas={data} onDelete={handleDelete} onModify={handleModify} />
            </section>
          </div>
        )}
      </>
    </PageContent>
  );
};

export default HomePage;
