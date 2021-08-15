import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

const MoviesCardList = (props) => {
  const { component: Component, cards, moreButtonActive, loadMoreCards, favoritesIcon } = props;

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__items">
        {cards.map(values => 
          (<MoviesCard
            key={values.id}
            values={values}
            favoritesIcon={favoritesIcon} />)
        )}
      </div>
      <div className="movies-card-list__auxiliary-panel">
        { Component ? (<Component
                         disabled={moreButtonActive}
                         title={'Ещё'}
                         loadMoreCards={loadMoreCards} />) : null }
      </div>
    </section>
  );
}

export default MoviesCardList;