import React from 'react';
import { Link } from 'react-router-dom';


import './Promo.css';

const Promo = () => {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <ul className="promo__list-items">
        <li className="promo__item">
          <Link to="#" className="promo__item-link">О проекте</Link>
        </li>
        <li className="promo__item">
          <Link to="#" className="promo__item-link">Технологии</Link>
        </li>
        <li className="promo__item">
          <Link to="#" className="promo__item-link">Студент</Link>
        </li>
      </ul>
    </section>
  );
}

export default Promo;