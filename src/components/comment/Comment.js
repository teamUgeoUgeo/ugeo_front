import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../../util/crud";
import classes from "./Comment.module.css";

const Comment = ({ data, onDelete, onModify }) => {
  const [showEdit, setShowEdit] = useState("");
  const [toggleModify, setToggleModify] = useState(null);
  const [changeDetail, setChangeDetail] = useState(null);

  const editRef = useRef();
  const textareaRef = useRef();

  const onShowEdithandler = (event, id) => {
    event.preventDefault();
    setShowEdit(id);
  };

  const onModifyHandler = (data) => {
    setToggleModify(data.id);
    setChangeDetail(data.detail);
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
        <article className={classes.comment}>
          <div className={classes.comment_top}>
            <div className={classes.comment_info}>
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
              <ul ref={editRef} className={classes.edit}>
                <li>
                  <button onClick={() => onModifyHandler(data)}>수정</button>
                </li>
                <li>
                  <button onClick={() => onDeleteHandler(data.id)}>삭제</button>
                </li>
              </ul>
            )}
          </div>
          {data.detail}
        </article>
      )}
      {toggleModify === data.id && (
        <form className={`${classes.form}`}>
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
              className={`${classes.modify} default`}
              onClick={() => onCompleteModifyHandler(data)}
            >
              수정
            </button>
            <button
              type="button"
              className={`${classes.cancel} default`}
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

export default Comment;
