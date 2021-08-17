import React from 'react';

import './Movies.css';
import '../../mixins/movies-pages.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import Footer from '../Footer/Footer';

const Movies = (
  { cards,
    moreButtonActive,
    loadMoreCards,
    favoritesIcon,

    loggedIn,
    isOpen,
    openNavigation,
    closeNavigation
  }) => {

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isOpen={isOpen}
        openNavigation={openNavigation}
        closeNavigation={closeNavigation} />
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
      <Footer />
    </>
  );
}

export default Movies;