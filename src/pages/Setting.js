import React from "react";
import { Navigate } from "react-router-dom";
import DropBox from "../components/DropBox";
import PageContent from "../components/PageContent";
import classes from "../components/PageContent.module.css";
import SettingUserForm from "../components/SettingUserForm";
import Sidebar from "../components/Sidebar";
import { getAuthToken } from "../util/auth";

export const SETTING_TITLE = {
  userinfo: "회원 정보 변경",
  password: "비밀번호 변경",
};

const SettingPage = () => {
  const token = getAuthToken();
  return (
    <>
      {!token && <Navigate to="/"></Navigate>}
      {token && (
        <PageContent>
          <div className={`${classes.login} max-width`}>
            <Sidebar></Sidebar>
            <section className={classes.section}>
              <DropBox
                title={SETTING_TITLE.userinfo}
                children={<SettingUserForm title={SETTING_TITLE.userinfo} />}
              />
              <DropBox
                title={SETTING_TITLE.password}
                children={<SettingUserForm title={SETTING_TITLE.password} />}
              />
            </section>
          </div>
        </PageContent>
      )}
    </>
  );
};

export default SettingPage;
