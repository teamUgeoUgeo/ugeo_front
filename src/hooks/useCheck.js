import { useState } from "react";
import { DATA_TYPE, VALIDATION_MESSAGE } from "../constants/dataTypes";
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
            message: VALIDATION_MESSAGE.email,
          });
          return;
        }

        break;
      case DATA_TYPE.username:
        if (!isLengthInRange(value, 4, 16)) {
          setField({
            value: value,
            isValid: false,
            message: VALIDATION_MESSAGE.username,
          });
          return;
        }

        break;
      case DATA_TYPE.nickname:
        if (!isLengthInRange(value, 2, 8)) {
          setField({
            value: value,
            isValid: false,
            message: VALIDATION_MESSAGE.nickname,
          });
          return;
        }

        break;
      case DATA_TYPE.password:
        if (!isLengthInRange(value, 4, 16)) {
          setField({
            value: value,
            isValid: false,
            message: VALIDATION_MESSAGE.password,
          });
          return;
        }

        break;
      case DATA_TYPE.confirmPassword:
        if (password.value !== value) {
          setField({
            value: value,
            isValid: false,
            message: VALIDATION_MESSAGE.confirmPassword,
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
