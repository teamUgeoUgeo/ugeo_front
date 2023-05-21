import { Form } from "react-router-dom";
import classes from "./PostForm.module.css";

const PostForm = () => {
  return (
    <Form className={classes.form} method="post">
      <input type="text" name="amount" placeholder="소비한 금액" />
      <textarea name="detail" id="" placeholder="어디다 썼나요?"></textarea>
      <button className={`${classes.button} default`}>등록하기</button>
    </Form>
  );
};

export default PostForm;
