import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import './App.css';

// constants
import {
  emailRegExp,
  favoritesIcon,

  successful,
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
  const [allMovies, setAllMovies] = useState([]); //
  const [initialMovies, setInitialMovies] = useState([]); // 
  const [initiaFavoritelMovies, setInitialFavoriteMovies] = useState([]); // 
  const [favoriteMovies, setFavoriteMovies] = useState([]); // 
  const [shortMovies, setShortMovies] = useState([]) //
  // const [initialFavoriteMovies, setInitialFavoriteMovies] = useState([]); // 

  const [noSearchMovieResult, setNoSearchMovieResult] = useState(false);
  const [noSearchSavedMovieResult, setNoSearchSavedMovieResult] = useState(false);
  const [movieSearchFormValue, setMovieSearchFormValue] = useState('');
  const [savedMovieSearchFormValue, setSavedMovieSearchFormValue] = useState('');
  const [emptyListValue, setEmptyListValue] = useState(null);
  // const [shortMovies, setShortMovies] = useState(false);
  const [moreButtonActive, setMoreButtonActive] = useState(false);
  const [moreFavoriteButtonActive, setMoreFavoriteButtonActive] = useState(false);
  const [mobileCards, setMobileCards] = useState(5);
  const [tabletCards, setTabletCards] = useState(8);
  const [desctopCards, setDesctopCards] = useState(12);
  const [favoriteMobileCards, setFavoriteMobileCards] = useState(5);
  const [favoriteTabletCards, setFavoriteTabletCards] = useState(8);
  const [favoriteDesctopCards, setFavoriteDesctopCards] = useState(12);
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

  // const changeMoviesValue = useCallback(() => {
  //   if (window.innerWidth >= 320 && window.innerWidth < 768) {
  //     console.log('mobile') //
  //     setInitialMovies(allMovies.slice(0, mobileCards)); // 5
  //     setFavoriteMovies(favoriteMovies => favoriteMovies.slice(0, favoriteMobileCards));
  //     setShortMovies()
  //   } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
  //     console.log('tablet') //
  //     setInitialMovies(allMovies.slice(0, tabletCards)); // 8
  //     setFavoriteMovies(favoriteMovies => favoriteMovies.slice(0, favoriteTabletCards));
  //     setShortMovies()
  //   } else if (window.innerWidth >= 1280) {
  //     console.log('desctop') //
  //     setInitialMovies(allMovies.slice(0, desctopCards)); // 12
  //     setFavoriteMovies(favoriteMovies => favoriteMovies.slice(0, favoriteDesctopCards));
  //     setShortMovies()
  //   };
  // }, [allMovies, mobileCards, tabletCards, desctopCards, favoriteMobileCards, favoriteTabletCards, favoriteDesctopCards])

  // const changeMoviesCardSize = (initial, movies) => {
  //   if (window.innerWidth >= 320 && window.innerWidth < 768) {
  //     return initial(movies.slice(0, mobileCards)); // 5
  //   } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
  //     return initial(movies.slice(0, tabletCards)); // 8
  //   } else if (window.innerWidth >= 1280) {
  //     return initial(movies.slice(0, desctopCards)); // 12
  //   };
  // };

  const changeMoviesValue = useCallback((initial = setInitialMovies, movies = allMovies) => {
    if (window.innerWidth >= 320 && window.innerWidth < 768) {
      return initial(movies.slice(0, mobileCards)); // 5
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      return initial(movies.slice(0, tabletCards)); // 8
    } else if (window.innerWidth >= 1280) {
      return initial(movies.slice(0, desctopCards)); // 12
    };
  }, [allMovies, mobileCards, tabletCards, desctopCards]);

  const changeFavoriteMoviesValue= useCallback((initial = setInitialFavoriteMovies, movies = favoriteMovies) => {
    if (window.innerWidth >= 320 && window.innerWidth < 768) {
      return initial(movies.slice(0, favoriteMobileCards)); // 5
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      return initial(movies.slice(0, favoriteTabletCards)); // 8
    } else if (window.innerWidth >= 1280) {
      return initial(movies.slice(0, favoriteDesctopCards)); // 12
    };
  }, [favoriteMovies, favoriteMobileCards, favoriteTabletCards, favoriteDesctopCards]);

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
    console.log('useEffect allMovies')
    changeMoviesValue();
    changeMoreButtonActiveMovies();
  }, [changeMoviesValue, changeMoreButtonActiveMovies]);

  useEffect(() => {
    console.log('useEffect favoriteMovies')
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
      console.log('Необходима авторизация'); //
      setLoggedIn(false);
    }
  }, [loggedIn]);

  // get all movies
  useEffect(() => {
    if(localStorage.getItem('all-movies')) {
      console.log('all-movies STATE loading') //
      setAllMovies(loadState('all-movies'));
      setInitialMovies(loadState('all-movies'));
      setLoading(false);
    } else if(localStorage.getItem('jwt') && !localStorage.getItem('all-movies')) {
      console.log('all-movies GET loading') //
      moviesApi.getAllMovies()
      .then(data => {
        if(data) {
          saveState(data, 'all-movies');
          saveState(getMovieDuration(loadState('all-movies')), 'short-list');
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
    const favoriteMoviesStateValues = loadState('favorite-movies');

    if(localStorage.getItem('favorite-movies')) {
      console.log('favorite-movie STATE loading') //
      setFavoriteMovies(loadState('favorite-movies'))
      setLoading(false);
    } else if(!localStorage.getItem('favorite-movies') && localStorage.getItem('jwt')) {
      console.log('favorite-movies GET loading') //
      mainApi.getSavedMovies(localStorage.getItem('jwt'))
        .then(({data}) => {
          if(data) {
            saveState(data, 'favorite-movies');
            setFavoriteMovies(data);
            setTimeout(showSpinner, 1000);
          } else {
            setEmptyListValue(true);
            setMoreFavoriteButtonActive(true);
            // setShortMovies(true);
          }
        })
        .catch(error => console.log(error));
    }
    if(favoriteMoviesStateValues && favoriteMoviesStateValues.length === 0) {
      setEmptyListValue(true);
      // setShortMovies(true);
      setMoviesFilterCheckbox(false);
    };
  }, [loggedIn]);

  // auth validation
  useEffect(() => {
    if (userEmailError || userPasswordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userEmailError, userPasswordError])

  /* movies */ // +++++++++++++++++++++++++++++++++++++++++++++++++
  const loadMoreMoviesCard = (e) => {
    if(e.target.name === 'movies-button') {
      setMobileCards(mobileCards + 2);
      setTabletCards(tabletCards + 2);
      setDesctopCards(desctopCards + 3);
    } else if(e.target.name === 'favorite-movies-button') {
      setFavoriteMobileCards(favoriteMobileCards + 2);
      setFavoriteTabletCards(favoriteTabletCards + 2);
      setFavoriteDesctopCards(favoriteDesctopCards + 3);
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
              setEmptyListValue(false);
              setFavoriteMovies([data, ...favoriteMovies]);
              saveState([data, ...favoriteMovies], 'favorite-movies');
              showPopupMessage(addedToCollection, true);
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
          setFavoriteMovies([data])
          showPopupMessage(addedToCollection, true);
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
          saveState(updatingStateValue, 'favorite-movies');
          // setInitiaFavoritelMovies(allMovies => allMovies.filter(movie => movie._id !== _id));
          showPopupMessage(removedFromCollection, true);
          if(favoriteMovies.length < 2) {
            setEmptyListValue(true);
            // setShortMovies(true);
            setMoviesFilterCheckbox(false);
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
        }
      })
      .catch(error => {
        showPopupMessage(error, false)
      })
  }

  const signin = (email, password) => {
    auth.login(email, password)
      .then(({token}) => {
        if(token) {
          localStorage.setItem('jwt', token);
          showPopupMessage(successfulLogin, true);
          setLoggedIn(true);
          history.push('/movies');
          return token;
        };
      })
      .catch(error => {
        showPopupMessage(error, false)
      })
  }

  const signout = () => {
    localStorage.clear();
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
      saveState(allMovies, 'found-movies');
      // changeCardValues(allMovies);
    }
  };

  function handleSubmitSearchFormForMovies(e) {
    e.preventDefault();

    const allMoviesName = allMovies.map(({nameRU}) => nameRU);
    const moviesSearchingResults = filterItems(movieSearchFormValue, allMoviesName);
    const moviesResult = searchingMovies(allMovies, moviesSearchingResults);

    saveState(moviesResult, 'found-movies');

    // changeCardValues(moviesResult);

    if(moviesResult.length <= 0) {
      setNoSearchMovieResult(true);
    }
  };

  const savedMovieSearchFormHeandler = (e) => {
    setSavedMovieSearchFormValue(e.target.value);
    if(e.target.value === '') {
      setNoSearchSavedMovieResult(false);
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
    };
  };

  const handleFilterCheckboxMovies = () => {
    setMoviesFilterCheckbox(!moviesFilterCheckbox);
    if(!moviesFilterCheckbox) {
      const shortMoviesList = getMovieDuration(allMovies);
      saveState(shortMoviesList, 'short-list');
      setShortMovies(shortMoviesList);
      changeMoviesValue(setInitialMovies, shortMoviesList);
      setAllMovies(shortMoviesList);
      defaultMoviesNumberValue();
    } else {
      changeMoviesValue(setInitialMovies, allMovies);
      setAllMovies(loadState('all-movies'));
      defaultMoviesNumberValue();
    };
  };

  const handleFilterCheckboxSavedMovies = () => { // ++++++++++
    setSavedMoviesFilterCheckbox(!savedMoviesFilterCheckbox);
    if(!savedMoviesFilterCheckbox) {
      const shortFavoriteMoviesList = getMovieDuration(favoriteMovies);
      saveState(shortFavoriteMoviesList, 'short-list');
      setShortMovies(shortFavoriteMoviesList);
      changeFavoriteMoviesValue(setInitialFavoriteMovies, shortFavoriteMoviesList);
      setFavoriteMovies(shortFavoriteMoviesList)
      defaultMoviesNumberValue();
    } else {
      changeFavoriteMoviesValue(setInitialFavoriteMovies, favoriteMovies);
      setFavoriteMovies(loadState('favorite-movies'));
      defaultMoviesNumberValue();
    };
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

  const getMovieDuration = (movies) => {
    let result = [];

    movies.forEach(movie => {
      if(movie.duration <= 40) {
        result.push(movie);
      }
    })
    return result;
  }

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
      // setMoreButtonActive(true);
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

  const getTimeFormat = (mins) => {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
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
        }
        return JSON.parse(initialMoviesState);
    } catch (err) {
        return undefined;
    };
  };

  const defaultMoviesNumberValue = () => {
    setMobileCards(5);
    setTabletCards(8);
    setDesctopCards(12);
    setFavoriteMobileCards(5);
    setFavoriteTabletCards(8);
    setFavoriteDesctopCards(12);
  };
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
              loadMoreCards={loadMoreMoviesCard}
              favoritesIcon={favoritesIcon.add}
              loggedIn={loggedIn}
              isOpen={visibleNavigation}
              openNavigation={openNavigation}
              closeNavigation={closeNavigation}
              addMovieToFavoriteList={addMovieToFavoriteList}
              getTimeFormat={getTimeFormat}
              handleSubmitSearchForm={handleSubmitSearchFormForMovies}
              searchFormValue={movieSearchFormValue}
              searchFormHeandler={movieSearchFormHeandler}
              filterCheckbox={moviesFilterCheckbox}
              handleFilterCheckbox={handleFilterCheckboxMovies} />

            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              noSearchSavedMovieResult={noSearchSavedMovieResult}
              emptyListValue={emptyListValue}
              shortMovies={shortMovies}

              movies={initiaFavoritelMovies}
              moreButtonActive={moreFavoriteButtonActive}
              loadMoreCards={loadMoreMoviesCard}
              favoritesIcon={favoritesIcon.remove}
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
              handleFilterCheckbox={handleFilterCheckboxSavedMovies} />

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
      </CurrentUserContext.Provider>
    </SpinnerContext.Provider>
  );
}

export default App;