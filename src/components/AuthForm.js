import CryptoJS from "crypto-js";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkExist, login, register } from "../util/auth";
import classes from "./AuthForm.module.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const currentPath = window.location.pathname;
  const isLogin = currentPath == "/user/login";
  const [active, setActive] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(false);

  const [emailMessage, setEmailMessage] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

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

  const isEmpty = function (value) {
    return value.length < 1;
  };

  const checkEmail = function (value) {
    if (isEmpty(value)) {
      setEmailMessage("");
      setIsValidEmail(false);
      return;
    }

    if (!isEmail(value)) {
      setEmailMessage("정확한 이메일을 입력해 주세요.");
      setIsValidEmail(false);
      return;
    }

    setEmailMessage("");
    setIsValidEmail(true);
  };

  const checkUsername = function (value) {
    if (isEmpty(value)) {
      setUsernameMessage("");
      setIsValidUsername(false);
      return;
    }

    if (!isMoreThan4Length(value)) {
      setUsernameMessage("4자 이상의 id를 입력해주세요.");
      setIsValidUsername(false);
      return;
    }

    setUsernameMessage("");
    setIsValidUsername(true);
  };

  const checkNickname = function (value) {
    if (isEmpty(value)) {
      setNicknameMessage("");
      setIsValidNickname(false);
      return;
    }

    if (!islessThan8Length(value)) {
      setNicknameMessage("8자 이하로 입력해 주세요.");
      setIsValidNickname(false);
      return;
    }

    setNicknameMessage("");
    setIsValidNickname(true);
  };

  const checkPassword = function (value) {
    if (isEmpty(value)) {
      setPasswordMessage("");
      setIsValidPassword(false);
      return;
    }

    if (!islessThan16Length(value)) {
      setPasswordMessage("16자 이하로 입력해 주세요.");
      setIsValidPassword(false);
      return;
    }
    setPasswordMessage("");
    setIsValidPassword(true);
  };

  const checkPasswordConfirm = function (value) {
    if (isEmpty(value)) {
      setPasswordConfirmMessage("");
      setIsValidPasswordConfirm(false);
      return;
    }

    if (password !== value) {
      setPasswordConfirmMessage("입력한 비밀번호와 다릅니다.");
      setIsValidPasswordConfirm(false);
      return;
    }

    setPasswordConfirmMessage("");
    setIsValidPasswordConfirm(true);
  };

  const onChangeUsernameHandler = (event) => {
    const value = event.target.value;
    setUsername(value);
    checkUsername(value);
  };

  const onChangeEmailHandler = (event) => {
    const value = event.target.value;
    setEmail(value);
    checkEmail(value);
  };

  const onChangeNicknameHandler = (event) => {
    const value = event.target.value;
    setNickname(value);
    checkNickname(value);
  };

  const onChangePasswordHandler = (event) => {
    const value = event.target.value;
    setPassword(value);
    checkPassword(value);
  };

  const onChangeConfirmPasswordHandler = (event) => {
    const value = event.target.value;
    setPasswordConfirm(value);
    checkPasswordConfirm(value);
  };

  const onBlurEmailHandler = async (event) => {
    if (isLogin || !isValidEmail) {
      return;
    }

    const formData = {};
    formData[`${event.target.name}`] = event.target.value;

    const response = await checkExist("/api/user/check_email", formData);
    setEmailMessage(response);
  };

  const onBlurUsernameHandler = async (event) => {
    if (isLogin || !isValidUsername) {
      return;
    }

    const formData = {};
    formData[`${event.target.name}`] = event.target.value;

    const response = await checkExist("/api/user/check_username", formData);
    setUsernameMessage(response);
  };

  const hashPassword = (password) => {
    const hashedPassword = CryptoJS.SHA3(password).toString();
    return hashedPassword;
  };

  const checkValue = () => {
    if (
      (isLogin && isValidEmail && isValidPassword) ||
      (!isLogin &&
        isValidEmail &&
        isValidPassword &&
        isValidUsername &&
        isValidNickname &&
        isValidPasswordConfirm)
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    checkValue();
  }, [email, password, username, nickname, passwordConfirm]);

  const onLoginHandler = async () => {
    if (!active) {
      return;
    }

    const formData = {
      email,
      password: hashPassword(password),
    };

    const response = await login("/api/user/login", formData);

    if (response !== 200) {
      setEmailMessage(response);
    } else {
      navigate("/", { forceRefresh: true });
    }
  };

  const onRegisterHandler = async () => {
    if (!active) {
      return;
    }

    const formData = {
      email,
      username,
      nickname,
      password: hashPassword(password),
      passwordConfirm: hashPassword(passwordConfirm),
    };

    await register("/api/user/create", formData);
    navigate("/create/complete", { forceRefresh: true });
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
      <form
        className={classes.form}
        method="post"
        ref={formRef}
        onSubmit={(event) => event.preventDefault()}
      >
        <h4 className={classes.title + " p-1"}>{isLogin ? "로그인" : "회원가입"}</h4>

        <div className={classes.input}>
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            className={emailMessage && classes.invalid}
            id="email"
            name="email"
            onChange={onChangeEmailHandler}
            onBlur={onBlurEmailHandler}
          />
          {emailMessage && <p className={classes.invalid}>{emailMessage}</p>}
        </div>

        {!isLogin && (
          <>
            <div className={classes.input}>
              <label htmlFor="username">사용자 아이디</label>
              <input
                type="username"
                className={usernameMessage && classes.invalid}
                id="username"
                name="username"
                onChange={onChangeUsernameHandler}
                onBlur={onBlurUsernameHandler}
              />
              {usernameMessage && <p className={classes.invalid}>{usernameMessage}</p>}
            </div>
            <div className={classes.input}>
              <label htmlFor="nickname">닉네임</label>
              <input
                type="nickname"
                className={nicknameMessage && classes.invalid}
                id="nickname"
                name="nickname"
                onChange={onChangeNicknameHandler}
              />
              {nicknameMessage && <p className={classes.invalid}>{nicknameMessage}</p>}
            </div>
          </>
        )}

        <div className={classes.input}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            className={passwordMessage && classes.invalid}
            id="password"
            name="password"
            onChange={onChangePasswordHandler}
          />
          {passwordMessage && <p className={classes.invalid}>{passwordMessage}</p>}
        </div>
        {!isLogin && (
          <div className={classes.input}>
            <label htmlFor="password">비밀번호 확인</label>
            <input
              type="password"
              className={passwordConfirmMessage && classes.invalid}
              id="password-conform"
              name="password"
              onChange={onChangeConfirmPasswordHandler}
            />
            {passwordConfirmMessage && <p className={classes.invalid}>{passwordConfirmMessage}</p>}
          </div>
        )}
        <button
          className={`${!active ? `${classes.block}` : ""} ${classes.button} default`}
          onClick={isLogin ? onLoginHandler : onRegisterHandler}
        >
          {isLogin ? "로그인" : "회원가입"}
        </button>

        <Link
          className={classes.link}
          to={`/${isLogin ? "user/create" : "user/login"}`}
          onClick={resetValue}
        >
          {isLogin ? "회원가입" : "로그인"}
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
