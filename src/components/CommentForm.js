import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import classes from "./CommentForm.module.css";

const CommentForm = ({ onSubmit }) => {
  const [detail, setDetail] = useState("");

  const formRef = useRef();

  const onSubmitHandler = () => {
    const commentData = {
      detail: detail,
    };

    onSubmit(commentData);
    formRef.current.reset();
  };

  const onChangeDetailHandler = (event) => {
    setDetail(event.target.value);
  };

  const checkValue = detail !== "";

  return (
    <form ref={formRef} className={classes.form} method="post">
      <textarea
        name="detail"
        placeholder="댓글을 남겨보세요."
        maxLength={255}
        onChange={onChangeDetailHandler}
      ></textarea>
      <button
        disabled={checkValue ? false : true}
        type="button"
        className={`${classes.button} ${checkValue ? "" : `disabled`} default`}
        onClick={onSubmitHandler}
      >
        등록하기
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
