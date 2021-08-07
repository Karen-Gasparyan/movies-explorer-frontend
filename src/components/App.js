import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import ErrorPage from './ErrorPage/ErrorPage';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Main from './Main/Main';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [visibleNavigation, setVisibleNavigation] = useState(false);

  const openNavigation = () => {
    setVisibleNavigation(true);
  }

  const closeNavigation = () => {
    setVisibleNavigation(false);
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path='/'>
          <Main
            loggedIn={loggedIn}
            isOpen={visibleNavigation}
            openNavigation={openNavigation}
            closeNavigation={closeNavigation} />
        </Route>

        <Route path='/signup'>
          <Register />
        </Route>

        <Route path='/signin'>
          <Login />
        </Route>

        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>

      <ErrorPage />
    </div>
  );
}

export default App;
