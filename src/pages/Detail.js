import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import PageContent from "../components/PageContent";
import classes from "../components/PageContent.module.css";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import { getAuthToken, getUserInfo } from "../util/auth";
import { createPost, getPost } from "../util/crud";

const DetailPage = () => {
  const token = getAuthToken();
  const user = getUserInfo();
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const currentPath = window.location.pathname.split("/");
  const currentId = Number(currentPath[currentPath.length - 1]);

  const fetchData = async () => {
    const postData = await getPost("/api/article/", token);
    const commentData = await getPost(`/api/comment/${currentId}`, token);
    setPost(postData.filter((el) => (el.id === currentId ? el : "")));
    setComment(commentData.sort((a, b) => new Date(a.create_at) - new Date(b.create_at)));
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  //   const handleDelete = async (id) => {
  //     setData(data.filter((el) => el.id !== id));
  //     await deletePost(`/api/article/${id}`, token);
  //   };

  const handleSubmit = async (newComment) => {
    newComment = {
      ...newComment,
      article_id: currentId,
    };

    await createPost("/api/comment/", newComment, token);
    //상태코드 204로 response 없음 확인

    newComment = {
      ...newComment,
      id: "백엔드에서 코멘트id 리턴 필요",
      nickname: user.nickname,
      username: user.username,
      create_at: new Date().toISOString(),
    };
    //create_at의 경우에도 보통 리턴받아서 쓰는지?
    //아니면 프론트에서 date객체 만들어도 되는지 확인이 필요합니다.

    setComment([...comment, newComment]);
  };

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
              {post.map((data) => {
                return <Post key={data.id} data={data} />;
              })}
              <div className={classes.comment_form}>
                <CommentForm onSubmit={handleSubmit} />
                <CommentList comment={comment} />
              </div>
            </section>
          </div>
        )}
      </>
    </PageContent>
  );
};

export default DetailPage;
