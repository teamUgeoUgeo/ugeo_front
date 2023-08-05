import { useContext, useState } from "react";
import { DATA_TYPE, INPUT_TYPE } from "../constants/dataTypes";
import DropBoxContext from "../contexts/DropBoxContext";
import useCheck from "../hooks/useCheck";
import { getAuthToken, hashPassword } from "../util/auth";
import { updateUserInfo } from "../util/user";
import classes from "./SettingUserInput.module.css";

const UpdatePasswordInput = () => {
  const token = getAuthToken();
  const { setIsChanged } = useContext(DropBoxContext);
  const [isActive, setIsActive] = useState(false);
  const initialState = { isValid: false, message: "" };

  const {
    field: currentPassword,
    setField: setCurrentPassword,
    checkValue: checkCurrentPassword,
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

  const [displayButton, setDisplayButton] = useState("");
  const [isBlurAllowed, setIsBlurAllowed] = useState(true);

  const onChangeHandler = (event) => {
    switch (event.target.name) {
      case DATA_TYPE.currentPassword:
        checkCurrentPassword(event);
        break;
      case DATA_TYPE.password:
        checkPassword(event);
        break;
      case DATA_TYPE.confirmPassword:
        checkConfirmPassword(event);
        setIsActive(true);
        break;
      default:
        break;
    }

    if (event.target === document.activeElement && isActive) {
      setDisplayButton(event.target.name);
    } else {
      setDisplayButton("");
    }
  };

  const onBlurHandler = () => {
    if (!isBlurAllowed) {
      setIsBlurAllowed(true);
      return;
    }

    setDisplayButton("");
  };

  const onUpdateHandler = async () => {
    setIsBlurAllowed(false); //폼 제출이 발생하면 블러 이벤트가 막힙니다.

    let formData = {
      current_password: hashPassword(currentPassword.value),
      new_password: hashPassword(confirmPassword.value),
    };

    let submitRes = await updateUserInfo("/api/user/password", formData, token);

    if (!submitRes.ok) {
      setCurrentPassword({ ...currentPassword, message: submitRes });
      setDisplayButton("");
      setIsChanged(submitRes);
      return;
    }
    setDisplayButton("");
  };

  return (
    <>
      <div className={classes.input} onBlur={onBlurHandler}>
        <label htmlFor={DATA_TYPE.currentPassword}>현재 비밀번호</label>
        <div className={classes.field}>
          <input
            type={INPUT_TYPE.password}
            id={DATA_TYPE.currentPassword}
            name={DATA_TYPE.currentPassword}
            placeholder="••••"
            onChange={onChangeHandler}
          />
          {currentPassword.message && <p className={classes.invalid}>{currentPassword.message}</p>}
        </div>
      </div>
      <div className={classes.input} onBlur={onBlurHandler}>
        <label htmlFor={DATA_TYPE.password}>변경할 비밀번호</label>
        <div className={classes.field}>
          <input
            type={INPUT_TYPE.password}
            id={DATA_TYPE.password}
            name={DATA_TYPE.password}
            placeholder="••••"
            onChange={onChangeHandler}
          />
          {password.message && <p className={classes.invalid}>{password.message}</p>}
        </div>
      </div>
      <div className={classes.input} onBlur={onBlurHandler}>
        <label htmlFor={DATA_TYPE.confirmPassword}>변경할 비밀번호 확인</label>
        <div className={classes.field}>
          <input
            type={INPUT_TYPE.password}
            id={DATA_TYPE.confirmPassword}
            name={DATA_TYPE.confirmPassword}
            placeholder="••••"
            onChange={onChangeHandler}
          />
          <button
            type={INPUT_TYPE.submit}
            onMouseDown={onUpdateHandler}
            className={displayButton === DATA_TYPE.confirmPassword ? classes.display : ""}
          >
            변경
          </button>
          {confirmPassword.message && <p className={classes.invalid}>{confirmPassword.message}</p>}
        </div>
      </div>
    </>
  );
};

export default UpdatePasswordInput;
