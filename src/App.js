import React, { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';


function App() {
  const [usersList, setUsersList] = useState([]);

  const handleUserAdded = (userData) => {
    setUsersList((previousUserList) => {
      return [ ...previousUserList, userData];
    });
  } 

  return (
    <div>
      <AddUser onAddUser={handleUserAdded}/>
      <UsersList users={usersList}/>
    </div>
  );
}

export default App;
