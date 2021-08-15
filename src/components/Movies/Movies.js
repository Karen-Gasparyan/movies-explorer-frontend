import React from 'react';

import './Movies.css';
import '../../mixins/movies-pages.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

const Movies = (props) => {
  const { cards, moreButtonActive, loadMoreCards, favoritesIcon } = props;

  return (
    <section className="movies-pages movies">
      <SearchForm 
        placeholder={'Фильм'}
        buttonText={'Найти'} />
      <MoviesCardList
        component={LoadMoreButton}
        cards={cards}
        moreButtonActive={moreButtonActive}
        loadMoreCards={loadMoreCards}
        favoritesIcon={favoritesIcon} />
    </section>
  );
}

export default Movies;