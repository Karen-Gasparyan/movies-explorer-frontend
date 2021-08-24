import React from 'react';

import './SavedMovies.css';

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
    closeNavigation,
    removieMovieInFavoriteList,
    handleSubmitSearchForm
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
          cards={cards}
          favoritesIcon={favoritesIcon}
          favoriteButton={removieMovieInFavoriteList} />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;