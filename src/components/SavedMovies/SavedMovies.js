import React from 'react';

import './SavedMovies.css';

import {requestNotFound} from '../../utils/constants';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

const SavedMovies = (
  { movies,
    noSearchSavedMovieResult,
    favoritesIcon,
    moreButtonActive,
    loggedIn,
    isOpen,
    openNavigation,
    closeNavigation,
    removieMovieInFavoriteList,
    getTimeFormat,
    emptyListValue,
    shortMovies,
    handleSubmitSearchForm,
    searchFormValue,
    searchFormHeandler,
    filterCheckbox,
    handleFilterCheckbox,
    loadMoreCards
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
          emptyListValue={emptyListValue}
          filterCheckbox={filterCheckbox}
          handleFilterCheckbox={handleFilterCheckbox} />
        <MoviesCardList
          component={LoadMoreButton}
          movies={movies}
          noSearchSavedMovieResult={noSearchSavedMovieResult}
          favoritesIcon={favoritesIcon}
          favoriteButton={removieMovieInFavoriteList}
          getTimeFormat={getTimeFormat}
          emptyListValue={emptyListValue}
          shortMovies={shortMovies}
          cardListMessage={requestNotFound}
          moreButtonActive={moreButtonActive}
          loadMoreCards={loadMoreCards}
          buttonName={'favorite-movies-button'} />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;