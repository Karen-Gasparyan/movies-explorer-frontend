import React from 'react';

import './Main.css';

import Header from '../Header/Header';
import Promo from '../Promo/Promo';

const Main = ({
  loggedIn,
  isOpen,
  openNavigation,
  closeNavigation
}) => {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isOpen={isOpen}
        openNavigation={openNavigation}
        closeNavigation={closeNavigation} />
        
      <main className="main">
        <Promo />
      </main>
    </>
  );
}

export default Main;