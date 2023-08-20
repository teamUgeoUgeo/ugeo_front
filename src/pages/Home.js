import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageContent from "../components/common/PageContent";
import classes from "../components/common/PageContent.module.css";
import Sidebar from "../components/common/Sidebar";
import PostForm from "../components/post/PostForm";
import PostList from "../components/post/PostList";
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
            <h1>UgeoUgeo</h1>
            <p>가계부 외롭게 혼자 쓰지 말아요.</p>
            <p>친구랑 같이 적어요.</p>
            <div className={classes.flex}>
              <Link className={classes.link + " link"} to="/user/login">
                로그인하기
              </Link>
            </div>
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
