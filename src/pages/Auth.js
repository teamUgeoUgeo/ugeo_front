import { json, redirect } from 'react-router-dom';
import PageContent from '../components/PageContent';

import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  return (
    <PageContent>
      <AuthForm />
    </PageContent>
  );
};

export default AuthPage;

export async function action({ request }) {

  const path = window.location.pathname
  const mode = path || '/auth/login/';

  if (mode !== '/auth/login/' && mode !== '/register/') {
    throw json({ message: '지원하지 않는 모드 입니다.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    username: data.get('username'),
    email: data.get('email'),
    nickname: data.get('nickname'),
    password: data.get('password'),
  };

  const response = await fetch('https://ugeo-back.sigae.kim' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: '사용자 인증 불가.' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);

  return redirect('/');

}
