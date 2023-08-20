import React, { useEffect, useRef, useState } from "react";
import classes from "./CommentForm.module.css";

const CommentForm = ({ onSubmit }) => {
  const [detail, setDetail] = useState("");
  const [focus, setFocus] = useState("");
  const [checkValue, setCheckValue] = useState(false);

  const formRef = useRef();
  const textareaRef = useRef();

  const onSubmitHandler = () => {
    const commentData = {
      detail: detail,
    };

    onSubmit(commentData);
    formRef.current.reset();
  };

  const onChangeDetailHandler = (event) => {
    setCheckValue(
      event.target.value.split("").filter((el) => el !== " " && el !== "\n").length > 0
    );
    setDetail(event.target.value);
  };

  const onFocusHandler = () => {
    setFocus(classes.focus);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [detail]);

  return (
    <form ref={formRef} className={classes.form} method="post">
      <textarea
        ref={textareaRef}
        name="detail"
        className={focus}
        placeholder="댓글을 남겨보세요."
        maxLength={255}
        onFocus={onFocusHandler}
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

export default CommentForm;
