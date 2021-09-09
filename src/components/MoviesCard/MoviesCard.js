import React from 'react';

import './MoviesCard.css';

const MoviesCard = (
  { movieValues,
    favoritesIcon: { active, disabled, title },
    favoriteButton,
    getTimeFormat,
    favoriteMovies,
  }) => {

  const {
    nameRU,
    duration,
    image: { url },
    thumbnail,
    id,
    trailerLink,
    trailer
  } = movieValues;

  const loadState = (state) => {
    try {
      const initialMoviesState = localStorage.getItem(state);
        if(initialMoviesState === null){
          return undefined;
        }
        return JSON.parse(initialMoviesState);
    } catch (err) {
        return undefined;
    };
  };

  const favoritMoviesState = loadState('favorite-movies');

  const getFavoriteResult = () => {
    if(favoriteMovies !== undefined) {
      return favoriteMovies;
    }
    return favoritMoviesState;
  };

  const favoriteMoviesIds = getFavoriteResult().map(({movieId}) => movieId)
  const added = favoriteMoviesIds.some(haveId => haveId === id)

  const handleChangeFavoriteMovie = () => {
    favoriteButton(movieValues);
  };

  return (
    <article className="movies-card">
      <header className="movies-card__header">
        <div className="movies-card__header-container">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{getTimeFormat(duration)}</p>
        </div>
        <button 
          className={`movies-card__favorite-icon ${added ? active: disabled}`}
          type="button"
          onClick={handleChangeFavoriteMovie}
          aria-label={title}
          title={title} >
        </button>
      </header>
      <a href={trailerLink || trailer} target='_blank' rel="noreferrer" >
        <img
          className="movies-card__poster"
          src={url ? `https://api.nomoreparties.co${url}` : thumbnail}
          alt={url ? `https://api.nomoreparties.co${url}` : thumbnail} />
      </a>
      
    </article>
  );
}

export default MoviesCard;