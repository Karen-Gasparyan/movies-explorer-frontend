import React from 'react';

import './MoviesCard.css';

const MoviesCard = ({values}) => {
  const {nameRU, duration, image} = values;

  function getTimeFormat(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return (hours + 'ч ') + (minutes + 'м');
  };

  return (
    <article className="movies-card">
      <header className="movies-card__header">
        <div className="movies-card__header-container">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{getTimeFormat(duration)}</p>
        </div>
        <button 
          className="movies-card__favorite-icon"
          type="button"
          aria-label="Кнопка - добавить в избранное"
          title="В избранное">
        </button>
      </header>
      <img className="movies-card__poster"
        src={image} alt={`Постер к фильму ${image}`} />
    </article>
  );
}

export default MoviesCard;