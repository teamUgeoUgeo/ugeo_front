import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PageContent from "../components/PageContent";
import classes from "../components/PageContent.module.css";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import { getAuthToken } from "../util/auth";
import { getPost } from "../util/crud";

const DetailPage = () => {
  const token = getAuthToken();
  const [data, setData] = useState([]);
  const currentPath = window.location.pathname.split("/");
  const currentId = Number(currentPath[currentPath.length - 1]);

  const fetchData = async () => {
    const resdata = await getPost("/api/article/", token);
    setData(resdata.filter((el) => (el.id === currentId ? el : "")));
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  //   const handleDelete = async (id) => {
  //     setData(data.filter((el) => el.id !== id));
  //     await deletePost(`/api/article/${id}`, token);
  //   };

  //   const handleSubmit = async (postData) => {
  //     const response = await createPost("/api/article/", postData, token);
  //     postData["id"] = response.article_id;
  //     setData([postData, ...data]);
  //   };

  //   const handleModify = async (postData) => {
  //     setData(
  //       data.map((el) => {
  //         if (el.id === postData.article_id) {
  //           el = {
  //             ...el,
  //             amount: postData.amount,
  //             detail: postData.detail,
  //           };
  //         }
  //         return el;
  //       })
  //     );
  //     await updatePost("/api/article/", postData, token);
  //   };

  return (
    <PageContent>
      <>
        {!token && <Navigate to="/"></Navigate>}
        {token && (
          <div className={`${classes.login} max-width`}>
            <Sidebar />
            <section className={classes.section}>
              {data.map((el) => {
                return <Post key={el.id} data={el} />;
              })}
            </section>
          </div>
        )}
      </>
    </PageContent>
  );
};

export default DetailPage;
