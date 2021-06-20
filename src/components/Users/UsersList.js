import Card from "../UI/Card";
import styles from "./UsersList.module.css";

const UsersList = props => {
  return (
    <Card className={styles.users}>
      <ul>
        {props.users.map((user, index) => (
          <li key={index}>{user.name} - {user.email}</li>
        ))}
        {props.users.length === 0 && <p>No users added!</p>}
      </ul>
    </Card>
  )
}

export default UsersList;