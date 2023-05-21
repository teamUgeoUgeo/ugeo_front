import { useRef, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import classes from "./AuthForm.module.css";

const LoginForm = () => {
  const currentPath = window.location.pathname;
  const isLogin = currentPath === "/user/login";

  const data = useActionData();
  const formRef = useRef();

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
    if (!isMoreThan4Length(value) && value) {
      setUsernameMessage("4자 이상의 id를 입력해주세요.");
      return false;
    }

    setUsernameMessage("");
    return true;
  };

  const checkNickname = function (value) {
    if (!islessThan8Length(value) && value) {
      setNicknameMessage("8자는 넘기지 마세요.");
      return false;
    }

    setNicknameMessage("");
    return true;
  };

  const checkPassword = function (value) {
    if (!islessThan16Length(value) && value) {
      setPasswordMessage("16자는 넘기지 마세요.");
      return false;
    }
    setPasswordMessage("");
    return true;
  };

  const checkPasswordConfirm = function (value) {
    if (password !== value && value) {
      setPasswordConfirmMessage("입력한 비밀번호와 다릅니다.");
      return false;
    }

    setPasswordConfirmMessage("");
    return true;
  };

  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [usernameMessage, setUsernameMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const onUsernameHandler = (event) => {
    const value = event.target.value;
    setUsername(value);
    checkUsername(value);
  };

  const onEmailHandler = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const onNicknameHandler = (event) => {
    const value = event.target.value;
    setNickname(value);
    checkNickname(value);
  };

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
    if (!isLogin) {
      !checkNickname(nickname) || !checkPasswordConfirm(passwordConfirm)
        ? event.preventDefault()
        : "";

      if (password !== passwordConfirm) {
        setPasswordConfirmMessage("입력한 비밀번호와 다릅니다.");
      }

      if (!email) setEmailMessage("email은 비어있으면 안됩니다.");
      if (!nickname) setNicknameMessage("nickname은 비어있으면 안됩니다.");
      if (!passwordConfirm)
        setPasswordConfirmMessage("passwordConfirm은 비어있으면 안됩니다.");

      !email || !nickname || !passwordConfirm ? event.preventDefault() : "";
    }

    !checkUsername(username) || !checkPassword(password)
      ? event.preventDefault()
      : "";

    if (!email) setEmailMessage("email은 비어있으면 안됩니다.");
    if (!password) setPasswordMessage("password은 비어있으면 안됩니다.");

    !email || !password ? event.preventDefault() : "";
  };

  const resetValue = () => {
    formRef.current.reset();

    setUsernameMessage("");
    setEmailMessage("");
    setNicknameMessage("");
    setPasswordMessage("");
    setPasswordConfirmMessage("");
  };

  return (
    <>
      <Form
        className={classes.form}
        method="post"
        ref={formRef}
        onSubmit={onSubmitHandler}
      >
        <h4 className={classes.title + " p-1"}>
          {isLogin ? "Login" : "Sign up"}
        </h4>

        <div className={classes.input}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onEmailHandler}
          />
          {emailMessage && <p className={classes.invalid}>{emailMessage}</p>}
          {data && data["detail"] && (
            <p className={classes.invalid}>{data["detail"]}</p>
          )}
        </div>

        {!isLogin && (
          <>
            <div className={classes.input}>
              <label htmlFor="username">username</label>
              <input
                type="username"
                id="username"
                name="username"
                onChange={onUsernameHandler}
              />
              {usernameMessage && (
                <p className={classes.invalid}>{usernameMessage}</p>
              )}
            </div>
            <div className={classes.input}>
              <label htmlFor="nickname">nickname</label>
              <input
                type="nickname"
                id="nickname"
                name="nickname"
                onChange={onNicknameHandler}
              />
              <>
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
        <button className={`${classes.button} default`}>
          {isLogin ? "로그인" : "회원가입"}
        </button>
        <Link
          className={classes.link}
          to={`/${isLogin ? "user/create" : "user/login"}`}
          onClick={resetValue}
          type="button"
        >
          {isLogin ? "회원가입" : "로그인"}
        </Link>
      </Form>
    </>
  );
};

export default LoginForm;
