import React from 'react';

import './MoviesCard.css';
import moviePoster from '../../images/poster-1.jpg';

const MoviesCard = ({
  movieTitle,
  movieDuration
}) => {
  return (
    <>
    <article className="movies-card">
      <header className="movies-card__header">
        <div className="movies-card__header-container">
          <h2 className="movies-card__title">{'33 слова о дизайне'}</h2>
          <p className="movies-card__duration">{'1ч 47м'}</p>
        </div>
        <div className="movies-card__favorite-icon"></div>
      </header>
      <img className="movies-card__poster"
        src={moviePoster} alt={`Постер к фильму ${movieTitle}`} />
    </article>
    </>
  );
}

export default MoviesCard;