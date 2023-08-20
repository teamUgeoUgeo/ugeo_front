import React from "react";
import { Navigate } from "react-router-dom";
import DropBox from "../components/common/DropBox";
import PageContent from "../components/common/PageContent";
import classes from "../components/common/PageContent.module.css";
import Sidebar from "../components/common/Sidebar";
import SettingUserForm from "../components/updateUserInfo/SettingUserForm";
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
              <DropBox title={SETTING_TITLE.userinfo}>
                <SettingUserForm title={SETTING_TITLE.userinfo} />
              </DropBox>
              <DropBox title={SETTING_TITLE.password}>
                <SettingUserForm title={SETTING_TITLE.password} />
              </DropBox>
            </section>
          </div>
        </PageContent>
      )}
    </>
  );
};

export default SettingPage;
