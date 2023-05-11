import { Link, Form } from 'react-router-dom';
import classes from './PostList.module.css';

const PostList = () => {
  return (
    <div className={classes.home} >
      <aside className={classes.sidemenu}>
        <nav>
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/">검색</Link>
            </li>
            <li>
              <Link to="/">설정</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <section className={classes.content}>
        <Form className={classes.form}>
          <input type="text" name="price" placeholder="소비한 금액"/>
         <textarea name="content" id="" cols="30" rows="10" placeholder="어디다 썼나요?"></textarea>
        </Form>
        <ul className={classes.list}>
            <li>글1</li>
            <li>글2</li>
        </ul>
      </section>
    </div>
  );
};

export default PostList;
