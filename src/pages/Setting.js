import { Link, useRouteLoaderData } from 'react-router-dom';
import PageContent from '../components/PageContent';
import Sidebar from '../components/Sidebar';
import classes from '../components/PageContent.module.css'

const SettingPage = () => {
  const token = useRouteLoaderData('root');

  return (
      <PageContent>
        {token && (
            <>
                <Sidebar></Sidebar>
                <section class={classes.section}>
                    <nav>
                        <ul>
                            <li><Link to="/">탈퇴</Link></li>
                            <li><Link to="/">정보 변경</Link></li>
                        </ul>
                    </nav>
                </section>
            </>

        )}
      </PageContent>

  );
};

export default SettingPage;
