import React from 'react';

import './MessagePopup.css';

import doneIcon from '../../images/infoTooltip-done.svg';
import errorIcon from '../../images/infoTooltip-error.svg';

function MessagePopup({title, isOpen, icon}) {
  return (
    <div className={`message-popup ${isOpen ? 'message-popup-opened' : ''}`}>
      <div className="message-popup__container">
        <img className="message-popup__icon"
          src={icon ? doneIcon : errorIcon}
          alt={icon ? 'Успешно' : 'Ошибка'} />
          <h2 className="message-popup__title">{title}</h2>
      </div>
    </div>
  );
};

export default MessagePopup;