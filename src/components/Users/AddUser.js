import { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import styles from "./AddUser.module.css"

const AddUser = props => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: ""
  });

  const [error, setError] = useState();

  const handleNameChanged = (event) => {
    setNewUser((previousState) => {
      return { ...previousState, name: event.target.value };
    });
  };

  const handleEmailChanged = (event) => {
    setNewUser((previousState) => {
      return { ...previousState, email: event.target.value };
    });
  };

  const handleError = () => {
    setError(null);
  };

  const handleUserAdded = (event) => {
    event.preventDefault();

    if (newUser.email.trim().length === 0 || newUser.name.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Enter a valid input."
      });
      return;
    }

    const userData = {
      name: newUser.name,
      email: newUser.email
    };

    props.onAddUser(userData);
    setNewUser({
      name: "",
      email: ""
    });
  }

  return (
    <div>
      { error && <ErrorModal title={error.title} message={error.message} onConfirm={handleError}/>}
      <Card className={styles.input}>
        <form onSubmit={handleUserAdded}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={newUser.name} onChange={handleNameChanged} />
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={newUser.email} onChange={handleEmailChanged} />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </div>
  )
};

export default AddUser;