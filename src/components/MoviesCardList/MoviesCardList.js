import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

const MoviesCardList = () => {
  return (
    <section className="movies-card-list">
      <MoviesCard />
    </section>
  );
}

export default MoviesCardList;