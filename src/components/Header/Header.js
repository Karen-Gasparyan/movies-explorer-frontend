import React from 'react';

import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

const Header = () => {

  return (
    <header className="header">
      <Logo />
      <button className="header__menu-button"></button>
      <Navigation />
    </header>
  );
}

export default Header;