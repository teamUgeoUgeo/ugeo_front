import { json, redirect } from 'react-router-dom';
import PageContent from '../components/PageContent';

import AuthForm from '../components/AuthForm';

const CreatePage = () => {
  return (
    <PageContent>
      <AuthForm />
    </PageContent>
  );
};

export default CreatePage;

export async function action({ request }) {
  const path = window.location.pathname;

  if (path !== '/user/create') {
    throw json({ message: '지원하지 않는 모드 입니다.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    username: data.get('email'),
    nickname: data.get('nickname'),
    password: data.get('password'),
  };

  const response = await fetch('/api/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 401 || response.status === 409) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: '사용자 인증 불가.' }, { status: 500 });
  }

  return redirect('/user/create/complete');

}
