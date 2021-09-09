import React from 'react';

import './SavedMovies.css';

import {REQUEST_NOT_FOUND} from '../../utils/constants';

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
    loadMoreCards,
    favoriteMovies,
    checkboxActive,
    searchCheckboxActive,
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
          handleFilterCheckbox={handleFilterCheckbox}
          checkboxActive={checkboxActive} />
        <MoviesCardList
          component={LoadMoreButton}
          movies={movies}
          noSearchSavedMovieResult={noSearchSavedMovieResult}
          favoritesIcon={favoritesIcon}
          favoriteButton={removieMovieInFavoriteList}
          getTimeFormat={getTimeFormat}
          emptyListValue={emptyListValue}
          shortMovies={shortMovies}
          cardListMessage={REQUEST_NOT_FOUND}
          moreButtonActive={moreButtonActive}
          loadMoreCards={loadMoreCards}
          favoriteMovies={favoriteMovies}
          searchCheckboxActive={searchCheckboxActive}
          buttonName={'favorite-movies-button'} />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;