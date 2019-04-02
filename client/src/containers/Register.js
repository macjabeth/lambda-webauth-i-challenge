import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useInput } from '../hooks';
import { authLogin, authSignup } from '../actions';

const Register = ({
  authLogin, authSignup,
  history: { push, replace },
  location: { pathname }
}) => {
  const [username, setUsername, updateUsername] = useInput();
  const [password, setPassword, updatePassword] = useInput();
  const signingUp = pathname === '/signup';

  const handleSubmit = async (e) => {
    e.preventDefault();

    await (signingUp ? authSignup : authLogin)({ username, password });

    setUsername('');
    setPassword('');
    push('/users');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" id="username"
        value={username} onChange={updateUsername} />
      <input type="password" name="password" id="password"
        value={password} onChange={updatePassword} />
      <input type="submit" value="Login" />
      <Link to="/signup">Register?</Link>
    </form>
  );
}

export default connect(null, {
  authLogin, authSignup
})(Register);
