import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import './App.css';

// constants
import {
  emailRegExp,
  favoritesIcon
} from '../utils/constants';

// components
import Main from './Main/Main';
import Profile from './Profile/Profile';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Register from './Register/Register';
import Login from './Login/Login';

import ErrorPage from './ErrorPage/ErrorPage';
import MessagePopup from './MessagePopup/MessagePopup';
// import Preloader from './Preloader/Preloader';

// for test
import cards from '../utils/MOVIES_DB';
import savedCards from '../utils/SAVED_MOVIES_DB';

// contexts
import SpinnerContext from '../contexts/SpinnerContexts';

function App() {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [visibleNavigation, setVisibleNavigation] = useState(false);

  const [messagePopupText, setMessagePopupText] = useState('');
  const [messagePopup, setMessagePopup] = useState(false);
  const [messagePopupIcon, setMessagePopupIcon] = useState(true);

  // cards
  const [initialCards, setInitialCards] = useState([])
  const [moreButtonActive, setMoreButtonActive] = useState(false)
  const [mobileCards, setMobileCards] = useState(5);
  const [tabletCards, setTabletCards] = useState(8);
  const [desctopCards, setDesctopCards] = useState(12);


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

  // for test
  const testSpinner = () => {
    setLoading(false);
  }

  useEffect(() => {
    changeCardValues();
    // for test
    setTimeout(testSpinner, 2000)

    if (initialCards.length >= cards.length) {
      setMoreButtonActive(true);
    }

  }, [changeCardValues, initialCards.length]);

  const addMovieToFavoriteList = (e) => {
    setMessagePopupText('Добавлено в коллекцию')
    setMessagePopup(true);
    setTimeout(resetPopupMessageValue, 1000);
   }

  const removieMovieInFavoriteList = (e) => {
    setMessagePopupText('Удалено из коллекции')
    setMessagePopup(true);
    setTimeout(resetPopupMessageValue, 1000);
  }

  const resetPopupMessageValue = () => {
    setMessagePopup(false);
  }
  // cards -


  // user profile +
  const [currentUserName, setCurrentUserName] = useState('Виталий');
  const [currentUserEmail, setCurrentUserEmail] = useState('pochta@yandex.ru');

  const currentUserNameHandler = (e) => {
    setCurrentUserName(e.target.value);

    if (e.target.value.length < 2) {
      setFormValid(false);
      if (!e.target.value) {
        setFormValid(false);
      }
    } else {
      setFormValid(true);
    }
  }

  const currentUserEmailHandler = (e) => {
    setCurrentUserEmail(e.target.value);

    if (!emailRegExp.test(String(e.target.value).toLowerCase())) {
      setFormValid(false);
      if (!e.target.value) {
        setFormValid(false);
      }
    } else {
      setFormValid(true);
    }
  }
  // user profile -


  // auth validation +
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [userNameError, setUserNameError] = useState(true);
  const [userEmailError, setUserEmailError] = useState(true);
  const [userPasswordError, setUserPasswordError] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (userEmailError || userPasswordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userEmailError, userPasswordError])

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


  // user profile +
  const signout = () => {
    setLoggedIn(false);
    history.push('/');
  }
  // user profile -


  // helpers +
  const openNavigation = () => {
    setVisibleNavigation(true);
  }

  const closeNavigation = () => {
    setVisibleNavigation(false);
  }
  // helpers -


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
              closeNavigation={closeNavigation}
              addMovieToFavoriteList={addMovieToFavoriteList} />
          </Route>

          <Route path='/saved-movies'>
            <SavedMovies
              cards={savedCards}
              favoritesIcon={favoritesIcon.remove}
              loggedIn={loggedIn}
              isOpen={visibleNavigation}
              openNavigation={openNavigation}
              closeNavigation={closeNavigation}

              removieMovieInFavoriteList={removieMovieInFavoriteList} />
          </Route>

          <Route path='/profile'>
            <Profile
              currentUserName={currentUserName}
              currentUserEmail={currentUserEmail}
              currentUserNameHandler={currentUserNameHandler}
              currentUserEmailHandler={currentUserEmailHandler}
              formValid={formValid}
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
              userPasswordHandler={userPasswordHandler}
              userNameError={userNameError}
              userEmailError={userEmailError}
              userPasswordError={userPasswordError} />
          </Route>

          <Route path='/signin'>
            <Login
              userEmail={userEmail}
              userPassword={userPassword}
              errorMessage={errorMessage}
              formValid={formValid}
              focusHandler={focusHandler}
              userEmailHandler={userEmailHandler}
              userPasswordHandler={userPasswordHandler}
              userEmailError={userEmailError}
              userPasswordError={userPasswordError} />
          </Route>

          <Route path="" component={ErrorPage} />
        </Switch>

        <MessagePopup
          title={messagePopupText}
          isOpen={messagePopup}
          icon={messagePopupIcon} />
      </div>
    </SpinnerContext.Provider>
  );
}

export default App;
