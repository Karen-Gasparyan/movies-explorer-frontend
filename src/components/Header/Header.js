import React from 'react';

import './Header.css';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import RegisterButton from '../RegisterButton/RegisterButton';
import LoginButton from '../LoginButton/LoginButton';

const Header = ({ loggedIn, isOpen, openNavigation, closeNavigation }) => {
  return (
    <header className="header">
      <Logo />
      {loggedIn ?
        <BurgerMenu
          openNavigation={openNavigation} /> :
        (<ul className="header__buttons-list">
          <li className="header__item"><RegisterButton /></li>
          <li className="header__item"><LoginButton /></li>
        </ul>)
      }
      {loggedIn ? <Navigation
        isOpen={isOpen}
        closeNavigation={closeNavigation} /> : ''}
    </header>
  );
}

export default Header;