import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../util/crud";
import classes from "./Post.module.css";

const Post = ({ data, onDelete, onModify }) => {
  const [showEdit, setShowEdit] = useState("");
  const [toggleModify, setToggleModify] = useState(null);
  const [changeAmount, setChangeAmount] = useState(null);
  const [changeDetail, setChangeDetail] = useState(null);

  const editRef = useRef();
  const textareaRef = useRef();

  const preventBubbling = (event) => {
    event.preventDefault();
  };

  const onShowEdithandler = (event, id) => {
    event.preventDefault();
    setShowEdit(id);
  };

  const onModifyHandler = (data) => {
    setToggleModify(data.id);
    setChangeAmount(data.amount);
    setChangeDetail(data.detail);
  };

  const onChangeAmount = (event) => {
    setChangeAmount(event.target.value);
  };

  const onChangeDetail = (event) => {
    setChangeDetail(event.target.value);
  };

  const onCancelModifyHandler = () => {
    setToggleModify("");
    setShowEdit("");
  };

  const onCompleteModifyHandler = (data) => {
    const postData = {
      amount: changeAmount,
      detail: changeDetail,
      article_id: data.id,
    };

    onModify(postData);
    setToggleModify(null);
    setShowEdit(null);

    if (postData.detail === "" || postData.amount === "") {
      return;
    }
  };

  const onDeleteHandler = (id) => {
    onDelete(id);
  };

  const decoAmount = (amount) => {
    if (amount < 1000) {
      return `gray`;
    }
    if (amount < 5000) {
      return `blue`;
    }
    if (amount < 10000) {
      return `brown`;
    }
    if (amount < 50000) {
      return `green`;
    }
    if (amount >= 50000) {
      return `yellow`;
    }
  };

  const addComma = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        setShowEdit(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editRef]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [changeDetail]);

  return (
    <>
      {toggleModify !== data.id && (
        <article className={`${classes.background} ${classes.article}`}>
          <div className={classes.top}>
            <div className={classes.user_info}>
              <span className={`${classes.amount} ${decoAmount(data.amount)}`}>
                {addComma(data.amount)}
              </span>
              <p>
                {data.nickname}
                <span className={classes.username}>@{data.username}</span>
              </p>
              <p className={classes.date}>{formatDate(data.create_at)}</p>
            </div>
            <div className="icon" onClick={(event) => onShowEdithandler(event, data.id)}>
              <MoreVertIcon />
            </div>
            {showEdit === data.id && (
              <ul ref={editRef} className={classes.edit} onClick={preventBubbling}>
                <li>
                  <button onClick={() => onModifyHandler(data)}>수정</button>
                </li>
                <li>
                  <button onClick={() => onDeleteHandler(data.id)}>삭제</button>
                </li>
              </ul>
            )}
          </div>
          <div className={classes.content}>
            <p className={classes.detail}>{data.detail}</p>
          </div>
        </article>
      )}
      {toggleModify === data.id && (
        <form className={`${classes.background} ${classes.form}`} onClick={preventBubbling}>
          <input
            className={classes.changeAmount}
            type="text"
            name="amount"
            defaultValue={data.amount}
            onChange={onChangeAmount}
          />
          <textarea
            ref={textareaRef}
            name="detail"
            maxLength={255}
            defaultValue={data.detail}
            onChange={onChangeDetail}
          ></textarea>
          <div className="flex-row">
            <button
              type="button"
              className={`${classes.modify} default round`}
              onClick={() => onCompleteModifyHandler(data)}
            >
              수정
            </button>
            <button
              type="button"
              className={`${classes.cancel} default round`}
              onClick={onCancelModifyHandler}
            >
              취소
            </button>
          </div>
        </form>
      )}
    </>
  );
};

Post.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Post;
