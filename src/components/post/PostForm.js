import React, { useContext, useEffect, useRef, useState } from "react";
import PostContext from "../../contexts/PostContext";
import classes from "./PostForm.module.css";

const PostForm = () => {
  const { onSubmit } = useContext(PostContext);
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [checkDetail, setCheckDetail] = useState(false);
  const [checkAmount, setCheckAmount] = useState(false);
  const [checkValue, setCheckValue] = useState(false);

  const formRef = useRef();
  const textareaRef = useRef();

  const onSubmitHandler = () => {
    const postData = {
      amount: amount,
      detail: detail,
    };

    onSubmit(postData);
    formRef.current.reset();
  };

  const preventSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const onChangeAmountHandler = (event) => {
    setCheckAmount(Number(event.target.value) > 9);
    setAmount(event.target.value);
  };

  const onChangeDetailHandler = (event) => {
    setCheckDetail(
      event.target.value.split("").filter((el) => el !== " " && el !== "\n").length > 0,
    );
    setDetail(event.target.value);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
    setCheckValue(checkDetail && checkAmount);
  }, [detail, amount]);

  return (
    <form ref={formRef} className={classes.form} method="post">
      <input
        type="number"
        name="amount"
        placeholder="소비한 금액"
        onKeyDown={() => preventSubmit(event)}
        onChange={onChangeAmountHandler}
      />
      <textarea
        ref={textareaRef}
        name="detail"
        placeholder="어디다 썼나요?"
        maxLength={255}
        onChange={onChangeDetailHandler}
      ></textarea>
      <button
        disabled={checkValue ? false : true}
        type="button"
        className={`${classes.button} ${checkValue ? "" : `disabled`} default round`}
        onClick={onSubmitHandler}
      >
        등록하기
      </button>
    </form>
  );
};

export default PostForm;
