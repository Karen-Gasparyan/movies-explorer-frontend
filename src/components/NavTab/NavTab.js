import React from 'react';
import { Link } from 'react-router-dom';

import './NavTab.css';

const NavTab = () => {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list-items">
        <li className="nav-tab__item">
          <Link to="/" className="nav-tab__item-link">О проекте</Link>
        </li>
        <li className="nav-tab__item">
          <Link to="/" className="nav-tab__item-link">Технологии</Link>
        </li>
        <li className="nav-tab__item">
          <Link to="/" className="nav-tab__item-link">Студент</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;