import { useRef, useState } from 'react';
import { Form, Link, useActionData } from 'react-router-dom';
import classes from './AuthForm.module.css';

const LoginForm = () => {
  const data = useActionData();

  const currentPath = window.location.pathname;
  const isLogin = currentPath === '/auth/login/';

  const formRef = useRef();
  const PasswordConfirmRef = useRef();
  const PasswordRef = useRef();

  const [isSamePassword, setIsSamePassword] = useState(true);

  const onConfirmPasswordHandler = (event) => {
    const passwordConfirmValue = event.currentTarget.value;
    const passwordValue = PasswordRef.current.value;

    passwordValue.trim() !== '' &&
    passwordConfirmValue.trim() !== '' &&
    passwordValue !== passwordConfirmValue
      ? setIsSamePassword(false)
      : setIsSamePassword(true);
  };

  const onSubmitHandler = (event) => {
    const passwordConfirmValue = PasswordConfirmRef.current.value;
    const passwordValue = PasswordRef.current.value;

    passwordValue.trim() === '' || passwordValue !== passwordConfirmValue
      ? event.preventDefault()
      : '';
  };

  const resetValue = () => {
    formRef.current.reset();
    setIsSamePassword(true);
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
          <input type="username" id="username" name="username" />
          {data && data['username'] && (
            <p className={classes.invalid}>{data['username']}</p>
          )}
        </div>
        {!isLogin && (
          <>
            <div className={classes.input}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
              {data && data['email'] && (
                <p className={classes.invalid}>{data['email']}</p>
              )}
            </div>

            <div className={classes.input}>
              <label htmlFor="nickname">nickname</label>
              <input
                type="nickname"
                id="nickname"
                name="nickname"
                maxLength="8"
                pattern=".{0,8}"
              />
              {data && data['nickname'] && (
                <p className={classes.invalid}>{data['nickname']}</p>
              )}
            </div>
          </>
        )}

        <div className={classes.input}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={PasswordRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.input}>
            <label htmlFor="password">confirm Password</label>
            <input
              className={!isSamePassword ? classes.invalid : ''}
              type="password"
              id="password-conform"
              name="password"
              ref={PasswordConfirmRef}
              onChange={onConfirmPasswordHandler}
            />
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
