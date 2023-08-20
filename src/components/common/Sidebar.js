import React from "react";
import { Link } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import UserInfo from "../user/UserInfo";
import classes from "./Sidebar.module.css";

const Sidebar = () => {
  const token = getAuthToken();

  return (
    <aside className={classes.sidemenu}>
      {token && <UserInfo />}
      <nav>
        <ul>
          <li>
            <Link to="/user/setting">설정</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
