import React, { useEffect, useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import PageContent from "../components/PageContent";
import classes from "../components/PageContent.module.css";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";
import { createPost, deletePost, getPost, updatePost } from "../util/crud";

const HomePage = () => {
  const token = useRouteLoaderData("root");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const resdata = await getPost("/api/article/");
    setData(resdata);
  };

  useEffect(() => {
    if (!token || token === "EXPIRED") {
      return;
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setData(data.filter((el) => el.id !== id));
    await deletePost(`/api/article/${id}`);
  };

  const handleSubmit = async (postData) => {
    const response = await createPost("/api/article/", postData);
    postData["id"] = response.article_id;
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

    await updatePost("/api/article/", postData);
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
              <PostList
                datas={data}
                onDelete={handleDelete}
                onModify={handleModify}
              />
            </section>
          </div>
        )}
      </>
    </PageContent>
  );
};

export default HomePage;
