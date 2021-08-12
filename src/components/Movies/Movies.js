import React from 'react';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';

const Movies = () => {
  return (
    <section className="movies">
      <SearchForm 
        placeholder={'Фильм'}
        buttonText={'Найти'} />
    </section>
  );
}

export default Movies;