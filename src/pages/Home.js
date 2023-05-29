import React, { useState, useEffect } from "react";
import { Link, useRouteLoaderData, useNavigate } from "react-router-dom";
import PageContent from "../components/PageContent";
import Sidebar from "../components/Sidebar";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import classes from "../components/PageContent.module.css";

const HomePage = () => {
  const token = useRouteLoaderData("root");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchData = async (token) => {
    const response = await fetch("/api/article/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const getResdata = await response.json();
    setData(getResdata);

    if (!response.ok) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    } else {
      setData(null);
    }
  }, [token]);

  const handleDelete = async (id) => {
    setData(data.filter((el) => el.id !== id));

    const response = await fetch(`/api/article/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      navigate("/error");
    }
  };

  const handleSubmit = async (postData, method) => {
    let header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch("/api/article/", {
      method: method,
      headers: header,
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      navigate("/error");
    }

    if (method === "POST") {
      const postResData = await response.json();
      postData["id"] = postResData.article_id;
      setData([postData, ...data]);
    }
  };

  return (
    <PageContent>
      {!token && !data && (
        <div className={`${classes.logout} max-width`}>
          <h1>메인화면</h1>
          <p>로그인 이전의 메인화면입니다.</p>
          <p>로그인을 해 주세요.</p>
          <Link className={classes.link + " link"} to="/user/login">
            로그인하기
          </Link>
        </div>
      )}
      {token && data && (
        <div className={`${classes.login} max-width`}>
          <Sidebar />
          <section className={classes.section}>
            <PostForm onSubmit={handleSubmit} />
            <PostList
              datas={data}
              onDelete={handleDelete}
              onModify={handleSubmit}
            />
          </section>
        </div>
      )}
    </PageContent>
  );
};

export default HomePage;
