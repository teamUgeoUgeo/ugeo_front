import PropTypes from "prop-types";
import React from "react";
import Comment from "../components/Comment";
import classes from "../components/CommentList.module.css";

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

CommentList.propTypes = {
  comment: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModify: PropTypes.func.isRequired,
};

export default CommentList;
