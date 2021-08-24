import React from 'react';

import './Footer.css';

import SocialNetwork from '../SocialNetwork/SocialNetwork';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content-container">
        <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__decoration-line"></div>

        <div className="footer__content">
          <ul className="footer__list-items">
            <li className="footer__list-item">
              <SocialNetwork 
                url={'https://practicum.yandex.ru'}
                title={'Яндекс.Практикум'} />
            </li>
            <li className="footer__list-item">
              <SocialNetwork 
                url={'https://github.com'}
                title={'Github'} />
            </li>
            <li className="footer__list-item">
              <SocialNetwork 
                url={'https://www.facebook.com'}
                title={'Facebook'} />
            </li>
          </ul>
          <p className="footer__copyright">©2021</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;