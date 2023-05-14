import { useRouteLoaderData } from 'react-router-dom';
import classes from './PageContent.module.css';

const PageContent = ({ children }) => {
  const token = useRouteLoaderData('root');

  return (
    <main className={token ? classes.login : classes.logout}>
        <div className={`${classes.content} max-width`}  >
          {children}
        </div>
    </main>
  );
};

export default PageContent;
