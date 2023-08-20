import classes from "./UserProfile.module.css";

const UserProfile = ({ data }) => {
  return (
    <section className={classes.profile}>
      <p className={classes.nickname}>{data.nickname}</p>
      <p className={classes.username}>@{data.username}</p>
    </section>
  );
};

export default UserProfile;
