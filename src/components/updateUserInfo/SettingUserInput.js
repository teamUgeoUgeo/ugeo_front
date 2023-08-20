import { useContext, useState } from "react";
import { DATA_TYPE, INPUT_TYPE } from "../../constants/dataTypes";
import DropBoxContext from "../../contexts/DropBoxContext";
import UserinfoContext from "../../contexts/UserinfoContext";
import useCheck from "../../hooks/useCheck";
import { checkExist, getAuthToken } from "../../util/auth";
import { updateUserInfo } from "../../util/user";
import { isSame } from "../../util/validation";
import classes from "./SettingUserInput.module.css";

const UpdateUserinfoInput = ({ title, dataType }) => {
  const token = getAuthToken();
  const { user, setUser } = useContext(UserinfoContext);
  const { setIsChanged } = useContext(DropBoxContext);
  const initialState = { isValid: false, message: "" };
  const initialValue = user[dataType] || "";
  const { field, setField, checkValue } = useCheck({
    ...initialState,
    value: initialValue,
  });
  const [displayButton, setDisplayButton] = useState("");
  const [isBlurAllowed, setIsBlurAllowed] = useState(true);

  const onChangeHandler = (event) => {
    const value = event.target.value;
    const checked = checkValue(event);

    if (isSame(value, initialValue)) {
      setField({
        value: value,
        isValid: false,
        message: "이전과는 다른 정보를 입력해주세요.",
      });
      setDisplayButton("");
      return;
    }

    if (event.target === document.activeElement && checked) {
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
    setField({ ...field, value: initialValue, message: "" });
  };

  const onUpdateHandler = async () => {
    setIsBlurAllowed(false); //폼 제출이 발생하면 블러 이벤트가 막힙니다.

    let formData = { [dataType]: field.value };

    let checkExistRes;
    switch (dataType) {
      case DATA_TYPE.email:
        checkExistRes = await checkExist("/api/user/check_email", formData);
        break;
      case DATA_TYPE.username:
        checkExistRes = await checkExist("/api/user/check_username", formData);
        break;
      default:
        break;
    }
    if (checkExistRes) {
      setField({ ...field, value: initialValue, message: checkExistRes });
      setIsChanged(checkExistRes);
      setDisplayButton("");
      return;
    }

    const submitRes = await updateUserInfo("/api/user/info", formData, token);

    if (!submitRes.ok) {
      setField({ ...field, value: initialValue, message: submitRes });
      setIsChanged(submitRes);
      setDisplayButton("");
      return;
    }
    setDisplayButton("");
    setUser({ ...user, ...formData });
  };

  return (
    <div className={classes.input} onBlur={onBlurHandler}>
      <label htmlFor={dataType}>{title}</label>
      <div className={classes.field}>
        <input
          type={INPUT_TYPE.text}
          id={dataType}
          name={dataType}
          value={field.value}
          onChange={onChangeHandler}
        />
        <button
          type={INPUT_TYPE.submit}
          onMouseDown={onUpdateHandler}
          className={displayButton === dataType ? classes.display : null}
        >
          변경
        </button>
        {field.message && <p className={classes.invalid}>{field.message}</p>}
      </div>
    </div>
  );
};

export default UpdateUserinfoInput;
