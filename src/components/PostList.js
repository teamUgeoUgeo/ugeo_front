import { Form } from 'react-router-dom';
import PostForm from './PostForm';
import classes from './PostList.module.css';
import pageClasses from './PageContent.module.css'

const PostList = () => {
  return (
      <section className={`${pageClasses.section} ${classes.section}`}>
        <PostForm></PostForm>
        <ul className={classes.list}>
            <li>글1</li>
            <li>글2</li>
            <li>글3</li>
            <li>글4</li>
            <li>글5</li>
            <li>글6</li>
            <li>글7</li>
            <li>글7</li>
            <li>글7</li>
            <li>글7</li>
        </ul>
      </section>
  );
};

export default PostList;
