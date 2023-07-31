import React, { useContext } from "react";
import UserinfoContext from "../contexts/UserinfoContext";

import classes from "./UserInfo.module.css";

const UserInfo = () => {
  const { user } = useContext(UserinfoContext);

  return (
    <div className={classes.userinfo}>
      <span className={classes.profileimg}></span>
      <span className={classes.username}>{user.username}</span>
      <span className={classes.nickname}>@{user.nickname}</span>
      {/* <div className={classes.amount}>
        <span>이번달 쓴 금액 : </span>
        <span> 000,000</span>
      </div> */}
    </div>
  );
};

export default UserInfo;
