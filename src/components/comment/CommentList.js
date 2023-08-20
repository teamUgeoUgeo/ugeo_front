import React from "react";
import Comment from "./Comment";
import classes from "./CommentList.module.css";

const CommentList = ({ comment, onModify, onDelete }) => {
  const deleteHandler = (id) => {
    onDelete(id);
  };

  const modifyHandler = (data) => {
    onModify(data);
  };

  return (
    <ul className={classes.comment_list}>
      {comment.map((data) => (
        <li key={data.id}>
          <Comment data={data} onDelete={deleteHandler} onModify={modifyHandler} />
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
