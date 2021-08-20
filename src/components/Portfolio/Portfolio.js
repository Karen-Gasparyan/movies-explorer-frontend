import React from 'react';

import './Portfolio.css';

import PortfolioItem from '../PortfolioItem/PortfolioItem';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list-items">
        <PortfolioItem 
          url={'https://github.com/Karen-Gasparyan/how-to-learn.git'}
          title={'Статичный сайт'} />
        <PortfolioItem 
          url={'https://github.com/Karen-Gasparyan/russian-travel.git'}
          title={'Адаптивный сайт'} />
        <PortfolioItem 
          url={'https://github.com/Karen-Gasparyan/react-mesto-auth.git'}
          title={'Одностраничное приложение'} />
      </ul>
    </section>
  );
}

export default Portfolio;