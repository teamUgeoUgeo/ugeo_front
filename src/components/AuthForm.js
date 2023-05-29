import React from "react";
import { useRef, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import classes from "./AuthForm.module.css";

const LoginForm = () => {
  const currentPath = window.location.pathname;
  const isLogin = currentPath == "/user/login";

  const data = useActionData();
  const formRef = useRef();

  const isEmail = function (value) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(value);
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

  const checkEmail = function (value) {
    if (!isEmail(value) && value) {
      setEmailMessage("정확한 이메일을 입력해 주세요.");
      return false;
    }

    setEmailMessage("");
    return true;
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
      setNicknameMessage("8자 이하로 입력해 주세요.");
      return false;
    }

    setNicknameMessage("");
    return true;
  };

  const checkPassword = function (value) {
    if (!islessThan16Length(value) && value) {
      setPasswordMessage("16자 이하로 입력해 주세요.");
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
    checkEmail(value);
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
      !checkUsername(username) ||
      !checkNickname(nickname) ||
      !checkPasswordConfirm(passwordConfirm)
        ? event.preventDefault()
        : "";

      if (password !== passwordConfirm) {
        setPasswordConfirmMessage("입력한 비밀번호와 다릅니다.");
      }

      if (!username) setUsernameMessage("사용자 아이디는 비어있으면 안됩니다.");
      if (!nickname) setNicknameMessage("닉네임은 비어있으면 안됩니다.");
      if (!passwordConfirm)
        setPasswordConfirmMessage("비밀번호 확인은 비어있으면 안됩니다.");

      !username || !nickname || !passwordConfirm ? event.preventDefault() : "";
    }
    !checkEmail(email) || !checkPassword(password)
      ? event.preventDefault()
      : "";

    if (!email) setEmailMessage("이메일은 비어있으면 안됩니다.");
    if (!password) setPasswordMessage("비밀번호는 비어있으면 안됩니다.");

    !email || !password ? event.preventDefault() : "";
  };

  const resetValue = () => {
    formRef.current.reset();

    setUsername("");
    setEmail("");
    setNickname("");
    setPassword("");
    setPasswordConfirm("");

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
          {isLogin ? "로그인" : "회원가입"}
        </h4>

        <div className={classes.input}>
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={onEmailHandler}
          />
          {data && isLogin && (
            <p className={classes.invalid}>
              {typeof data.detail === "string"
                ? data.detail
                : Array.isArray(data.detail) && data.detail.length >= 1
                ? data.detail[0].msg
                : ""}
            </p>
          )}
          {emailMessage && <p className={classes.invalid}>{emailMessage}</p>}
        </div>

        {!isLogin && (
          <>
            <div className={classes.input}>
              <label htmlFor="username">사용자 아이디</label>
              <input
                type="username"
                id="username"
                name="username"
                onChange={onUsernameHandler}
              />
              {usernameMessage && (
                <p className={classes.invalid}>{usernameMessage}</p>
              )}
              {data && (
                <p className={classes.invalid}>
                  {typeof data.detail === "string"
                    ? data.detail
                    : Array.isArray(data.detail) && data.detail.length >= 1
                    ? data.detail[0].msg
                    : ""}
                </p>
              )}
            </div>
            <div className={classes.input}>
              <label htmlFor="nickname">닉네임</label>
              <input
                type="nickname"
                id="nickname"
                name="nickname"
                onChange={onNicknameHandler}
              />
              {nicknameMessage && (
                <p className={classes.invalid}>{nicknameMessage}</p>
              )}
            </div>
          </>
        )}

        <div className={classes.input}>
          <label htmlFor="password">비밀번호</label>
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
            <label htmlFor="password">비밀번호 확인</label>
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
