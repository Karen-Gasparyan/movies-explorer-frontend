import React from 'react';

import './Main.css';

import Header from '../Header/Header';

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
        
    </>
  );
}

export default Main;