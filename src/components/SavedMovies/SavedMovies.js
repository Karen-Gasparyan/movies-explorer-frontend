import React from 'react';

import './SavedMovies.css';
import '../../mixins/movies-pages.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = (props) => {
  const { cards, favoritesIcon } = props;

  return (
    <section className="movies-pages saved-movies">
      <SearchForm 
        placeholder={'Фильм'}
        buttonText={'Найти'} />
      <MoviesCardList
        cards={cards}
        favoritesIcon={favoritesIcon} />
    </section>
  );
}

export default SavedMovies;