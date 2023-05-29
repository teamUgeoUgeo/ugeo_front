import React from 'react';
import PropTypes from 'prop-types';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './PageContent.module.css';

const PageContent = ({ children }) => {
  const token = useRouteLoaderData('root');

  return <main className={classes.content}>{children}</main>;
};

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContent;
