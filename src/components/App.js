import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

// constants
import { favoritesIcon } from '../utils/constants';

// components
import Header from './Header/Header';
import Footer from './Footer/Footer';
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

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [visibleNavigation, setVisibleNavigation] = useState(false);

  // cards +
  const [initialCards, setInitialCards] = useState([])
  const [moreButtonActive, setMoreButtonActive] = useState(false)

  const [mobileCards, setMobileCards] = useState(5);
  const [tabletCards, setTabletCards] = useState(8);
  const [desctopCards, setDesctopCards] = useState(12);

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
            favoritesIcon={favoritesIcon.add} />
        </Route>

        <Route path='/saved-movies'>
          <SavedMovies
            cards={savedCards}
            favoritesIcon={favoritesIcon.remove} />
        </Route>

        <Route path='/profile'>
          <Profile />
        </Route>

        <Route path='/signup'>
          <Register />
        </Route>

        <Route path='/signin'>
          <Login />
        </Route>

        <Route path="" component={ErrorPage} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
