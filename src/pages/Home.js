import React from "react";
import {
  Link,
  useRouteLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import PageContent from "../components/PageContent";
import Sidebar from "../components/Sidebar";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import classes from "../components/PageContent.module.css";

const HomePage = () => {
  const newData = useActionData();
  const token = useRouteLoaderData("root");
  const [data, setData] = useState(null);

  const fetchData = async (token) => {
    const response = await fetch("/api/article/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    if (token || newData) {
      fetchData(token);
    } else {
      setData(null);
    }
  }, [token, newData]);

  return (
    <PageContent>
      {!token && (
        <>
          <h1>메인화면</h1>
          <p>로그인 이전의 메인화면입니다.</p>
          <p>로그인을 해 주세요.</p>
          <Link className={classes.link + " link"} to="/user/login">
            로그인하기
          </Link>
        </>
      )}
      {data && (
        <>
          <Sidebar />
          <section className={classes.section}>
            <PostForm />
            <PostList datas={data} />
          </section>
        </>
      )}
    </PageContent>
  );
};

export default HomePage;

export async function action({ request }) {
  const token = localStorage.getItem("token");

  const data = await request.formData();
  const postData = {
    amount: data.get("amount"),
    detail: data.get("detail"),
  };

  let header = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let body = JSON.stringify(postData);

  const response = await fetch("/api/article/", {
    method: "POST",
    headers: header,
    body: body,
  });

  if (response.ok) {
    return true;
  }

  return redirect("/");
}
