import React from 'react';

import './NavTab.css';

const NavTab = () => {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list-items">
        <li className="nav-tab__item">
          <a href="#" className="nav-tab__item-link">О проекте</a>
        </li>
        <li className="nav-tab__item">
          <a href="#" className="nav-tab__item-link">Технологии</a>
        </li>
        <li className="nav-tab__item">
          <a href="#" className="nav-tab__item-link">Студент</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;