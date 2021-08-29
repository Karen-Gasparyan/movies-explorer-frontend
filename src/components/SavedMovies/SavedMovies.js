import React from 'react';

import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = (
  { movies,
    favoritesIcon,
    loggedIn,
    isOpen,
    openNavigation,
    closeNavigation,
    removieMovieInFavoriteList,
    handleSubmitSearchForm,
    getTimeFormat
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
          buttonText={'Найти'}
          handleSubmitSearchForm={handleSubmitSearchForm} />
        <MoviesCardList
          movies={movies}
          favoritesIcon={favoritesIcon}
          favoriteButton={removieMovieInFavoriteList}
          getTimeFormat={getTimeFormat} />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;