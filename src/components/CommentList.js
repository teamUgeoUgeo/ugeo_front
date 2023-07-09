import PropTypes from "prop-types";
import React from "react";
import Comment from "../components/Comment";
import classes from "../components/CommentList.module.css";

const CommentList = ({ comment }) => {
  return (
    <ul className={classes.comment_list}>
      {comment.map((data) => (
        <li key={data.id}>
          <Comment data={data} />
        </li>
      ))}
    </ul>
  );
};

CommentList.propTypes = {
  comment: PropTypes.array.isRequired,
};

export default CommentList;
