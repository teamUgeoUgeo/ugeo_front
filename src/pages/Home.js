import { Link, useRouteLoaderData, useActionData } from "react-router-dom";
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
    if (token) {
      fetchData(token);
    } else {
      setData(null);
    }

    if (newData) {
      setData(newData);
    }
  }, [token, newData]);

  if (!data) {
    return (
      <PageContent>
        <h1>메인화면</h1>
        <p>로그인 이전의 메인화면입니다.</p>
        <p>로그인을 해 주세요.</p>
        <Link className={classes.link + " link"} to="/user/login">
          로그인하기
        </Link>
      </PageContent>
    );
  } else {
    return (
      <PageContent>
        <Sidebar />
        <section className={`${classes.section}`}>
          <PostForm />
          <PostList datas={data} />
        </section>
      </PageContent>
    );
  }
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

  const writeRes = await fetch("/api/article/", {
    method: "POST",
    headers: header,
    body: body,
  });

  const listRes = await fetch("/api/article/", {
    method: "GET",
    headers: header,
  });

  const newData = await listRes.json();

  return newData;
}
