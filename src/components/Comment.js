import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";
import React from "react";
import classes from "../components/Comment.module.css";
import { formatDate } from "../util/crud";

const Comment = ({ data }) => {
  return (
    <article className={classes.comment}>
      <div className={classes.comment_top}>
        <div className={classes.comment_info}>
          <p>
            {data.nickname}
            <span className={classes.username}>@{data.username}</span>
          </p>
          <p className={classes.date}>{formatDate(data.create_at)}</p>
        </div>
        <div className="icon">
          <MoreVertIcon />
        </div>
      </div>
      {data.detail}
    </article>
  );
};

Comment.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Comment;
