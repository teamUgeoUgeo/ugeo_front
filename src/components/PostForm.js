import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import classes from "./PostForm.module.css";

const PostForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");

  const formRef = useRef();

  const onSubmitHandler = () => {
    const postData = {
      amount: amount,
      detail: detail,
    };

    const method = "POST";

    onSubmit(postData, method);
    formRef.current.reset();
  };

  const onChangeAmountHandler = (event) => {
    setAmount(event.target.value);
  };

  const onChangeDetailHandler = (event) => {
    setDetail(event.target.value);
  };

  const checkValue = amount !== "" && detail !== "";

  return (
    <form ref={formRef} className={classes.form} method="post">
      <input
        type="number"
        name="amount"
        placeholder="소비한 금액"
        onChange={onChangeAmountHandler}
      />
      <textarea
        name="detail"
        placeholder="어디다 썼나요?"
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

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PostForm;
