import React from "react";
import PropTypes from "prop-types";
import classes from "./PageContent.module.css";

const PageContent = ({ children }) => {
  return <main className={classes.content}>{children}</main>;
};

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContent;
