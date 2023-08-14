import MoreIcon from "@mui/icons-material/ExpandMoreRounded";
import { useContext, useEffect, useRef, useState } from "react";
import DropBoxContext from "../../contexts/DropBoxContext";
import classes from "./DropBox.module.css";

const DropBox = ({ title, children }) => {
  const contentRef = useRef(null);
  const [isOpen, setisOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const { isChanged, changeHandler } = useContext(DropBoxContext);

  const onOpendropboxHandler = () => {
    if (!isOpen) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setContentHeight("0px");
    }

    setisOpen(!isOpen);
  };

  const onChangeHandler = (event) => {
    changeHandler(event);
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
          onChange={onChangeHandler}
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
