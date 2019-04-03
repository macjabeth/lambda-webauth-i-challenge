import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import Loader from 'react-loader-spinner';

const Users = ({ fetchUsers }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(({data}) => setUsers(data || []));
  }, []);

  return (
    <div>
      {users.length ? (
        <ul>
          {users.map(user => <li key={user.id}>{user.username}</li>)}
        </ul>
      ) : (
          <Loader
            type="CradleLoader"
            color="#00BFFF"
            height="100"
            width="100"
          />
        )
      }
    </div>
  );
}

export default connect(null, { fetchUsers })(Users);
