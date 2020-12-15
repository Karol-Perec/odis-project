import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { setInStorage } from '../../utils/storage';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="login-container">
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
      <div className="error">{message}</div>
      {props.isSecure ? (
        <button onClick={login}>Submit</button>
      ) : (
        <button onClick={badlogin}>Submit</button>
      )}
    </div>
  );

  function passwordChange(e) {
    setPassword(e.target.value);
  }

  function usernameChange(e) {
    setUsername(e.target.value);
  }

  function login(e) {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Fields cant be blank');
    } else {
      const user = {
        username: username,
        password: password,
      };

      axios
        .post('/api/users/login', user)
        .then((res) => {
          setUsername('');
          setPassword('');
          if (res.data.success) {
            setInStorage('odis-user', res.data.user);
            props.setOdisUser(res.data.user);

            axios
              .post('/api/userSession/add', {
                userid: res.data.user._id,
              })
              .then((res) => {
                setInStorage('odis-session', res.data);
                props.onSubmit();
                props.setOdisSession(res.data);
                window.location.reload();
              })
              .catch((error) => {
                console.log(error.response.data);
              });
          }
        })
        .catch((error) => {
          setMessage(error.response.data);
        });
    }
  }

  function badlogin(e) {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Fields cant be blank');
    } else {
      const user = {
        username: username,
        password: password,
      };

      axios
        .post('/api/users/badlogin', user)
        .then((res) => {
          setUsername('');
          setPassword('');
          if (res.data.success) {
            setInStorage('odis-user', res.data.user);
            props.setOdisUser(res.data.user);

            axios
              .post('/api/userSession/add', {
                userid: res.data.user._id,
              })
              .then((res) => {
                setInStorage('odis-session', res.data);
                props.onSubmit();
                props.setOdisSession(res.data);
              })
              .catch((error) => {
                console.log(error.response.data);
              });
          }
        })
        .catch((error) => {
          setMessage(error.response.data);
        });
    }
  }
}

export default LoginForm;
