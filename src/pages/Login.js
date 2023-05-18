import { json, redirect } from 'react-router-dom';
import PageContent from '../components/PageContent';
import CryptoJS from 'crypto-js';

import AuthForm from '../components/AuthForm';

const LoginPage = () => {
  return (
    <PageContent>
      <AuthForm />
    </PageContent>
  );
};

export default LoginPage;

export async function action({ request }) {
const path = window.location.pathname;

if (path !== '/user/login') {
    throw json({ message: '지원하지 않는 모드 입니다.' }, { status: 422 });
  }

  function hashPassword(password){
    const hashedPassword = CryptoJS.SHA3(password).toString();
    return hashedPassword;
  }

  const data = await request.formData();
  const authData = {
    username: data.get('email'),
    password: data.get('password')
  };

  let header = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  let body = new URLSearchParams(authData)

  if (path !== '/user/login') {
    header["Content-Type"] = 'application/json'
    body = JSON.stringify(authData)

    authData.email = data.get('email')
    authData.nickname = data.get('nickname')
  }

  const response = await fetch('/api/user/login', {
    method: 'POST',
    headers: header,
    body: body,
  });

  if (response.status === 401 || response.status === 409) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: '사용자 인증 불가.' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.access_token;

  localStorage.setItem('token', token);

  return redirect('/');
}
