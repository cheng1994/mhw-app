import React from 'react';

const UserList = ({ users }) => (
  <div>
    <h2>List of Usernames of Users</h2>
    {
      Object.keys(users).map(key =>
        <div key={key}>{users[key].username}</div>
      )
    }
  </div>
)

export default UserList;
