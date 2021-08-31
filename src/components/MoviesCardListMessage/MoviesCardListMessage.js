import React from 'react';

import './MoviesCardListMessage.css';

const MoviesCardListMessage = ({message}) => {
  return (
    <span className="movies-card-list-message">{message}</span>
  );
};

export default MoviesCardListMessage;