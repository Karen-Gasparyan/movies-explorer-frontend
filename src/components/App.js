import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './Header/Header';
import Movies from './Movies/Movies'
import MoviesCardList from './MoviesCardList/MoviesCardList';
import ErrorPage from './ErrorPage/ErrorPage';
import Preloader from './Preloader/Preloader';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Main from './Main/Main';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [visibleNavigation, setVisibleNavigation] = useState(false);

  const openNavigation = () => {
    setVisibleNavigation(true);
  }

  const closeNavigation = () => {
    setVisibleNavigation(false);
  }

  return (
    <div className="page">
      <Header 
          loggedIn={loggedIn}
          isOpen={visibleNavigation}
          openNavigation={openNavigation}
          closeNavigation={closeNavigation} />

      <Switch>

        {/* <Route exact path='/'>
          <Movies />
        </Route> */}
        <Route exact path='/'>
          <MoviesCardList />
        </Route>
        {/* <Route exact path='/'>
          <Main
            loggedIn={loggedIn}
            isOpen={visibleNavigation}
            openNavigation={openNavigation}
            closeNavigation={closeNavigation} />
        </Route> */}

        <Route path='/signup'>
          <Register />
        </Route>

        <Route path='/signin'>
          <Login />
        </Route>

        <Route path='/profile'>
          <Profile />
        </Route>

        <Route path="" component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
