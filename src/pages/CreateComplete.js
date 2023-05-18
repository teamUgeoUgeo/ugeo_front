import { Link } from 'react-router-dom';
import PageContent from '../components/PageContent';
import classes from '../components/PageContent.module.css'

const CreateCompletePage = () => {

  return (
      <PageContent>
          <>
            <h1>회원가입 완료!</h1>
            <p>회원이 되셨습니다.</p>
            <p>로그인을 해 주세요.</p>
            <Link className={classes.link + ' link'} to="/user/login">로그인하기</Link>
          </>
      </PageContent>
  );
};

export default CreateCompletePage;
