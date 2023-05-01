import { useRouteLoaderData } from 'react-router-dom';
import classes from './PageContent.module.css';

const PageContent = ({ title, children }) => {
  const token = useRouteLoaderData('root');

  return (
    <main className={token ? classes.login : classes.logout}>
      <div className={'max-width' + (token ? '' : ' flex-center')}>
        <section className={classes.content}>
          {children}
        </section>
      </div>
    </main>
  );
};

export default PageContent;
