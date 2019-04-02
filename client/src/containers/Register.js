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
  const signingUp = pathname === '/register';

  const handleSubmit = async (e) => {
    e.preventDefault();

    await (signingUp ? authSignup : authLogin)({ username, password });

    setUsername('');
    setPassword('');
    push(signingUp ? '/login' : '/users');
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <input type="text" name="username" id="username" placeholder="Username"
        value={username} onChange={updateUsername} />
      <input type="password" name="password" id="password" placeholder="Password"
        value={password} onChange={updatePassword} />
      <input type="submit" value={signingUp ? 'Register' : 'Login'} />
      {signingUp ? (
        <Link to="/login">Have an account?</Link>
      ) : (
        <Link to="/register">Register?</Link>
      )}
    </form>
  );
}

export default connect(null, {
  authLogin, authSignup
})(Register);
