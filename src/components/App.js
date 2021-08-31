import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import './App.css';

// constants
import {
  emailRegExp,
  favoritesIcon,

  successful,
  successfulRegistration,
  successfulLogin,

  removedFromCollection,
  addedToCollection
} from '../utils/constants';

// components
import ProtectedRoute from './ProtectedRoute';
import Main from './Main/Main';
import Profile from './Profile/Profile';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Register from './Register/Register';
import Login from './Login/Login';

import ErrorPage from './ErrorPage/ErrorPage';
import MessagePopup from './MessagePopup/MessagePopup';

// contexts
import SpinnerContext from '../contexts/SpinnerContexts';
import CurrentUserContext from '../contexts/CurrentUserContext';

import auth from '../utils/Auth';
import moviesApi from '../utils/MoviesApi';
import mainApi from '../utils/MainApi';

function App() {
  const history = useHistory();
  // general
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [visibleNavigation, setVisibleNavigation] = useState(false);
  // popup's
  const [messagePopup, setMessagePopup] = useState(false);
  const [messagePopupIcon, setMessagePopupIcon] = useState(true);
  const [messagePopupText, setMessagePopupText] = useState('');
  // movies
  const [allMovies, setAllMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [noSearchMovieResult, setNoSearchMovieResult] = useState(false);
  const [noSearchSavedMovieResult, setNoSearchSavedMovieResult] = useState(false);
  const [movieSearchFormValue, setMovieSearchFormValue] = useState('');
  const [savedMovieSearchFormValue, setSavedMovieSearchFormValue] = useState('');
  const [emptyListValue, setEmptyListValue] = useState(null);
  const [moreButtonActive, setMoreButtonActive] = useState(false);
  const [mobileCards, setMobileCards] = useState(5);
  const [tabletCards, setTabletCards] = useState(8);
  const [desctopCards, setDesctopCards] = useState(12);
  // user profile
  const [currentUser, setCurrentUser ] = useState({});
  const [userProfileInputActive, setUserProfileInputActive] = useState(false);
  // auth forms
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // auth validation
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNameError, setUserNameError] = useState(true);
  const [userEmailError, setUserEmailError] = useState(true);
  const [userPasswordError, setUserPasswordError] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValid, setFormValid] = useState(true);

  // token verification
  useEffect(()=> {
    if(localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');
      
      auth.getUserData(token)
        .then(({data}) => {
          setCurrentUser(data);
          setUserName(data.name);
          setUserEmail(data.email);
        })
        .catch(error => console.log(error));
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  // get all movies
  useEffect(() => {
    moviesApi.getAllMovies()
    .then(data => {
      if(data) {
        setAllMovies(data);
        setTimeout(showSpinner, 1000);
      }
    })
    .catch(error => console.log(error));
  }, [])

  // get favorite movies
  const getFavoriteMovies = useCallback(() => {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');

      mainApi.getSavedMovies(token)
        .then(({data}) => {
          if(data) {
            setFavoriteMovies(data);
            setTimeout(showSpinner, 1000);
          } else {
            setEmptyListValue(true);
          }
        })
        .catch(error => console.log(error));
    } else {
      setLoggedIn(false);
    };
  }, []);

  useEffect(() => {
    getFavoriteMovies();
  }, [loggedIn, getFavoriteMovies])

  // auth validation
  useEffect(() => {
    if (userEmailError || userPasswordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userEmailError, userPasswordError])

  /* movies */
  window.onresize = () => {
    setTimeout(changeCardValues, 2000);
  }

  const loadMoreCards = () => {
    if (initialMovies.length >= allMovies.length) {
      setMoreButtonActive(true);
    }
    setMobileCards(mobileCards + 2);
    setTabletCards(tabletCards + 2);
    setDesctopCards(desctopCards + 3);
  }

  const changeCardValues = useCallback(() => {
    if (window.innerWidth >= 320 && window.innerWidth < 768) {
      setInitialMovies(allMovies.slice(0, mobileCards));
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      setInitialMovies(allMovies.slice(0, tabletCards));
    } else if (window.innerWidth >= 1280) {
      setInitialMovies(allMovies.slice(0, desctopCards));
    }

    setMoreButtonActive(false);
  }, [allMovies, mobileCards, tabletCards, desctopCards]);

  useEffect(() => {
    changeCardValues();
  }, [changeCardValues])

  const addMovieToFavoriteList = (selectedMovieValues) => {
    const { id } = selectedMovieValues;
    const token = localStorage.getItem('jwt');

    if(favoriteMovies) {
      const favoriteMoviesIds = favoriteMovies.map(movie => movie.movieId);
      const movieAdded = favoriteMoviesIds.some(movieId => movieId === id);

      if(!movieAdded) {
        mainApi.setSavedMovies(token, selectedMovieValues)
          .then(({data}) => {
            setEmptyListValue(false);
            setFavoriteMovies([data, ...favoriteMovies])
            showPopupMessage(addedToCollection, true);
        })
        .catch(error => {
          showPopupMessage(error, false)
        });
      } else {
        const _id = favoriteMovies.filter(movie => {
          if(movie.movieId === id) {
            return movie._id;
          } else {
            return null;
          }
        });

        removieMovieInFavoriteList(_id[0]);
      }
    } else {
      mainApi.setSavedMovies(token, selectedMovieValues)
        .then(({data}) => {
          setFavoriteMovies([data])
          showPopupMessage(addedToCollection, true);
        })
        .catch(error => {
          showPopupMessage(error, false)
        });
    }
  }

  const removieMovieInFavoriteList = (selectedMovieValues) => {
    const { _id } = selectedMovieValues;

    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');

      mainApi.deleteFavoriteMovie(token, _id)
      .then(({data}) => {
        if(data) {
          setFavoriteMovies(allMovies => allMovies.filter(movie => movie._id !== _id));
          showPopupMessage(removedFromCollection, true)
          if(favoriteMovies.length < 2) {
            setEmptyListValue(true);
          }
        }
      })
      .catch(error => {
        showPopupMessage(error, false)
      });
    }
  }

  const getTimeFormat = (mins) => {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return (hours + 'ч ') + (minutes + 'м');
  };
  /* /movies */

  /* navigation */
  const openNavigation = () => {
    setVisibleNavigation(true);
  }

  const closeNavigation = () => {
    setVisibleNavigation(false);
  }
  /* /navigation */

  /* user profile */
  const currentUserNameHandler = (e) => {
    setUserName(e.target.value);

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
    setUserEmail(e.target.value);

    if (!emailRegExp.test(String(e.target.value).toLowerCase())) {
      setFormValid(false);
      if (!e.target.value) {
        setFormValid(false);
      }
    } else {
      setFormValid(true);
    }
  }

  function handleUpdateUserProfile(e) {
    e.preventDefault();

    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');

      mainApi.setUserInfo(token, userName, userEmail)
      .then(({data:{name, email}}) => {
        setCurrentUser({name, email});
        setUserProfileInputActive(false);
        showPopupMessage(successful, true, 500)
      })
      .catch(error => {
        showPopupMessage(error, false)
      });
    }
  };

  const allowUpdatingUserData = () => {
    setUserProfileInputActive(true);
  }

  const cancelUpdatingUserData = () => {
    setUserProfileInputActive(false);
  }
  /* /user profile */

  /* auth */
  function handleSubmitRegister(e) {
    e.preventDefault();

    auth.register(name, email, password)
    .then(data => {
      if (data) {
        showPopupMessage(successfulRegistration, true)
        setUserName(data.name);
        setUserEmail(data.email);
        resetAuthForms();
        history.push('/signin');
      }
    })
    .catch(error => {
      showPopupMessage(error, false)
    })
  };

  function handleSubmitLogin(e) {
    e.preventDefault();
    
    auth.login(email, password)
    .then(({token}) => {
      if (token) {
        setLoggedIn(true);
        localStorage.setItem('jwt', token);
        showPopupMessage(successfulLogin, true)
        history.push('/movies');
        return token;
      }
    })
      .catch(error => {
        showPopupMessage(error, false)
      })
  };

  const signout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    resetAuthForms();
    history.push('/');
  }
  /* /auth */

  /* auth validation */
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
    setName(e.target.value);

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
    setEmail(e.target.value);

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
    setPassword(e.target.value);

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
  /* /auth validation */

  /* handlers */
  const movieSearchFormHeandler = (e) => {
    setMovieSearchFormValue(e.target.value);
    if(e.target.value === '') {
      setNoSearchMovieResult(false);
      changeCardValues();
    }
  };

  const savedMovieSearchFormHeandler = (e) => {
    setSavedMovieSearchFormValue(e.target.value);
    if(e.target.value === '') {
      setNoSearchSavedMovieResult(false);
      getFavoriteMovies();
      setNoSearchMovieResult(false);
    }
  };

  function handleSubmitSearchFormForSavedMovies(e) {
    e.preventDefault();

    const favoriteMoviesName = favoriteMovies.map(({nameRU}) => nameRU);
    const savedMoviesSearchingResults = filterItems(savedMovieSearchFormValue, favoriteMoviesName);
    const savedMoviesResult = searchingMovies(favoriteMovies, savedMoviesSearchingResults);

    if(savedMoviesResult.length > 0) {
      setFavoriteMovies(savedMoviesResult);
      setNoSearchSavedMovieResult(false);
    } else {
      setFavoriteMovies(savedMoviesResult);
      setNoSearchSavedMovieResult(true);
    }
  };

  function handleSubmitSearchFormForMovies(e) {
    e.preventDefault();

    const allMoviesName = allMovies.map(({nameRU}) => nameRU);
    const moviesSearchingResults = filterItems(movieSearchFormValue, allMoviesName);
    const moviesResult = searchingMovies(allMovies, moviesSearchingResults);

    if(moviesResult.length > 0) {
      setInitialMovies(moviesResult);
      setNoSearchMovieResult(false);
    } else {
      setInitialMovies(moviesResult);
      setNoSearchMovieResult(true);
      setMoreButtonActive(true);
    }
  };
  /* /handlers */

  /* helpers */
  const showPopupMessage = (text, icon, time = 1000) => {
    setMessagePopupText(text)
    setMessagePopup(true);
    setMessagePopupIcon(icon);
    setTimeout(resetPopupMessageValue, time);
  }

  const resetPopupMessageValue = () => {
    setMessagePopup(false);
  }

  const showSpinner = () => {
    setLoading(false);
  }

  function filterItems(query, array) {
    return array.filter(function(el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  };

  const searchingMovies = (array, searchingResults) => {
    let result = [];
    
    array.forEach(elem => {
      for( let i = 0; i <= searchingResults.length; i++ ) {
        if(elem.nameRU === searchingResults[i]) {
          result.push(elem);
        }
      }
      return;
    });

    if(result.length > 0) {
      setMoreButtonActive(true);
      return result;
    } else {
      return [];
    };
  };

  const resetAuthForms = () => {
    setName('');
    setEmail('');
    setPassword('');
  }
  /* /helpers */

  return (
    <SpinnerContext.Provider value={loading} >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Switch>
            <Route exact path='/'>
              <Main
                loggedIn={loggedIn}
                isOpen={visibleNavigation}
                openNavigation={openNavigation}
                closeNavigation={closeNavigation} />
            </Route>

            <ProtectedRoute 
              path='/movies'
              component={Movies}
              noSearchMovieResult={noSearchMovieResult}

              movies={initialMovies}
              favoriteMovies={favoriteMovies}
              moreButtonActive={moreButtonActive}
              loadMoreCards={loadMoreCards}
              favoritesIcon={favoritesIcon.add}
              loggedIn={loggedIn}
              isOpen={visibleNavigation}
              openNavigation={openNavigation}
              closeNavigation={closeNavigation}
              addMovieToFavoriteList={addMovieToFavoriteList}
              getTimeFormat={getTimeFormat}
              handleSubmitSearchForm={handleSubmitSearchFormForMovies}
              searchFormValue={movieSearchFormValue}
              searchFormHeandler={movieSearchFormHeandler} />

            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              noSearchSavedMovieResult={noSearchSavedMovieResult}
              emptyListValue={emptyListValue}

              movies={favoriteMovies}
              favoritesIcon={favoritesIcon.remove}
              loggedIn={loggedIn}
              isOpen={visibleNavigation}
              openNavigation={openNavigation}
              closeNavigation={closeNavigation}
              removieMovieInFavoriteList={removieMovieInFavoriteList}
              getTimeFormat={getTimeFormat}
              handleSubmitSearchForm={handleSubmitSearchFormForSavedMovies}
              searchFormValue={savedMovieSearchFormValue}
              searchFormHeandler={savedMovieSearchFormHeandler} />

            <ProtectedRoute
              path='/profile'
              component={Profile}

              userName={userName}
              userEmail={userEmail}
              currentUserNameHandler={currentUserNameHandler}
              currentUserEmailHandler={currentUserEmailHandler}
              formValid={formValid}
              signout={signout}
              loggedIn={loggedIn}
              isOpen={visibleNavigation}
              openNavigation={openNavigation}
              closeNavigation={closeNavigation}
              handleUpdateUserProfile={handleUpdateUserProfile}
              userProfileInputActive={userProfileInputActive}
              allowUpdatingUserData={allowUpdatingUserData}
              cancelUpdatingUserData={cancelUpdatingUserData} />

            <Route path='/signup'>
              <Register
                name={name}
                email={email}
                password={password}
                errorMessage={errorMessage}
                formValid={formValid}
                focusHandler={focusHandler}
                userNameHandler={userNameHandler}
                userEmailHandler={userEmailHandler}
                userPasswordHandler={userPasswordHandler}
                userNameError={userNameError}
                userEmailError={userEmailError}
                userPasswordError={userPasswordError}
                handleSubmitRegister={handleSubmitRegister} />
            </Route>

            <Route path='/signin'>
              <Login
                email={email}
                password={password}
                errorMessage={errorMessage}
                formValid={formValid}
                focusHandler={focusHandler}
                userEmailHandler={userEmailHandler}
                userPasswordHandler={userPasswordHandler}
                userEmailError={userEmailError}
                userPasswordError={userPasswordError}
                handleSubmitLogin={handleSubmitLogin} />
            </Route>

            <Route path="" component={ErrorPage} />
          </Switch>

          <MessagePopup
            title={messagePopupText}
            isOpen={messagePopup}
            icon={messagePopupIcon} />
        </div>
      </CurrentUserContext.Provider>
    </SpinnerContext.Provider>
  );
}

export default App;
