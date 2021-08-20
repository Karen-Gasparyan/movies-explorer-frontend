import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';

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
              <Link className="navigation__item-link"
                to="/"
                onClick={closeNavigation}>Главная
              </Link>
            </li>
            <li className="navigation__item">
              <Link className="navigation__item-link"
                to="/movies"
                onClick={closeNavigation}>Фильмы
              </Link>
            </li>
            <li className="navigation__item">
              <Link className="navigation__item-link"
                to="/saved-movies"
                onClick={closeNavigation}>Сохранённые фильмы
              </Link>
            </li>
          </ul>
        </div>

        <div className="navigation__item user-account-item">
          <Link className="navigation__item-link"
            to="/profile"
            onClick={closeNavigation}>Аккаунт
            <span className="navigation__user-account-icon"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;