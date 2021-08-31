import React from 'react';

import './MoviesCardList.css';

import {noSavedMovies} from '../../utils/constants';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import MoviesCardListMessage from '../MoviesCardListMessage/MoviesCardListMessage';
import SpinnerContext from '../../contexts/SpinnerContexts';

const MoviesCardList = (
  { component: Component,
    movies = [],
    favoriteMovies,
    favoritesIcon,
    favoriteButton,
    moreButtonActive,
    loadMoreCards,
    getTimeFormat,
    emptyListValue,
    noSearchMovieResult,
    noSearchSavedMovieResult,
    cardListMessage
  }) => {
  const spinner = React.useContext(SpinnerContext);

  const moviesList = movies.map(values => {
    return spinner ?
    <Preloader key={values.id || values._id} /> :
    (<MoviesCard
      key={values.id || values._id}
      movieValues={values}
      favoriteMovies={favoriteMovies}
      favoritesIcon={favoritesIcon}
      favoriteButton={favoriteButton}
      getTimeFormat={getTimeFormat} />)
  })

  return (
    <section className="movies-card-list">
      {noSearchMovieResult ? <MoviesCardListMessage message={cardListMessage} /> : null}
      {noSearchSavedMovieResult ? <MoviesCardListMessage message={cardListMessage} /> : null}
      <div className="movies-card-list__items">
        {emptyListValue ? <MoviesCardListMessage message={noSavedMovies} /> : moviesList}
      </div>
      <div className="movies-card-list__auxiliary-panel">
        { Component ? (<Component
                         disabled={moreButtonActive}
                         title={'Ещё'}
                         loadMoreCards={loadMoreCards}
                         spinner={spinner} />) : null }
      </div>
    </section>
  );
}

export default MoviesCardList;