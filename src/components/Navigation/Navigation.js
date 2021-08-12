import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';
import '../../mixins/visible-navigation.css'

const Navigation = ({ isOpen, closeNavigation }) => {
  return (
    <nav className={`navigation ${isOpen ? 'visible-navigation' : ''}`}>
      <div className="navigation__content">
        <div className="navigation__items-container">
          <button
            type="button"
            onClick={closeNavigation}
            className="navigation__close-button">
          </button>
          <ul className="navigation__items-list">
            <li className="navigation__item home-page">
              <Link to="/" className="navigation__item-link">Главная</Link>
            </li>
            <li className="navigation__item">
              <Link to="" className="navigation__item-link">Фильмы</Link>
            </li>
            <li className="navigation__item">
              <Link to="" className="navigation__item-link">Сохранённые фильмы</Link>
            </li>
          </ul>
        </div>

        <div className="navigation__item user-account-item">
          <Link to="/profile" className="navigation__item-link">
            Аккаунт
            <span className="navigation__user-account-icon"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;