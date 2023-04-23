import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    const usersRef = firebase.database().ref('users');
    usersRef.orderByChild('email').startAt(searchTerm).endAt(searchTerm + '\uf8ff').on('value', (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const usersList = Object.keys(usersData).map((key) => ({ id: key, ...usersData[key] }));
        setUsers(usersList);
      } else {
        setUsers([]);
      }
    });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="user-search">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search users by email" value={searchTerm} onChange={handleSearchTermChange} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;

