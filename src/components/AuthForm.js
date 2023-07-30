import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DATA_TYPE, INPUT_TYPE } from "../constants/dataTypes";
import UserinfoContext from "../contexts/UserinfoContext";
import useCheck from "../hooks/useCheck";
import { checkExist, hashPassword, login, register } from "../util/auth";
import classes from "./AuthForm.module.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserinfoContext);
  const currentPath = window.location.pathname;
  const isLogin = currentPath === "/user/login";
  const [isActive, setIsActive] = useState(false);
  const initialState = { value: "", isValid: false, message: "" };

  const { field: email, setField: setEmail, checkValue: checkEmail } = useCheck(initialState);
  const {
    field: username,
    setField: setUsername,
    checkValue: checkUsername,
  } = useCheck(initialState);
  const {
    field: nickname,
    setField: setNickname,
    checkValue: checkNickname,
  } = useCheck(initialState);
  const {
    field: password,
    setField: setPassword,
    checkValue: checkPassword,
  } = useCheck(initialState);
  const {
    field: confirmPassword,
    setField: setConfirmPassword,
    checkValue: checkConfirmPassword,
  } = useCheck(initialState);

  const formRef = useRef();

  const onChangeHandler = (event) => {
    switch (event.target.name) {
      case DATA_TYPE.email:
        checkEmail(event);
        break;
      case DATA_TYPE.username:
        checkUsername(event);
        break;
      case DATA_TYPE.nickname:
        checkNickname(event);
        break;
      case DATA_TYPE.password:
        checkPassword(event);
        break;
      case DATA_TYPE.confirmPassword:
        checkConfirmPassword(event);
        break;
      default:
        break;
    }
  };

  const onBlurHandler = async (event) => {
    if ((isLogin || !email.isValid) && (isLogin || !username.isValid)) {
      return;
    }

    const value = event.target.value;
    const formData = { [event.target.name]: value };

    let response;
    switch (event.target.name) {
      case DATA_TYPE.email:
        response = await checkExist("/api/user/check_email", formData);

        setEmail({ ...email, message: response });
        break;
      case DATA_TYPE.username:
        response = await checkExist("/api/user/check_username", formData);

        setUsername({ ...username, message: response });
        break;
      default:
        break;
    }
  };

  const checkAll = () => {
    if (
      (isLogin && email.isValid && password.isValid) ||
      (!isLogin &&
        email.isValid &&
        password.isValid &&
        username.isValid &&
        nickname.isValid &&
        confirmPassword.isValid)
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    checkAll();
  }, [email, password, username, nickname, confirmPassword]);

  const onLoginHandler = async () => {
    if (!isActive) {
      return;
    }

    const formData = {
      email: email.value,
      password: hashPassword(password.value),
    };

    const response = await login("/api/user/login", formData);

    if (response !== 200) {
      setEmail({ ...email, message: response });
    } else {
      setUser({
        email: localStorage.getItem("email"),
        username: localStorage.getItem("username"),
        nickname: localStorage.getItem("nickname"),
      });

      navigate("/", { forceRefresh: true });
    }
  };

  const onRegisterHandler = async () => {
    if (!isActive) {
      return;
    }

    const formData = {
      email: email.value,
      username: username.value,
      nickname: nickname.value,
      password: hashPassword(password.value),
    };

    const response = await register("/api/user/create", formData);

    if (response === 204) {
      navigate("/user/create/complete", { forceRefresh: true });
    }
  };

  const resetValue = () => {
    formRef.current.reset();
    setEmail(initialState);
    setUsername(initialState);
    setNickname(initialState);
    setPassword(initialState);
    setConfirmPassword(initialState);
  };

  return (
    <>
      <form className={classes.form} ref={formRef} onSubmit={(event) => event.preventDefault()}>
        <h4 className={classes.title + " p-1"}>{isLogin ? "로그인" : "회원가입"}</h4>
        <div className={classes.input}>
          <label htmlFor={DATA_TYPE.email}>이메일</label>
          <input
            type={INPUT_TYPE.text}
            className={!isLogin && email.message && classes.invalid}
            id={DATA_TYPE.email}
            name={DATA_TYPE.email}
            autoComplete={isLogin ? "on" : "off"}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          />
          {!isLogin && email.message && <p className={classes.invalid}>{email.message}</p>}
        </div>
        {!isLogin && (
          <>
            <div className={classes.input}>
              <label htmlFor={DATA_TYPE.username}>사용자 아이디</label>
              <input
                type={INPUT_TYPE.text}
                className={username.message && classes.invalid}
                id={DATA_TYPE.username}
                name={DATA_TYPE.username}
                autoComplete={isLogin ? "on" : "off"}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
              {username.message && <p className={classes.invalid}>{username.message}</p>}
            </div>
            <div className={classes.input}>
              <label htmlFor={DATA_TYPE.nickname}>닉네임</label>
              <input
                type={INPUT_TYPE.text}
                className={nickname.message && classes.invalid}
                id={DATA_TYPE.nickname}
                name={DATA_TYPE.nickname}
                onChange={onChangeHandler}
              />
              {nickname.message && <p className={classes.invalid}>{nickname.message}</p>}
            </div>
          </>
        )}
        <div className={classes.input}>
          <label htmlFor={DATA_TYPE.password}>비밀번호</label>
          <input
            type={INPUT_TYPE.password}
            className={password.message && classes.invalid}
            id={DATA_TYPE.password}
            name={DATA_TYPE.password}
            onChange={onChangeHandler}
          />
          {!isLogin && password.message && <p className={classes.invalid}>{password.message}</p>}
        </div>
        {!isLogin && (
          <div className={classes.input}>
            <label htmlFor={DATA_TYPE.confirmPassword}>비밀번호 확인</label>
            <input
              type={INPUT_TYPE.password}
              className={confirmPassword.message && classes.invalid}
              id={DATA_TYPE.confirmPassword}
              name={DATA_TYPE.confirmPassword}
              onChange={onChangeHandler}
            />
            {confirmPassword.message && (
              <p className={classes.invalid}>{confirmPassword.message}</p>
            )}
          </div>
        )}
        <button
          type="submit"
          className={`${classes.button} ${!isActive ? "disabled" : ""} default`}
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
