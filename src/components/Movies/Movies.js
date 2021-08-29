import React from 'react';

import './Movies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import Footer from '../Footer/Footer';

const Movies = (
  { movies,
    favoriteMovies,
    moreButtonActive,
    loadMoreCards,
    favoritesIcon,
    loggedIn,
    isOpen,
    openNavigation,
    closeNavigation,
    addMovieToFavoriteList,
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
      <section className="movies-pages movies">
        <SearchForm 
          placeholder={'Фильм'}
          buttonText={'Найти'}
          handleSubmitSearchForm={handleSubmitSearchForm} />
        <MoviesCardList
          component={LoadMoreButton}
          movies={movies}
          favoriteMovies={favoriteMovies}
          favoritesIcon={favoritesIcon}
          favoriteButton={addMovieToFavoriteList}
          removieMovieInFavoriteList={removieMovieInFavoriteList}
          moreButtonActive={moreButtonActive}
          loadMoreCards={loadMoreCards}
          getTimeFormat={getTimeFormat}/>
      </section>
      <Footer />
    </>
  );
}

export default Movies;