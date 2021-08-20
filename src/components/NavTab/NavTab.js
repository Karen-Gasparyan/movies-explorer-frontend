import React from 'react';
import { Link } from "react-scroll";

import './NavTab.css';

const NavTab = () => {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list-items">
        <li className="nav-tab__item">
          <Link className="nav-tab__item-link"
            to="about-project"
            smooth={true}
            offset={-28}
            duration={500}>О проекте
          </Link>
        </li>
        <li className="nav-tab__item">
          <Link className="nav-tab__item-link"
            to="technology"
            smooth={true}
            offset={-28}
            duration={500}>Технологии
          </Link>
        </li>
        <li className="nav-tab__item">
          <Link className="nav-tab__item-link"
            to="student"
            smooth={true}
            offset={-28}
            duration={500}>Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;