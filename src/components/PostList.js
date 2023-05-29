import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from "react";
import classes from "./PostList.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const PostList = ({ datas, onDelete, onModify }) => {
  const [showEdit, setShowEdit] = useState("");
  const [toggleModify, setToggleModify] = useState(null);
  const [changeAmount, setChangeAmount] = useState(null);
  const [changeDetail, setChangeDetail] = useState(null);
  const editRef = useRef();

  const onShowEdithandler = (id) => {
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

    const method = "PUT";

    onModify(postData, method);
    setToggleModify(null);
    setShowEdit(null);

    if (postData.detail === "" || postData.amount === "") {
      return;
    }

    data.amount = changeAmount;
    data.detail = changeDetail;
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

  return (
    <ul className={classes.list}>
      {datas.map((data) => {
        return (
          <li key={data.id}>
            {toggleModify !== data.id && (
              <article className={classes.article}>
                <div className={classes.top}>
                  <div className={classes.userinfo}>
                    <span
                      className={`${classes.amount} ${decoAmount(data.amount)}`}
                    >
                      {addComma(data.amount)}
                    </span>
                    {/* <span className={classes.nickname}>{data.nickname}</span>
                    <span className={classes.username}>@{data.username}</span> */}
                  </div>
                  <div
                    className="icon"
                    onClick={() => onShowEdithandler(data.id)}
                  >
                    <MoreVertIcon />
                  </div>
                  {showEdit === data.id && (
                    <ul ref={editRef} className={classes.edit}>
                      <li>
                        <button onClick={() => onModifyHandler(data)}>
                          수정
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onDeleteHandler(data.id)}>
                          삭제
                        </button>
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
              <form className={classes.form}>
                <input
                  className={classes.changeAmount}
                  type="text"
                  name="amount"
                  defaultValue={data.amount}
                  onChange={onChangeAmount}
                />
                <textarea
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
          </li>
        );
      })}
    </ul>
  );
};

PostList.propTypes = {
  datas: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModify: PropTypes.func.isRequired,
};

export default PostList;
