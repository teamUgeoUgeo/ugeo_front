import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken, logout } from "../util/auth";
import classes from "./Header.module.css";

function Header() {
  const token = getAuthToken();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    logout();
    navigate("/", { forceRefresh: true });
  };

  return (
    <header className={classes.header}>
      <div className={`${classes.headerwrap} max-width space-between`}>
        <Link to="/">logo</Link>
        <nav>
          <ul>
            {!token && (
              <li>
                <Link to="/user/login">Login</Link>
              </li>
            )}
            {token && (
              <li>
                <button onClick={onLogoutHandler} className={classes.logout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
