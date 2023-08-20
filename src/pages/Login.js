import React from "react";
import AuthForm from "../components/auth/AuthForm";
import PageContent from "../components/common/PageContent";
import classes from "../components/common/PageContent.module.css";

const LoginPage = () => {
  return (
    <PageContent>
      <div className={`${classes.logout} max-width`}>
        <AuthForm />
      </div>
    </PageContent>
  );
};

export default LoginPage;
