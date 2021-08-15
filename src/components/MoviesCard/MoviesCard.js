import React, { useState } from 'react';

import './MoviesCard.css';
import '../../mixins/favorite-icon-disabled.css';
import '../../mixins/favorite-icon-active.css';
import '../../mixins/favorite-icon-remove.css';

const MoviesCard = ({values, favoritesIcon}) => {
  const { nameRU, duration, image } = values;
  const { active, disabled, title } = favoritesIcon;
  
  const [favoriteMovie, setFavoriteMovie] = useState(false);

  const getTimeFormat = (mins) => {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return (hours + 'ч ') + (minutes + 'м');
  };

  const handleChangeFavoriteMovie = () => {
    setFavoriteMovie(!favoriteMovie);
  }

  return (
    <article className="movies-card">
      <header className="movies-card__header">
        <div className="movies-card__header-container">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{getTimeFormat(duration)}</p>
        </div>
        <button 
          className={`movies-card__favorite-icon ${disabled} ${favoriteMovie ? active: ""}`}
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