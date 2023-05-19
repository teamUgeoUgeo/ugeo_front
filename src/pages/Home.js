import { Link, useRouteLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageContent from '../components/PageContent';
import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';
import classes from '../components/PageContent.module.css';

const HomePage = () => {
  const token = useRouteLoaderData('root');
  const [data, setData] = useState(null);

  const fetchData = async (token) => {
      const response = await fetch('/api/article/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setData(data);
  }

  useEffect(() => {
    if (token) {
      fetchData(token);
    } else {
      setData(null)
    }
  }, [token]);

  if (!data) {
    return (
      <PageContent>
        <h1>메인화면</h1>
        <p>로그인 이전의 메인화면입니다.</p>
        <p>로그인을 해 주세요.</p>
        <Link className={classes.link + ' link'} to="/user/login">
          로그인하기
        </Link>
      </PageContent>
    );
  } else {
    return (
      <PageContent>
        <Sidebar></Sidebar>
        <PostList datas={data}></PostList>
      </PageContent>
    );
  }
};

export default HomePage;
