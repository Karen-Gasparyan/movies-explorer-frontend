import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';

const Navigation = () => {
  return (
    <div className="navigation">
      <button className="navigation__close-button">X</button>
        <ul className="navigation__items-list">
          <li className="navigation__item home-page">
            <Link to="" className="navigation__item-link">Главная</Link>
          </li>
          <li className="navigation__item">
            <Link to="" className="navigation__item-link">Фильмы</Link>
          </li>
          <li className="navigation__item">
            <Link to="" className="navigation__item-link">Сохранённые фильмы</Link>
          </li>
          <li className="navigation__item user-account-item">
            <Link to="" className="navigation__item-link">
              <span>Аккаунт</span>
              <span className="navigation__user-account-icon"></span>
            </Link>
          </li>
        </ul>
    </div>
  );
}

export default Navigation;