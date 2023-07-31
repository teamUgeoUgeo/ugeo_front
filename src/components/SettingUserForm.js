import { DATA_TYPE } from "../constants/dataTypes";
import { SETTING_TITLE } from "../pages/Setting";
import classes from "./SettingUserForm.module.css";
import SettingUserInput from "./SettingUserInput";

const SettingUserForm = ({ title }) => {
  return (
    <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
      {title === SETTING_TITLE.userinfo && (
        <>
          <SettingUserInput title="이메일" dataType={DATA_TYPE.email} />
          <SettingUserInput title="사용자 아이디" dataType={DATA_TYPE.username} />
          <SettingUserInput title="닉네임" dataType={DATA_TYPE.nickname} />
        </>
      )}

      {title === SETTING_TITLE.password && (
        <>
          <SettingUserInput title="비밀번호" dataType={DATA_TYPE.password} />
          <SettingUserInput title="비밀번호 확인" dataType={DATA_TYPE.confirmPassword} />
        </>
      )}
    </form>
  );
};

export default SettingUserForm;
