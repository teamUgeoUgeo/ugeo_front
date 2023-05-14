import { Link, useRouteLoaderData } from 'react-router-dom';
import PageContent from '../components/PageContent';
import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';
import classes from '../components/PageContent.module.css'

const HomePage = () => {
  const token = useRouteLoaderData('root');

  return (
      <PageContent>
        {!token && (
          <>
            <h1>메인화면</h1>
            <p>로그인 이전의 메인화면입니다.</p>
            <p>로그인을 해 주세요.</p>
            <Link className={classes.link + ' link'} to="/auth/login/">로그인하기</Link>
          </>
        )}
        {token && ( 
          <>
            <Sidebar></Sidebar>
            <PostList></PostList>
          </>
        )}

      </PageContent>
  );
};

export default HomePage;
