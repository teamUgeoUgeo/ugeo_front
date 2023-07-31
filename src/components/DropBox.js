import MoreIcon from "@mui/icons-material/ExpandMoreRounded";
import React, { useEffect, useRef, useState } from "react";
import classes from "./DropBox.module.css";

const DropBox = ({ title, children }) => {
  const contentRef = useRef(null);
  const [isOpen, setisOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(null);
  const [contentHeight, setContentHeight] = useState(0);

  const onOpendropboxHandler = () => {
    if (!isOpen) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setContentHeight("0px");
    }

    setisOpen(!isOpen);
  };

  const onChangeHeightHandler = (event) => {
    setIsChanged(event.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [isChanged]);

  return (
    <>
      <section className={`${classes.dropdown_box} ${isOpen ? classes.active : ""}`}>
        <div className={classes.dropdown} onClick={onOpendropboxHandler}>
          <h4 className={classes.title}>{title}</h4>
          <MoreIcon />
        </div>
        <div
          onChange={onChangeHeightHandler}
          ref={contentRef}
          style={{ maxHeight: `${contentHeight}` }}
          className={`${classes.dropdown_content} `}
        >
          {children}
        </div>
      </section>
    </>
  );
};
export default DropBox;
