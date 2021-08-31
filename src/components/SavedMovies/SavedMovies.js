import React from 'react';

import './SavedMovies.css';

import {requestNotFound} from '../../utils/constants';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = (
  { movies,
    noSearchSavedMovieResult,
    favoritesIcon,
    loggedIn,
    isOpen,
    openNavigation,
    closeNavigation,
    removieMovieInFavoriteList,
    getTimeFormat,
    emptyListValue,
    handleSubmitSearchForm,
    searchFormValue,
    searchFormHeandler
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
          handleSubmitSearchForm={handleSubmitSearchForm}
          searchFormValue={searchFormValue}
          searchFormHeandler={searchFormHeandler}
          emptyListValue={emptyListValue} />
        <MoviesCardList
          movies={movies}
          noSearchSavedMovieResult={noSearchSavedMovieResult}
          favoritesIcon={favoritesIcon}
          favoriteButton={removieMovieInFavoriteList}
          getTimeFormat={getTimeFormat}
          emptyListValue={emptyListValue}
          cardListMessage={requestNotFound} />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;