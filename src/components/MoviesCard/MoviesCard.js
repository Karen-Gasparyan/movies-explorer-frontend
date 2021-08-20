import React, { useState } from 'react';

import './MoviesCard.css';

const MoviesCard = (
  { values: { nameRU, duration, image },
    favoritesIcon: { active, disabled, title },
    favoriteButton
  }) => {

    const getTimeFormat = (mins) => {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return (hours + 'ч ') + (minutes + 'м');
  };

  const [favoriteMovie, setFavoriteMovie] = useState(false);

  const handleChangeFavoriteMovie = (e) => {
    setFavoriteMovie(!favoriteMovie);
    favoriteButton(e);
  }

  return (
    <article className="movies-card">
      <header className="movies-card__header">
        <div className="movies-card__header-container">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{getTimeFormat(duration)}</p>
        </div>
        <button 
          className={`movies-card__favorite-icon ${favoriteMovie ? active: disabled}`}
          type="button"
          onClick={handleChangeFavoriteMovie}
          aria-label={title}
          title={title} >
        </button>
      </header>
      <img className="movies-card__poster"
        src={image} alt={`Постер к фильму ${image}`} />
    </article>
  );
}

export default MoviesCard;