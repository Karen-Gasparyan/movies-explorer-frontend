import React from 'react';

import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = () => {
  return (
    <section>
      <SearchForm 
        placeholder={'Фильм'}
        buttonText={'Найти'} />
      <MoviesCardList />
    </section>
  );
}

export default SavedMovies;