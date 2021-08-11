import React from 'react';

import './Portfolio.css';

import PortfolioItem from '../PortfolioItem/PortfolioItem';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list-items">
        <PortfolioItem 
          url={'ya.ru'}
          title={'Статичный сайт'} />
        <PortfolioItem 
          url={'ya.ru'}
          title={'Адаптивный сайт'} />
        <PortfolioItem 
          url={'ya.ru'}
          title={'Одностраничное приложение'} />
      </ul>
    </section>
  );
}

export default Portfolio;