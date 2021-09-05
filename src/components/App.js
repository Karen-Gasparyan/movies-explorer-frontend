import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import './App.css';

// constants
import {
  EMAIL_RegExp,
  SUCCESSFUL,
  SUCCESSFUL_LOGIN,
  PASSWORD_MESSAGE_AUTH,
  PASSWORD_MINIMUM_VALUE,
  INCORRECT_EMAIL,
  INCORRECT_USER_NAME,
  AUTHORIZATION_REQUIRED,
  REMOVED_FROM_COLLECTION,
  ADDED_TO_COLLECTION,
  FAVORITES_ICON,
  MOBILE_CARDS_VALUE,
  TABLET_CARDS_VALUE,
  DESCTOP_CARDS_VALUE,
  SET_MOBILE_CARDS_VALUE,
  SET_TABLET_CARDS_VALUE,
  SET_DESCTOP_CARDS_VALUE,
  INITIAL_CARDS_SIZE,
  MOBILE_CARDS_SIZE,
  TABLET_CARDS_SIZE,
  DESCTOP_CARDS_SIZE,
  SHORT_MOVIE_TIME_LIMIT
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
import AllMoviesContext from '../contexts/AllMoviesContext';

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
  const [initialMovies, setInitialMovies] = useState([]);
  const [initiaFavoritelMovies, setInitialFavoriteMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState(true)
  const [noSearchMovieResult, setNoSearchMovieResult] = useState(false);
  const [noSearchSavedMovieResult, setNoSearchSavedMovieResult] = useState(false);
  const [moviesSearchFormValue, setMoviesSearchFormValue] = useState('');
  const [savedMovieSearchFormValue, setSavedMovieSearchFormValue] = useState('');
  const [emptyListValue, setEmptyListValue] = useState(false);
  const [moreButtonActive, setMoreButtonActive] = useState(false);
  const [moreFavoriteButtonActive, setMoreFavoriteButtonActive] = useState(false);
  const [mobileCards, setMobileCards] = useState(MOBILE_CARDS_VALUE);
  const [tabletCards, setTabletCards] = useState(TABLET_CARDS_VALUE);
  const [desctopCards, setDesctopCards] = useState(DESCTOP_CARDS_VALUE);
  const [favoriteMobileCards, setFavoriteMobileCards] = useState(MOBILE_CARDS_VALUE);
  const [favoriteTabletCards, setFavoriteTabletCards] = useState(TABLET_CARDS_VALUE);
  const [favoriteDesctopCards, setFavoriteDesctopCards] = useState(DESCTOP_CARDS_VALUE);
  // user profile
  const [currentUser, setCurrentUser ] = useState({});
  const [userProfileInputActive, setUserProfileInputActive] = useState(false);
  // search form
  const [moviesFilterCheckbox, setMoviesFilterCheckbox] = useState(false)
  const [savedMoviesFilterCheckbox, setSavedMoviesFilterCheckbox] = useState(false)
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

  const changeMoviesValue = useCallback((initial = setInitialMovies, movies = allMovies) => {
    if (window.innerWidth >= MOBILE_CARDS_SIZE && window.innerWidth < TABLET_CARDS_SIZE) {
      return initial(movies.slice(INITIAL_CARDS_SIZE, mobileCards));
    } else if (window.innerWidth >= TABLET_CARDS_SIZE && window.innerWidth < DESCTOP_CARDS_SIZE) {
      return initial(movies.slice(INITIAL_CARDS_SIZE, tabletCards));
    } else if (window.innerWidth >= DESCTOP_CARDS_SIZE) {
      return initial(movies.slice(INITIAL_CARDS_SIZE, desctopCards));
    };
  }, [allMovies, mobileCards, tabletCards, desctopCards]);

  const changeFavoriteMoviesValue= useCallback((initial = setInitialFavoriteMovies, movies = favoriteMovies) => {
    if (window.innerWidth >= MOBILE_CARDS_SIZE && window.innerWidth < TABLET_CARDS_SIZE) {
      return initial(movies.slice(INITIAL_CARDS_SIZE, favoriteMobileCards)); 
    } else if (window.innerWidth >= TABLET_CARDS_SIZE && window.innerWidth < DESCTOP_CARDS_SIZE) {
      return initial(movies.slice(INITIAL_CARDS_SIZE, favoriteTabletCards));
    } else if (window.innerWidth >= DESCTOP_CARDS_SIZE) {
      return initial(movies.slice(INITIAL_CARDS_SIZE, favoriteDesctopCards));
    };
  },[favoriteMovies, favoriteMobileCards, favoriteTabletCards, favoriteDesctopCards]);

  const changeMoreButtonActiveFavoriteMovies = useCallback(() => {
    (initiaFavoritelMovies.length >= favoriteMovies.length
      || favoriteMovies.length < 1) ?
    setMoreFavoriteButtonActive(true) :
    setMoreFavoriteButtonActive(false);
}, [initiaFavoritelMovies.length, favoriteMovies.length]);
  
  const changeMoreButtonActiveMovies = useCallback(() => {
    (initialMovies.length >= allMovies.length) ?
    setMoreButtonActive(true) :
    setMoreButtonActive(false);
  }, [initialMovies.length, allMovies.length])

  useEffect(() => {
    changeMoviesValue();
    changeMoreButtonActiveMovies();
  }, [changeMoviesValue, changeMoreButtonActiveMovies]);

  useEffect(() => {
    changeFavoriteMoviesValue();
    changeMoreButtonActiveFavoriteMovies();
  }, [changeFavoriteMoviesValue, changeMoreButtonActiveFavoriteMovies]);

  window.onresize = () => {
    setTimeout(changeMoviesValue, 2000);
    setTimeout(changeFavoriteMoviesValue, 2000);
  };

  // token verification
  useEffect(()=> {
    if(localStorage.getItem('jwt')) {
      auth.getUserData(localStorage.getItem('jwt'))
        .then(({data}) => {
          setCurrentUser(data);
          setUserName(data.name);
          setUserEmail(data.email);
        })
        .catch(error => console.log(error));
    } else {
      console.log(AUTHORIZATION_REQUIRED);
      setLoggedIn(false);
    };
  }, [loggedIn]);

  // get all movies
  useEffect(() => {
    if(localStorage.getItem('all-movies')) {
      console.log('all-movies STATE loading')
      setAllMovies(loadState('all-movies'));
      setInitialMovies(loadState('all-movies'));
      setLoading(false);
    } else if(localStorage.getItem('jwt') && !localStorage.getItem('all-movies')) {
      console.log('all-movies GET loading')
      moviesApi.getAllMovies()
      .then(data => {
        if(data) {
          saveState(data, 'all-movies');
          saveState(getMovieDuration(loadState('all-movies')), 'all-short-list');
          setAllMovies(data);
          setInitialMovies(data);
          setTimeout(showSpinner, 1000);
        };
      })
      .catch(error => console.log(error));
    };
  }, [loggedIn]);

  // get favorite movies
  useEffect(() => {
    // const favoriteMoviesStateValues = loadState('favorite-movies');
    if(localStorage.getItem('favorite-movies')) {
      console.log('favorite-movie STATE loading');
      if(loadState('favorite-movies').length < 1) {
        setEmptyListValue(true);
      };
      setLoading(false);
      setFavoriteMovies(loadState('favorite-movies'));
      setInitialFavoriteMovies(loadState('favorite-movies'));
    } else if(!localStorage.getItem('favorite-movies') && localStorage.getItem('jwt')) {
      console.log('favorite-movies GET loading');
      mainApi.getSavedMovies(localStorage.getItem('jwt'))
        .then(({data}) => {
          if(data) {
            saveState(data, 'favorite-movies');
            saveState(getMovieDuration(loadState('favorite-movies')), 'favorite-short-list');
            setFavoriteMovies(data);
            setInitialFavoriteMovies(data);
            setTimeout(showSpinner, 1000);
          } else {
            saveState([...[]], 'favorite-movies');
            setEmptyListValue(true);
          };
        })
        .catch(error => console.log(error));
    }
    // if(favoriteMoviesStateValues && favoriteMoviesStateValues.length === 0) {
    //   setEmptyListValue(true);
    //   setMoviesFilterCheckbox(false);
    // };
  }, [loggedIn]);

  // auth validation
  useEffect(() => {
    if (userEmailError || userPasswordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    };
  }, [userEmailError, userPasswordError])

  /* movies */
  const loadMoreMoviesCard = (e) => {
    if(e.target.name === 'movies-button') {
      updateMoviesCardsNumber();
    } else if(e.target.name === 'favorite-movies-button') {
      updateFavoriteMovieCardNumber();
    };
  };

  const addMovieToFavoriteList = (selectedMovieValues) => {
    const { id } = selectedMovieValues;
    const token = localStorage.getItem('jwt');

    if(favoriteMovies) {
      const favoriteMoviesIds = favoriteMovies.map(movie => movie.movieId);
      const movieAdded = favoriteMoviesIds.some(movieId => movieId === id);

      if(!movieAdded) {
        mainApi.setSavedMovies(token, selectedMovieValues)
          .then(({data}) => {
            if(data) {
              saveState([data, ...favoriteMovies], 'favorite-movies');
              setFavoriteMovies(loadState('favorite-movies'));
              setInitialFavoriteMovies(loadState('favorite-movies'));
              showPopupMessage(ADDED_TO_COLLECTION, true);
              setEmptyListValue(false);
            };
          }).catch(error => {
            showPopupMessage(error, false)
          });
      } else {
        const _id = favoriteMovies.filter(movie => {
          if(movie.movieId === id) {
            return movie._id;
          } else {
            return null;
          };
        });

        removieMovieInFavoriteList(_id[0]);
      };
    } else {
      mainApi.setSavedMovies(token, selectedMovieValues)
        .then(({data}) => {
          setFavoriteMovies(data)
          showPopupMessage(ADDED_TO_COLLECTION, true);
        })
        .catch(error => {
          showPopupMessage(error, false)
        });
    };
  };

  const removieMovieInFavoriteList = (selectedMovieValues) => {
    const { _id } = selectedMovieValues;
    const token = localStorage.getItem('jwt');

    if (localStorage.getItem('jwt')) {
      mainApi.deleteFavoriteMovie(token, _id)
      .then(({data}) => {
        if(data) {
          const updatingStateValue = favoriteMovies.filter(movie => {
            if(movie._id !== data._id) {
              return movie;
            };
            return null;
          });
          setFavoriteMovies(updatingStateValue);
          setInitialFavoriteMovies(updatingStateValue)
          saveState(updatingStateValue, 'favorite-movies');
          showPopupMessage(REMOVED_FROM_COLLECTION, true);
          if(favoriteMovies.length < 2) {
            setEmptyListValue(true);
          };
        };
      })
      .catch(error => {
        showPopupMessage(error, false)
      });
    };
  };
  /* /movies */

  /* navigation */
  const openNavigation = () => {
    setVisibleNavigation(true);
  };

  const closeNavigation = () => {
    setVisibleNavigation(false);
  };
  /* /navigation */

  /* user profile */
  const currentUserNameHandler = (e) => {
    setUserName(e.target.value);

    if (e.target.value.length < 2) {
      setFormValid(false);
      if (!e.target.value) {
        setFormValid(false);
      };
    } else {
      setFormValid(true);
    };
  };

  const currentUserEmailHandler = (e) => {
    setUserEmail(e.target.value);

    if (!EMAIL_RegExp.test(String(e.target.value).toLowerCase())) {
      setFormValid(false);
      if (!e.target.value) {
        setFormValid(false);
      };
    } else {
      setFormValid(true);
    };
  };

  function handleUpdateUserProfile(e) {
    e.preventDefault();
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');
      mainApi.setUserInfo(token, userName, userEmail)
      .then(({data:{name, email}}) => {
        setCurrentUser({name, email});
        setUserProfileInputActive(false);
        showPopupMessage(SUCCESSFUL, true, 500)
      })
      .catch(error => {
        showPopupMessage(error, false)
      });
    };
  };

  const allowUpdatingUserData = () => {
    setUserProfileInputActive(true);
  };

  const cancelUpdatingUserData = () => {
    setUserProfileInputActive(false);
  };
  /* /user profile */

  /* auth */
  function handleSubmitRegister(e) {
    e.preventDefault();
    signup(name, email, password);
  };

  function handleSubmitLogin(e) {
    e.preventDefault();
    signin(email, password);
  };

  const signup = (name, email, password) => {
    auth.register(name, email, password)
      .then(({data}) => {
        if(data) {
          setUserName(data.name);
          setUserEmail(data.email);
          signin(data.email, password);
        };
      })
      .catch(error => {
        showPopupMessage(error, false)
      });
  };

  const signin = (email, password) => {
    auth.login(email, password)
      .then(({token}) => {
        if(token) {
          localStorage.setItem('jwt', token);
          showPopupMessage(SUCCESSFUL_LOGIN, true, 1500);
          setLoggedIn(true);
          const loadingHistory = () => {
            return history.push('/movies');
          };
          setTimeout(loadingHistory, 1500);
          return token;
        };
      })
      .catch(error => {
        showPopupMessage(error, false)
      });
  };

  const signout = () => {
    localStorage.clear();
    setLoggedIn(false);
    resetAuthForms();
    history.push('/');
  };
  /* /auth */

  /* auth validation */
  const focusHandler = (e) => {
    if (e.target.name === 'name') {
      userNameHandler(e);
    } else if (e.target.name === 'email') {
      userEmailHandler(e);
    } else if (e.target.name === 'password') {
      userPasswordHandler(e);
    };
  };

  const userNameHandler = (e) => {
    setName(e.target.value);

    if (e.target.value.length < 2) {
      setErrorMessage(INCORRECT_USER_NAME);
      setUserNameError(true);
      if (!e.target.value) {
        setErrorMessage('');
        setUserNameError(true);
      };
    } else {
      setErrorMessage('')
      setUserNameError(false);
    };
  };

  const userEmailHandler = (e) => {
    setEmail(e.target.value);

    if (!EMAIL_RegExp.test(String(e.target.value).toLowerCase())) {
      setErrorMessage(INCORRECT_EMAIL);
      setUserEmailError(true);
      if (!e.target.value) {
        setErrorMessage('');
        setUserEmailError(true);
      }
    } else {
      setErrorMessage('');
      setUserEmailError(false);
    };
  };

  const userPasswordHandler = (e) => {
    setPassword(e.target.value);

    if (e.target.value.length < PASSWORD_MINIMUM_VALUE) {
      setErrorMessage(PASSWORD_MESSAGE_AUTH);
      setUserPasswordError(true);
      if (!e.target.value) {
        setErrorMessage('');
        setUserPasswordError(true);
      }
    } else {
      setErrorMessage('');
      setUserPasswordError(false);
    };
  };
  /* /auth validation */

  /* handlers */
  const moviesSearchFormHeandler = (e) => {
    setMoviesSearchFormValue(e.target.value);
    if(e.target.value === '' && moviesFilterCheckbox === false) {
      setAllMovies(loadState('all-movies'));
      getMoviesNumberValue(setInitialMovies, allMovies);
      setNoSearchMovieResult(false);
      return;
    } else if(e.target.value === '' || moviesFilterCheckbox === true) {
      setAllMovies(loadState('all-short-list'));
      getMoviesNumberValue(setInitialMovies, loadState('all-short-list'));
      setNoSearchMovieResult(false);
      return;
    };
  };

  function handleSubmitSearchFormForMovies(e) {
    e.preventDefault();
    const moviesName = allMovies.map(({nameRU}) => nameRU);
    const searchResults = filterItems(moviesSearchFormValue, moviesName);
    const dataResult = searchingMovies(allMovies, searchResults);
    
    saveState(dataResult, 'all-found-movies');
    getMoviesNumberValue(setInitialMovies, dataResult);
    setAllMovies(dataResult);
    
    if(dataResult.length < 1) {
      setNoSearchMovieResult(true);
    };
  };

  const savedMovieSearchFormHeandler = (e) => {
    setSavedMovieSearchFormValue(e.target.value);
    if(e.target.value === '') {
      if(savedMoviesFilterCheckbox === true) {
        setFavoriteMovies(loadState('short-list'));
        getMoviesNumberValue(setInitialFavoriteMovies, favoriteMovies);
      } else {
        setFavoriteMovies(loadState('favorite-movies'));
        getMoviesNumberValue(setInitialFavoriteMovies, favoriteMovies);
      };
        setNoSearchSavedMovieResult(false);
        setNoSearchMovieResult(false);
    };
  };

  function handleSubmitSearchFormForSavedMovies(e) {
    e.preventDefault();
    const favoriteMoviesName = favoriteMovies.map(({nameRU}) => nameRU);
    const searchFavoriteResults = filterItems(savedMovieSearchFormValue, favoriteMoviesName);
    const dataFavoriteResult = searchingMovies(favoriteMovies, searchFavoriteResults);
    
    saveState(dataFavoriteResult, 'favorite-found-movies');
    getMoviesNumberValue(setInitialFavoriteMovies, dataFavoriteResult);
    setFavoriteMovies(dataFavoriteResult)

    if(dataFavoriteResult.length > 0) {
      setNoSearchSavedMovieResult(false);
    } else {
      setNoSearchSavedMovieResult(true);
    };
  };

  const handleFilterCheckboxMovies = () => {
    setMoviesFilterCheckbox(!moviesFilterCheckbox);
    if(!moviesFilterCheckbox) {
      const shortMoviesList = getMovieDuration(allMovies);
      saveState(shortMoviesList, 'all-short-list');
      changeMoviesValue(setInitialMovies, shortMoviesList);
      setAllMovies(shortMoviesList);
      defaultMoviesNumberValue();
    } else {
      changeMoviesValue(setInitialMovies, allMovies);
      setAllMovies(loadState('all-movies'));
      defaultMoviesNumberValue();
    };
  };

  const handleFilterCheckboxFavoriteMovies = () => {
    const shortFavoriteMoviesList = getMovieDuration(favoriteMovies);
    if(savedMoviesFilterCheckbox === false) {
      if(shortFavoriteMoviesList.length < 1) {
        setEmptyListValue(true);
        setShortMovies(false);
      } else {
        saveState(shortFavoriteMoviesList, 'short-list');
        setInitialFavoriteMovies(shortFavoriteMoviesList);
        changeFavoriteMoviesValue(setInitialFavoriteMovies, shortFavoriteMoviesList);
        setFavoriteMovies(shortFavoriteMoviesList)
        defaultMoviesNumberValue();
      };
      return setSavedMoviesFilterCheckbox(true);
    } else if(savedMoviesFilterCheckbox) {
      if(shortFavoriteMoviesList.length < 1) {
        setShortMovies(true);
      };
      // setInitialFavoriteMovies(loadState('favorite-movies'));
      setFavoriteMovies(loadState('favorite-movies'))
      // defaultMoviesNumberValue();
      if(!savedMoviesFilterCheckbox && favoriteMovies.length < 2) {
        setEmptyListValue(false);
        setShortMovies(false);
      } else if(favoriteMovies.length) {
        setEmptyListValue(false);
      };
      return setSavedMoviesFilterCheckbox(false);
    };
  };
  /* /handlers */

  /* helpers */
  const showPopupMessage = (text, icon, time = 1000) => {
    setMessagePopupText(text)
    setMessagePopup(true);
    setMessagePopupIcon(icon);
    setTimeout(resetPopupMessageValue, time);
  };

  const resetPopupMessageValue = () => {
    setMessagePopup(false);
  };

  const showSpinner = () => {
    setLoading(false);
  };

  function filterItems(query, array) {
    return array.filter(function(el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  };

  const getMovieDuration = (movies) => {
    const result = [];

    movies.forEach(movie => {
      if(movie.duration <= SHORT_MOVIE_TIME_LIMIT) {
        result.push(movie);
      };
    });
    return result;
  };

  const searchingMovies = (array, searchingResults) => {
    const result = [];
    
    array.forEach(elem => {
      for( let i = 0; i <= searchingResults.length; i++ ) {
        if(elem.nameRU === searchingResults[i]) {
          result.push(elem);
        };
      };
      return;
    });

    if(result.length > 0) {
      return result;
    } else {
      return [];
    };
  };

  const resetAuthForms = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const getTimeFormat = (mins) => {
    const hours = Math.trunc(mins/60);
    const minutes = mins % 60;
    return (hours + 'ч ') + (minutes + 'м');
  };

  const saveState = (state, name) => {
    try {
      const initialMoviesState = JSON.stringify(state);
      localStorage.setItem(name, initialMoviesState);
    } catch (err) {
        return undefined;
    };
  };

  const loadState = (state) => {
    try {
      const initialMoviesState = localStorage.getItem(state);
        if(initialMoviesState === null){
          return undefined;
        };
        return JSON.parse(initialMoviesState);
    } catch (err) {
        return undefined;
    };
  };

  const getMoviesNumberValue = (initial, movies) => {
    if (window.innerWidth >= MOBILE_CARDS_SIZE && window.innerWidth < TABLET_CARDS_SIZE) {
      return initial(movies.slice(INITIAL_CARDS_SIZE, mobileCards));
    } else if (window.innerWidth >= TABLET_CARDS_SIZE && window.innerWidth < DESCTOP_CARDS_SIZE) {
      return initial(movies.slice(INITIAL_CARDS_SIZE, tabletCards));
    } else if (window.innerWidth >= DESCTOP_CARDS_SIZE) {
      return initial(movies.slice(INITIAL_CARDS_SIZE, desctopCards));
    };
  };

  const defaultMoviesNumberValue = () => {
    setMobileCards(MOBILE_CARDS_VALUE);
    setTabletCards(TABLET_CARDS_VALUE);
    setDesctopCards(DESCTOP_CARDS_VALUE);

    setFavoriteMobileCards(MOBILE_CARDS_VALUE);
    setFavoriteTabletCards(TABLET_CARDS_VALUE);
    setFavoriteDesctopCards(DESCTOP_CARDS_VALUE);
  };

  const updateMoviesCardsNumber = () => {
    setMobileCards(mobileCards + SET_MOBILE_CARDS_VALUE);
    setTabletCards(tabletCards + SET_TABLET_CARDS_VALUE);
    setDesctopCards(desctopCards + SET_DESCTOP_CARDS_VALUE);
  };

  const updateFavoriteMovieCardNumber = () => {
    setFavoriteMobileCards(favoriteMobileCards + SET_MOBILE_CARDS_VALUE);
    setFavoriteTabletCards(favoriteTabletCards + SET_TABLET_CARDS_VALUE);
    setFavoriteDesctopCards(favoriteDesctopCards + SET_DESCTOP_CARDS_VALUE);
  };
  /* /helpers */

  return (
    <SpinnerContext.Provider value={loading} >
      <CurrentUserContext.Provider value={currentUser}>
        <AllMoviesContext.Provider value={allMovies}> 
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
                loadMoreCards={loadMoreMoviesCard}
                favoritesIcon={FAVORITES_ICON.add}
                loggedIn={loggedIn}
                isOpen={visibleNavigation}
                openNavigation={openNavigation}
                closeNavigation={closeNavigation}
                addMovieToFavoriteList={addMovieToFavoriteList}
                getTimeFormat={getTimeFormat}
                handleSubmitSearchForm={handleSubmitSearchFormForMovies}
                searchFormValue={moviesSearchFormValue}
                searchFormHeandler={moviesSearchFormHeandler}
                filterCheckbox={moviesFilterCheckbox}
                handleFilterCheckbox={handleFilterCheckboxMovies} />

              <ProtectedRoute
                path='/saved-movies'
                component={SavedMovies}
                noSearchSavedMovieResult={noSearchSavedMovieResult}
                emptyListValue={emptyListValue}
                shortMovies={shortMovies}
                movies={initiaFavoritelMovies}
                favoriteMovies={favoriteMovies}
                moreButtonActive={moreFavoriteButtonActive}
                loadMoreCards={loadMoreMoviesCard}
                favoritesIcon={FAVORITES_ICON.remove}
                loggedIn={loggedIn}
                isOpen={visibleNavigation}
                openNavigation={openNavigation}
                closeNavigation={closeNavigation}
                removieMovieInFavoriteList={removieMovieInFavoriteList}
                getTimeFormat={getTimeFormat}
                handleSubmitSearchForm={handleSubmitSearchFormForSavedMovies}
                searchFormValue={savedMovieSearchFormValue}
                searchFormHeandler={savedMovieSearchFormHeandler}
                filterCheckbox={savedMoviesFilterCheckbox}
                handleFilterCheckbox={handleFilterCheckboxFavoriteMovies} />

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
                  handleSubmitRegister={handleSubmitRegister}
                  resetAuthForms={resetAuthForms} />
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
                  handleSubmitLogin={handleSubmitLogin}
                  resetAuthForms={resetAuthForms} />
              </Route>

              <Route path="" component={ErrorPage} />
            </Switch>

            <MessagePopup
              title={messagePopupText}
              isOpen={messagePopup}
              icon={messagePopupIcon} />
          </div>
        </AllMoviesContext.Provider>
      </CurrentUserContext.Provider>
    </SpinnerContext.Provider>
  );
}

export default App;