import React from 'react';

import './BurgerMenu.css';

const BurgerMenu = ({ openNavigation }) => {
  return (
    <button
      type="button"
      onClick={ openNavigation }
      className="burger-menu-button">
    </button>
  );
}

export default BurgerMenu;