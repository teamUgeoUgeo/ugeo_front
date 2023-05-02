import { useRef, useState } from 'react';
import { Form, Link, useActionData } from 'react-router-dom';
import classes from './AuthForm.module.css';

const LoginForm = () => {
  const currentPath = window.location.pathname;
  const isLogin = currentPath === '/auth/login/';

  const data = useActionData();
  const formRef = useRef();

  const isOnlyStrNum = function (value) {
    return /^[a-zA-Z0-9]+$/.test(value);
  };

  const isMoreThan4Length = function (value) {
    return value.length >= 4;
  };

  const islessThan8Length = function (value) {
    return value.length < 9;
  };

  const islessThan16Length = function (value) {
    return value.length < 17;
  };

  const checkUsername = function (value) {
    if (!isOnlyStrNum(value) && value) {
      setUsernameMessage('영문자와 숫자만 입력 가능합니다.');
      return false;
    }

    if (!isMoreThan4Length(value) && value) {
      setUsernameMessage('4자 이상의 id를 입력해주세요.');
      return false;
    }

    setUsernameMessage('');
    return true;
  };

  const checkNickname= function (value) {
    if (!islessThan8Length(value) && value) {
      setNicknameMessage('8자는 넘기지 마세요.');
      return false;
    }

    setNicknameMessage('');
    return true;
  };

  const checkPassword = function (value) {
    if (!islessThan16Length(value) && value) {
      setPasswordMessage('16자는 넘기지 마세요.');
      return false;
    }
    setPasswordMessage('');
    return true;
  };

  const checkPasswordConfirm = function (value) {
    if (password !== value  && value) {
      setPasswordConfirmMessage('입력한 비밀번호와 다릅니다.');
      return false;
    }

    setPasswordConfirmMessage('');
    return true;
  };

  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [usernameMessage, setUsernameMessage] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  const onUsernameHandler = (event) => {
    const value = event.target.value;
    setUsername(value);
    checkUsername(value);
  };

  const onNicknameHandler = (event) => {
    const value = event.target.value;
    setNickname(value);
    checkNickname(value);
  }

  const onPasswordHandler = (event) => {
    const value = event.target.value;
    setPassword(value);
    checkPassword(value);
  };

  const onConfirmPasswordHandler = (event) => {
    const value = event.target.value;
    setPasswordConfirm(value);
    checkPasswordConfirm(value);
  };

  const onSubmitHandler = (event) => {

    !checkUsername(username) ||
    !checkNickname(nickname) ||
    !checkPassword(password) ||
    !checkPasswordConfirm(passwordConfirm)
      ? event.preventDefault()
      : '';


    if (password !== passwordConfirm) {
      setPasswordConfirmMessage('입력한 비밀번호와 다릅니다.');
    }

    // if(!username) setUsernameMessage('username은 비어있으면 안됩니다.');
    // if(!nickname) setNicknameMessage('nickname은 비어있으면 안됩니다.');
    if(!password) setPasswordMessage('password은 비어있으면 안됩니다.');
    if(!passwordConfirm) setPasswordConfirmMessage('passwordConfirm은 비어있으면 안됩니다.');
  };

  const resetValue = () => {
    formRef.current.reset();

    setUsernameMessage('');
    setNicknameMessage('');
    setPasswordMessage('');
    setPasswordConfirmMessage('');
  
  };

  return (
    <>
      <Form
        className={classes.form}
        method="post"
        ref={formRef}
        onSubmit={onSubmitHandler}
      >
        <h4 className={classes.title + ' p-1'}>
          {isLogin ? 'Login' : 'Sign up'}
        </h4>

        <div className={classes.input}>
          <label htmlFor="username">username</label>
          <input
            type="username"
            id="username"
            name="username"
            onChange={onUsernameHandler}
          />
          <>
          {data && data['username'] && (
            <p className={classes.invalid}>{data['username']}</p>
          )}
          {usernameMessage && (
            <p className={classes.invalid}>{usernameMessage}</p>
          )}
          </>
        </div>
        {!isLogin && (
          <>
            <div className={classes.input}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
              {data  && data ['email'] && (
                <p className={classes.invalid}>{data['email']}</p>
              )}
            </div>

            <div className={classes.input}>
              <label htmlFor="nickname">nickname</label>
              <input type="nickname" id="nickname" name="nickname" onChange={onNicknameHandler}/>
              <>
              {data  && data ['nickname'] && (
                <p className={classes.invalid}>{data['nickname']}</p>
              )}
              {nicknameMessage && (
                <p className={classes.invalid}>{nicknameMessage}</p>
              )}
              </>
            </div>
          </>
        )}

        <div className={classes.input}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onPasswordHandler}
          />
          {passwordMessage && (
            <p className={classes.invalid}>{passwordMessage}</p>
          )}
        </div>
        {!isLogin && (
          <div className={classes.input}>
            <label htmlFor="password">confirm Password</label>
            <input
              type="password"
              id="password-conform"
              name="password"
              onChange={onConfirmPasswordHandler}
            />
            {passwordConfirmMessage && (
              <p className={classes.invalid}>{passwordConfirmMessage}</p>
            )}
          </div>
        )}
        <button className={classes.button}>
          {isLogin ? '로그인' : '회원가입'}
        </button>
        <Link
          className={classes.link}
          to={`/${isLogin ? 'register/' : 'auth/login/'}`}
          onClick={resetValue}
          type="button"
        >
          {isLogin ? '회원가입' : '로그인'}
        </Link>
      </Form>
    </>
  );
};

export default LoginForm;
