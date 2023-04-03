import { User } from "../../model/user";
import styles from "./User.module.css";

type Props = {
  user: User;
};

const UserComponent: React.FC<Props> = ({ user }: Props) => {
  return (
    <>
      <div className={styles.image_container}>
        <img src={user.avatar} alt="" />
      </div>
      <div className={styles.userDetail}>
          {`${user.first_name} ${user.last_name}`}
      </div>
    </>
  );
};

export default UserComponent;
