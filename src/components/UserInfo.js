import React from "react";
import classes from "./UserInfo.module.css";

const UserInfo = () => {
  return (
    <div className={classes.userinfo}>
      <span className={classes.profileimg}></span>
      <span className={classes.username}>Username</span>
      <span className={classes.nickname}>@nickname</span>
      <div className={classes.amount}>
        <span>이번달 쓴 금액 : </span>
        <span> 000,000</span>
      </div>
    </div>
  );
};

export default UserInfo;
