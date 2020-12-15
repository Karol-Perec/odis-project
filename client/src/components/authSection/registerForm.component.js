import React from 'react';
import axios from 'axios';
import { useState } from 'react';

function RegisterForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="register-container">
      <input
        value={username}
        type="text"
        placeholder="username"
        onChange={usernameChange}
      />
      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={passwordChange}
      />
      <input
        value={repeatPassword}
        type="password"
        placeholder="repeat password"
        onChange={repeatPasswordChange}
      />
      <div className="error">{message}</div>
      <button onClick={register}>SUMBIT</button>
    </div>
  );

  function passwordChange(e) {
    setPassword(e.target.value);
  }

  function repeatPasswordChange(e) {
    setRepeatPassword(e.target.value);
  }

  function usernameChange(e) {
    setUsername(e.target.value);
  }

  function register(e) {
    e.preventDefault();

    if (!username || !password || !repeatPassword) {
      setMessage('Fields cant be blank');
    } else if (password !== repeatPassword) {
      setMessage('Passwords have to be identically');
    } else {
      const user = {
        username: username,
        password: password
      };

      axios
        .post('/api/users/register', user)
        .then(res => {
          props.onSubmit();
          setUsername('');
          setPassword('');
        })
        .catch(error => {
          console.log(error);
          setMessage(error.response.data);
        });
    }
  }
}

export default RegisterForm;
