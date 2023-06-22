import React, { useEffect, useState } from "react";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import PageContent from "../components/PageContent";
import classes from "../components/PageContent.module.css";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const token = useRouteLoaderData("root");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchData = async (token) => {
    if (!token || token === "EXPIRED") {
      return;
    }

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
    fetchData(token);
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
    } else {
      setData(
        data.map((el) => {
          if (el.id === postData.article_id) {
            return {
              ...el,
              amount: postData.amount,
              detail: postData.detail,
            };
          }
        })
      );
    }
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
      </>
    </PageContent>
  );
};

export default HomePage;
