import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { searchUserInfo } from "../../util/user";
import classes from "./UserSearchbar.module.css";

const UserSearchbar = () => {
  const [result, setResult] = useState([]);

  const onChangeHandler = async (event) => {
    const value = event.target.value;

    if (value.length > 0) {
      const response = await searchUserInfo(`/api/user/search/${value}`);
      setResult(response);
    } else {
      setResult([]);
    }
  };

  const onBlurHandler = () => {
    setResult([]);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchbar}>
        <div className={classes.search_input}>
          <SearchIcon className={classes.search_icon} />
          <input
            type="text"
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            placeholder="사용자 검색"
          />
        </div>
        {result.length > 0 && (
          <ul className={classes.result}>
            {result.map((el) => (
              <li key={el.username}>
                <p className={classes.nickname}>{el.nickname}</p>
                <p className={classes.username}>@{el.username}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserSearchbar;
