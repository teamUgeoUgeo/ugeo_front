import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import classes from "./PostList.module.css";

const PostList = ({ datas, onDelete, onModify }) => {
  const deleteHandler = (id) => {
    onDelete(id);
  };

  const modifyHandler = (data) => {
    onModify(data);
  };

  return (
    <ul className={classes.list}>
      {datas.map((data) => {
        return (
          <li key={data.id}>
            <Link to={`article/${data.id}`}>
              <Post data={data} onDelete={deleteHandler} onModify={modifyHandler} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

PostList.propTypes = {
  datas: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModify: PropTypes.func.isRequired,
};

export default PostList;
