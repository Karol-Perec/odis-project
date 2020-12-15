import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StartPage from './components/startPage.component';
import SecuritySwitch from './components/securitySwitch.component';
import SecurityList from './components/securitySection/securityList.component';
import ListPage from './components/listPage/listPage.component';
import CommentsPage from './components/commentsPage/commentsPage.component';
import '../src/styles/index.css';
import './App.css';
import { getFromStorage } from './utils/storage';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [secure, setSecure] = useState(true);
  const [verified, setVerified] = useState(false);
  const odisUser = getFromStorage('odis-user');
  const odisSession = getFromStorage('odis-session');

  useEffect(() => {
    verify();
  }, []);

  if (secure) {
    return (
      <div className="App">
        <SecuritySwitch isSecure={secure} toggleSecure={toggleSecure} />
        <SecurityList />
        {logged(verified)}
      </div>
    );
  } else {
    return (
      <div className="App">
        <SecuritySwitch isSecure={secure} toggleSecure={toggleSecure} />
        <SecurityList />
        {logged(odisUser)}
      </div>
    );
  }

  function toggleSecure(e) {
    e.preventDefault();
    const html = document.querySelector('html');

    setSecure(prev => {
      if (prev) {
        html.style.background = '#f0f0f0'
      } else {
        html.style.background = 'white';
      }
      return !prev;
    });
  }

  function verify() {
    if (odisSession) {
      axios
        .post('/api/userSession/verify',
          odisSession
        )
        .then(res => {
          setVerified(res.data.success);
        })
        .catch(error => {
          console.log(error.response.data);
        });
    } else {
      setVerified(false);
    }
  }

  function logged(user) {
    if (user) {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/comments"
              component={() => <CommentsPage isSecure={secure} />}
            />
            <Route
              path="/list"
              component={() => <ListPage isSecure={secure} />}
            />
            <Route path="/" component={() => <StartPage isSecure={secure} />} />
          </Switch>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/comments"
              component={() => <CommentsPage isSecure={secure} />}
            />
            <Route
              path="/list"
              component={() => <StartPage isSecure={secure} />}
            />
            <Route path="/" component={() => <StartPage isSecure={secure} />} />
          </Switch>
        </BrowserRouter>
      );
    }
  }
}

export default App;
