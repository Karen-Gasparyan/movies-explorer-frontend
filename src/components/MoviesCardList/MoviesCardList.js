import React from 'react';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import SpinnerContext from '../../contexts/SpinnerContexts';

const MoviesCardList = (
  { component: Component,
    cards = [],
    favoritesIcon,
    favoriteButton,
    moreButtonActive,
    loadMoreCards,
  }) => {

  const spinner = React.useContext(SpinnerContext);

  const movies = cards.map(values => spinner ?
    <Preloader key={values.id || values._id} />
    :
    (<MoviesCard
      key={values.id || values._id}
      movieValues={values}
      favoritesIcon={favoritesIcon}
      favoriteButton={favoriteButton} />)
  )

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__items">
        {(movies.length <= 0) ?
         (<span>В вашей коллекции нет сохраненных фильмов</span>) : movies}
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