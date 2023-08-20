import React from "react";
import PageContent from "../components/common/PageContent";
import classes from "../components/common/PageContent.module.css";

const ErrorPage = () => {
  return (
    <PageContent>
      <div className={classes.error}>
        <h2>에러!</h2>
        <p>페이지를 찾을 수 없어요</p>
      </div>
    </PageContent>
  );
};

export default ErrorPage;
