export const isEmail = (value) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value);
};

export const isLengthInRange = (value, min, max) => {
  const length = value.length;
  return length >= min && length <= max;
};

export const isEmpty = (value) => {
  return value.length < 1;
};

export const isSame = (value, prevValue) => {
  return value === prevValue;
};
