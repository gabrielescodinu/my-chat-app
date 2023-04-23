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
    <div className="user-search p-8 bg-blue-500">
      <form onSubmit={handleSearch}>
        <input className='p-4 rounded-xl outline-none mr-8' type="text" placeholder="Search users by email" value={searchTerm} onChange={handleSearchTermChange} />
        <button className='bg-blue-200 hover:bg-blue-400 p-4 rounded-xl' type="submit">Search</button>
      </form>
      <ul className='mt-8 bg-white rounded-xl p-4'>
        {users.map((user) => (
          <li className='border-b p-4' key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;

