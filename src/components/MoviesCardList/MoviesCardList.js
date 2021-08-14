import React, { useState, useEffect, useCallback } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

const MoviesCardList = ({cards}) => {
  const [initialCards, setInitialCards] = useState([])
  const [loadMoreButtonActive, setLoadMoreButtonActive] = useState(false)

  const [mobileCards, setMobileCards] = useState(5);
  const [tabletCards, setTabletCards] = useState(8);
  const [desctopCards, setDesctopCards] = useState(12);

  const loadMoreCards = () => {
    setMobileCards(mobileCards + 3);
    setTabletCards(tabletCards + 6);
    setDesctopCards(desctopCards + 9);
  }

  const changeCardValues = useCallback(() => {
    if (window.innerWidth >= 320 && window.innerWidth < 768) {
      setInitialCards(cards.slice(0, mobileCards));
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      setInitialCards(cards.slice(0, tabletCards));
    } else if (window.innerWidth >= 1280) {
      setInitialCards(cards.slice(0, desctopCards));
    }
  }, [cards, mobileCards, tabletCards, desctopCards]);

  window.onresize = () => {
    changeCardValues();
  }

  useEffect(() => {
    changeCardValues();

    if (initialCards.length >= cards.length) {
      setLoadMoreButtonActive(true);
    }

  }, [changeCardValues, initialCards.length, cards.length]);

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__items">
        {initialCards.map(values => 
          (<MoviesCard
            key={values.id}
            values={values} />)
        )}
      </div>
      <div className="movies-card-list__auxiliary-panel">
        <LoadMoreButton
          disabled={loadMoreButtonActive}
          title={'Ещё'}
          loadMoreCards={loadMoreCards} />
      </div>
    </section>
  );
}

export default MoviesCardList;