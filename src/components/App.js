import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import './App.css';

// constants
import { favoritesIcon } from '../utils/constants';

// components
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import ErrorPage from './ErrorPage/ErrorPage';
// import Preloader from './Preloader/Preloader';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Main from './Main/Main';

// for tests
import cards from '../MOVIES_DB';
import savedCards from '../SAVED_MOVIES_DB';

// contexts
import SpinnerContext from '../contexts/SpinnerContexts';

function App() {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [visibleNavigation, setVisibleNavigation] = useState(false);

  // cards
  const [initialCards, setInitialCards] = useState([])
  const [moreButtonActive, setMoreButtonActive] = useState(false)
  const [mobileCards, setMobileCards] = useState(5);
  const [tabletCards, setTabletCards] = useState(8);
  const [desctopCards, setDesctopCards] = useState(12);

  // user profile
  const [currentUserName, setCurrentUserName] = useState('Виталий');
  const [currentUserEmail, setCurrentUserEmail] = useState('pochta@yandex.ru');

  // auth validation +
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [userNameError, setUserNameError] = useState(false);
  const [userEmailError, setUserEmailError] = useState(true);
  const [userPasswordError, setUserPasswordError] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (userNameError || userEmailError || userPasswordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userNameError, userEmailError, userPasswordError])

  const focusHandler = (e) => {
    if (e.target.name === 'name') {
      userNameHandler(e);
    } else if (e.target.name === 'email') {
      userEmailHandler(e);
    } else if (e.target.name === 'password') {
      userPasswordHandler(e);
    }
  }

  const userNameHandler = (e) => {
    setUserName(e.target.value);

    if (e.target.value.length < 2) {
      setErrorMessage('Имя не может содержать менее 2 символов');
      setUserNameError(true);
      if (!e.target.value) {
        setErrorMessage('');
        setUserNameError(true);
      }
    } else {
      setErrorMessage('')
      setUserNameError(false);
    }
  }

  const userEmailHandler = (e) => {
    setUserEmail(e.target.value);

    const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegExp.test(String(e.target.value).toLowerCase())) {
      setErrorMessage('Некорректный email');
      setUserEmailError(true);
      if (!e.target.value) {
        setErrorMessage('');
        setUserEmailError(true);
      }
    } else {
      setErrorMessage('');
      setUserEmailError(false);
    }
  }

  const userPasswordHandler = (e) => {
    setUserPassword(e.target.value);

    if (e.target.value.length < 8) {
      setErrorMessage('Пароль должен содержать не менее 8 символов');
      setUserPasswordError(true);
      if (!e.target.value) {
        setErrorMessage('');
        setUserPasswordError(true);
      }
    } else {
      setErrorMessage('');
      setUserPasswordError(false);
    }
  }
  // auth validation -

  // cards +
  const loadMoreCards = () => {
    setMobileCards(mobileCards + 3);
    setTabletCards(tabletCards + 6);
    setDesctopCards(desctopCards + 9);
  }

  const changeCardValues = useCallback(() => {
    if (window.innerWidth >= 320 && window.innerWidth < 768) {
      setInitialCards(cards.slice(0, mobileCards));
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      setInitialCards(cards.slice(0, tabletCards));
    } else if (window.innerWidth >= 1280) {
      setInitialCards(cards.slice(0, desctopCards));
    }
  }, [mobileCards, tabletCards, desctopCards]);

  window.onresize = () => {
    changeCardValues();
  }

  useEffect(() => {
    changeCardValues();

    if (initialCards.length >= cards.length) {
      setMoreButtonActive(true);
    }

  }, [changeCardValues, initialCards.length]);
  // cards -


  // popups +

  // popups -


  // user profile +
  const signout = () => {
    setLoggedIn(false);
    history.push('/');
  }
  // user profile -


  const openNavigation = () => {
    setVisibleNavigation(true);
  }

  const closeNavigation = () => {
    setVisibleNavigation(false);
  }

  return (
    <SpinnerContext.Provider value={loading} >
      <div className="page">
        <Switch>
          <Route exact path='/'>
            <Main
              loggedIn={loggedIn}
              isOpen={visibleNavigation}
              openNavigation={openNavigation}
              closeNavigation={closeNavigation} />
          </Route>

          <Route path='/movies'>
            <Movies 
              cards={initialCards}
              moreButtonActive={moreButtonActive}
              loadMoreCards={loadMoreCards}
              favoritesIcon={favoritesIcon.add}
              
              loggedIn={loggedIn}
              isOpen={visibleNavigation}
              openNavigation={openNavigation}
              closeNavigation={closeNavigation}/>
          </Route>

          <Route path='/saved-movies'>
            <SavedMovies
              cards={savedCards}
              favoritesIcon={favoritesIcon.remove}
              
              loggedIn={loggedIn}
              isOpen={visibleNavigation}
              openNavigation={openNavigation}
              closeNavigation={closeNavigation}/>
          </Route>

          <Route path='/profile'>
            <Profile
              currentUserName={currentUserName}
              currentUserEmail={currentUserEmail}
              signout={signout}
            
              loggedIn={loggedIn}
              isOpen={visibleNavigation}
              openNavigation={openNavigation}
              closeNavigation={closeNavigation} />
          </Route>

          <Route path='/signup'>
            <Register
              userName={userName}
              userEmail={userEmail}
              userPassword={userPassword}
              errorMessage={errorMessage}
              formValid={formValid}
              focusHandler={focusHandler}
              userNameHandler={userNameHandler}
              userEmailHandler={userEmailHandler}
              userPasswordHandler={userPasswordHandler} />
          </Route>

          <Route path='/signin'>
            <Login
              userEmail={userEmail}
              userPassword={userPassword}
              errorMessage={errorMessage}
              formValid={formValid}
              focusHandler={focusHandler}
              userEmailHandler={userEmailHandler}
              userPasswordHandler={userPasswordHandler} />
          </Route>

          <Route path="" component={ErrorPage} />
        </Switch>
      </div>
    </SpinnerContext.Provider>
  );
}

export default App;
