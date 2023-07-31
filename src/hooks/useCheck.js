import { useState } from "react";
import { DATA_TYPE } from "../constants/dataTypes";
import { isEmail, isEmpty, isLengthInRange } from "../util/validation";

const useCheck = (initialState) => {
  const [field, setField] = useState(initialState);

  const checkValue = (event) => {
    const value = event.target.value;

    if (isEmpty(value)) {
      setField({ value: value, isValid: false, message: "" });
      return;
    }

    switch (event.target.name) {
      case DATA_TYPE.email:
        if (!isEmail(value)) {
          setField({
            value: value,
            isValid: false,
            message: "정확한 이메일을 입력해 주세요.",
          });
          return;
        }

        setField({ value: value, isValid: true, message: "" });
        break;
      case DATA_TYPE.username:
        if (!isLengthInRange(value, 4, 16)) {
          setField({
            value: value,
            isValid: false,
            message: "4~16자 내로 입력해주세요.",
          });
          return;
        }

        setField({ value: value, isValid: true, message: "" });
        break;
      case DATA_TYPE.nickname:
        if (!isLengthInRange(value, 2, 8)) {
          setField({
            value: value,
            isValid: false,
            message: "1~8자 이내로 입력해 주세요",
          });
          return;
        }

        break;
      case DATA_TYPE.password:
        if (!isLengthInRange(value, 4, 16)) {
          setField({
            value: value,
            isValid: false,
            message: "4~16자 이내로 입력해주세요",
          });
          return;
        }

        break;
      case DATA_TYPE.confirmPassword:
        if (password.value !== value) {
          setField({
            value: value,
            isValid: false,
            message: "입력한 비밀번호와 다릅니다.",
          });
          return;
        }

        break;
      default:
        break;
    }

    setField({ value: value, isValid: true, message: "" });
    return true;
  };

  return { field, setField, checkValue };
};

export default useCheck;
