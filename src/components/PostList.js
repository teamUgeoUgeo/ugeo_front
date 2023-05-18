
import PostForm from './PostForm';
import classes from './PostList.module.css';
import pageClasses from './PageContent.module.css'

const PostList = () => {
  return (
      <section className={`${pageClasses.section} ${classes.section}`}>
        <PostForm></PostForm>
        <ul className={classes.list}>
 
        </ul>
      </section>
  );
};

export default PostList;
