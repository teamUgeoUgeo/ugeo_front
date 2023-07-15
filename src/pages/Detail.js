import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import PageContent from "../components/PageContent";
import classes from "../components/PageContent.module.css";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import { getAuthToken, getUserInfo } from "../util/auth";
import { createPost, deletePost, getPost, updatePost } from "../util/crud";

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

  const handleDelete = async (id) => {
    setComment(comment.filter((el) => el.id !== id));
    await deletePost(`/api/comment/${id}`, token);
  };

  const handleSubmit = async (newComment) => {
    newComment = {
      ...newComment,
      article_id: currentId,
    };

    const response = await createPost("/api/comment/", newComment, token);

    newComment = {
      ...newComment,
      id: response.comment_id,
      nickname: user.nickname,
      username: user.username,
      create_at: response.created_at,
    };

    setComment([...comment, newComment]);
  };

  const handleModify = async (postData) => {
    setComment(
      comment.map((el) => {
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
    await updatePost("/api/comment/", postData, token);
  };

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
                <CommentList comment={comment} onDelete={handleDelete} onModify={handleModify} />
              </div>
            </section>
          </div>
        )}
      </>
    </PageContent>
  );
};

export default DetailPage;
