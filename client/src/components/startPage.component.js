import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import LoginForm from './authSection/loginForm.component';
import RegisterForm from './authSection/registerForm.component';
import { Link } from 'react-router-dom';
import { getFromStorage, clearStorage } from '../utils/storage';
import { useEffect } from 'react';

function StartPage(props) {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [odisUser, setOdisUser] = useState();
  const [odisSession, setOdisSession] = useState();

  useEffect(() => {
    setOdisUser(getFromStorage('odis-user'));
    setOdisSession(getFromStorage('odis-session'));
  }, []);

  return (
    <div className="start-container">
      <div className="button-group">
        <button>
          <Link to="/comments">Comments</Link>
        </button>
        <button>
          <Link
            className={
              window.location.pathname === '/exercises-list'
                ? 'nav-link selected-link'
                : 'nav-link'
            }
            to="/list"
          >
            Tasks
          </Link>
        </button>
        <button
          hidden={odisUser}
          className={login ? 'selected-button' : ''}
          onClick={loginToggle}
        >
          Login
        </button>
        <button
          hidden={odisUser}
          className={register ? 'selected-button' : ''}
          onClick={registerToggle}
        >
          Register
        </button>
        <button hidden={!odisUser} onClick={logout}>
          Logout
        </button>
      </div>
      <div hidden={!login}>
        <LoginForm
          onSubmit={loginToggle}
          setOdisUser={setOdisUser}
          setOdisSession={setOdisSession}
          isSecure={props.isSecure}
        />
      </div>
      <div hidden={!register}>
        <RegisterForm onSubmit={loginToggle} />
      </div>
    </div>
  );

  function loginToggle(e) {
    if (e) {
      e.preventDefault();
    }
    setLogin(!login);
    setRegister(false);
  }

  function registerToggle(e) {
    e.preventDefault();
    setRegister(!register);
    setLogin(false);
  }

  function logout(e) {
    e.preventDefault();
    axios
      .delete('/api/userSession/' + odisSession._id
      )
      .then((res) => {
        clearStorage('odis-user');
        clearStorage('odis-session');
        setOdisUser('');
        setOdisSession('');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default StartPage;
