import React, { useState, useRef, useEffect } from 'react';
import PostForm from './PostForm';
import classes from './PostList.module.css';
import pageClasses from './PageContent.module.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const PostList = (props) => {
  const [showEdit, setShowEdit] = useState([]);
  const editRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        setShowEdit([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editRef]);

  const onClickhandler = (index) => {
    setShowEdit((state) => {
      const copy = [...state];
      copy[index] = true;
      return copy;
    });
  };

  const decoAmount = (amount) => {
    if (amount < 1000){
      return `gray`;
    }
    if (amount < 5000){
      return `blue`;
    }
    if (amount < 10000){
      return `brown`;
    }
    if (amount < 50000){
      return `green`;
    }
    if (amount >= 50000){
      return `yellow`;
    }
  }

  const addComma = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <section className={`${pageClasses.section} ${classes.section}`}>
      <PostForm></PostForm>
      <ul className={classes.list}>
        {props.datas.map((data, index) => {
          return (
            <li key={data.id}>
              <div className={classes.top}>
                <span className={`${classes.amount} ${decoAmount(data.amount)}`}>{addComma(data.amount)}</span>
                <div
                  className={classes.more}
                  onClick={() => onClickhandler(index)}
                >
                  <MoreVertIcon />
                </div>
                {showEdit[index] && (
                  <ul ref={editRef} className={classes.edit}>
                    <li>
                      <button>수정</button>
                    </li>
                    <li>
                      <button>삭제</button>
                    </li>
                  </ul>
                )}
              </div>
              <div className={classes.content}>
                <p className={classes.detail}>{data.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PostList;
