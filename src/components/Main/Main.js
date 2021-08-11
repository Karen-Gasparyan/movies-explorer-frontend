import React from 'react';

import './Main.css';

// import Header from '../Header/Header';
// import Promo from '../Promo/Promo';
// import AboutProject from '../AboutProject/AboutProject';
// import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

const Main = ({
  loggedIn,
  isOpen,
  openNavigation,
  closeNavigation
}) => {
  return (
    <>
      {/* <Header
        loggedIn={loggedIn}
        isOpen={isOpen}
        openNavigation={openNavigation}
        closeNavigation={closeNavigation} /> */}
        
      <main className="main">
        {/* <Promo /> */}
        {/* <AboutProject /> */}
        {/* <Techs /> */}
        <AboutMe />
      </main>
    </>
  );
}

export default Main;