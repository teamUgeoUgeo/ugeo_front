import React from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import PageContent from "../components/PageContent";
import Sidebar from "../components/Sidebar";
import classes from "../components/PageContent.module.css";

const SettingPage = () => {
  const token = useRouteLoaderData("root");

  return (
    <PageContent>
      {token && (
        <div clessName={`${classes.login} max-width`}>
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
      )}
    </PageContent>
  );
};

export default SettingPage;
