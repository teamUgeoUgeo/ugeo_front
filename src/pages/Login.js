import React from "react";
import AuthForm from "../components/AuthForm";
import PageContent from "../components/PageContent";
import classes from "../components/PageContent.module.css";

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
