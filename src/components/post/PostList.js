import { Link } from "react-router-dom";
import Post from "./Post";
import classes from "./PostList.module.css";

const PostList = ({ datas }) => {
  return (
    <ul className={classes.list}>
      {datas.map((data) => {
        return (
          <li key={data.id}>
            <Link to={`/article/${data.id}`}>
              <Post data={data} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
