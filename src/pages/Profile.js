import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageContent from "../components/common/PageContent";
import classes from "../components/common/PageContent.module.css";
import Sidebar from "../components/common/Sidebar";
import PostList from "../components/post/PostList";
import UserProfile from "../components/user/UserProfile";
import { getAuthToken } from "../util/auth";
import { getPost } from "../util/crud";

const ProfilePage = () => {
  const token = getAuthToken() || null;
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPost(`/api/user/profile/${location.pathname.slice(14)}`, token);
      setData(response);
    };

    fetchData();
  }, [location]);

  return (
    <>
      <PageContent>
        <div className={`${classes.login} max-width`}>
          <Sidebar></Sidebar>
          <section className={classes.section}>
            <UserProfile data={data} />
            {token && data.articles && <PostList datas={data.articles} />}
          </section>
        </div>
      </PageContent>
    </>
  );
};

export default ProfilePage;
