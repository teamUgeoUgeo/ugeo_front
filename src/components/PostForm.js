import { Form } from "react-router-dom";
import classes from "./PostForm.module.css";

const PostForm = () => {
  return (
    <Form className={classes.form}>
      <input type="text" name="price" placeholder="소비한 금액" />
      <textarea
        name="content"
        id=""
        cols="30"
        rows="10"
        placeholder="어디다 썼나요?"
      ></textarea>
      <button className={classes.button} type="button">
        등록하기
      </button>
    </Form>
  );
};

export default PostForm;
