import React from 'react';

import './SavedMovies.css';
import '../../mixins/movies-pages.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = (
  { cards,
    favoritesIcon,

    loggedIn,
    isOpen,
    openNavigation,
    closeNavigation
  }) => {

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isOpen={isOpen}
        openNavigation={openNavigation}
        closeNavigation={closeNavigation} />
      <section className="movies-pages saved-movies">
        <SearchForm 
          placeholder={'Фильм'}
          buttonText={'Найти'} />
        <MoviesCardList
          cards={cards}
          favoritesIcon={favoritesIcon} />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;