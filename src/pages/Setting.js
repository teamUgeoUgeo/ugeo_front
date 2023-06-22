import React from "react";
import { Link } from "react-router-dom";
import PageContent from "../components/PageContent";
import classes from "../components/PageContent.module.css";
import Sidebar from "../components/Sidebar";

const SettingPage = () => {
  return (
    <PageContent>
      <div className={`${classes.login} max-width`}>
        <Sidebar></Sidebar>
        <section className={classes.section}>
          <nav>
            <ul>
              <li>
                <Link to="/">탈퇴</Link>
              </li>
              <li>
                <Link to="/">정보 변경</Link>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </PageContent>
  );
};

export default SettingPage;
