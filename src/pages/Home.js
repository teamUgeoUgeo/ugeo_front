import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageContent from "../components/common/PageContent";
import classes from "../components/common/PageContent.module.css";
import Sidebar from "../components/common/Sidebar";
import PostForm from "../components/post/PostForm";
import PostList from "../components/post/PostList";
import PostContext from "../contexts/PostContext";
import { getAuthToken } from "../util/auth";

const HomePage = () => {
  const token = getAuthToken();
  const { fetchData, data } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/", { forceRefresh: true });
      return;
    }
    fetchData();
  }, [token]);

  return (
    <PageContent>
      <>
        {!token && (
          <div className={`${classes.logout} max-width`}>
            <h1>UgeoUgeo</h1>
            <p>돈쓰기전에 생각했나요?</p>
            <p>인터넷 친구들과 같이 적는 가계부</p>
            <div className={classes.flex}>
              <Link className={classes.link + " link"} to="/user/login">
                로그인하기
              </Link>
            </div>
          </div>
        )}
        {token && (
          <div className={`${classes.login} max-width`}>
            <Sidebar />
            <section className={classes.section}>
              <PostForm />
              <PostList datas={data} />
            </section>
          </div>
        )}
      </>
    </PageContent>
  );
};

export default HomePage;
