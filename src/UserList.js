import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

function UserList({ onUserSelect }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = firebase.database().ref('users');
    usersRef.on('value', (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const usersList = Object.keys(usersData).map((key) => ({ id: key, ...usersData[key] }));
        setUsers(usersList);
      } else {
        setUsers([]);
      }
    });

    return () => {
      usersRef.off('value');
    };
  }, []);

  const handleUserSelect = (user) => {
    onUserSelect(user);
  };

  return (
    <div className="user-list">
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserSelect(user)}>
            {user.email}
            {user.uid}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
