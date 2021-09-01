import React from 'react';

import './MoviesCard.css';

const MoviesCard = (
  { movieValues,
    favoriteMovies = [],
    favoritesIcon: { active, disabled, title },
    favoriteButton,
    getTimeFormat
  }) => {

  let {
    nameRU,
    duration,
    image: { url },
    thumbnail,
    id,
    trailerLink,
    trailer
  } = movieValues;
  
  if(!trailerLink) {
    trailerLink = 'https://youtu.be/0MnNfcDX0Yw';
  }

  const favoriteMoviesIds = favoriteMovies.map(({movieId}) => movieId)
  const added = favoriteMoviesIds.some(haveId => haveId === id)

  const handleChangeFavoriteMovie = (e) => {
    favoriteButton(movieValues);
  }

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