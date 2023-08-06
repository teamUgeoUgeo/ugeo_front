export const DATA_TYPE = Object.freeze({
  email: "email",
  username: "username",
  nickname: "nickname",
  password: "password",
  currentPassword: "current-password",
  confirmPassword: "confirm-password",
});

export const INPUT_TYPE = Object.freeze({
  text: "text",
  password: "password",
  button: "button",
  submit: "submit",
});

export const ERROR_MESSAGE = Object.freeze({
  existEmail: "사용중인 이메일 입니다.",
  existUsername: "사용중인 사용자 아이디 입니다.",
  invalidLogin: "아이디, 또는 비밀번호가 일치하지 않습니다",
  invalidPassword: "비밀번호가 일치하지 않습니다.",
  notAuthorized: "접근 권한이 없습니다.",
});

export const VALIDATION_MESSAGE = Object.freeze({
  email: "정확한 이메일을 입력해 주세요.",
  username: "4~16자 내로 입력해주세요.",
  nickname: "1~8자 이내로 입력해 주세요",
  password: "4~16자 내로 입력해주세요.",
  confirmPassword: "입력한 비밀번호와 다릅니다.",
});
