import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useClose } from "../../hooks/useClose";
import { searchUserInfo } from "../../util/user";
import classes from "./UserSearchbar.module.css";

const UserSearchbar = () => {
  const [result, setResult] = useState([]);
  const searchRef = useRef(null);

  const onChangeHandler = async (event) => {
    const value = event.target.value;

    if (value.length > 0) {
      const response = await searchUserInfo(`/api/user/search/${value}`);
      setResult(response);
    } else {
      setResult([]);
    }
  };

  const onClickHandler = () => {
    setResult([]);
  };

  useClose(searchRef, setResult, []);

  return (
    <div className={classes.search}>
      <div className={classes.searchbar} ref={searchRef}>
        <div className={classes.search_input}>
          <SearchIcon className={classes.search_icon} />
          <input type="text" onChange={onChangeHandler} placeholder="사용자 검색" />
        </div>
        {result.length > 0 && (
          <ul className={classes.result}>
            {result.map((el) => (
              <li key={el.username}>
                <Link to={`/user/profile/${el.username}`} onClick={onClickHandler}>
                  <p className={classes.nickname}>{el.nickname}</p>
                  <p className={classes.username}>@{el.username}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserSearchbar;
