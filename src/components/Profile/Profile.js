import React, { useState } from 'react';

import './Profile.css';

import Header from '../Header/Header';
import ProfileSubmitButton from '../ProfileSubmitButton/ProfileSubmitButton';

const Profile = (
  { currentUserName,
    currentUserEmail,
    signout,
    
    loggedIn,
    isOpen,
    openNavigation,
    closeNavigation
  }) => {

  const [inputActive, setInputActive] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const allowUpdatingUserData = () => {
    setInputActive(true);
  }

  const handleUpdateUserData = () => {
    console.log('User data saved')
    setInputActive(false);
  }

  const cancelUpdatingUserData = () => {
    setInputActive(false);
  }

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isOpen={isOpen}
        openNavigation={openNavigation}
        closeNavigation={closeNavigation} />
        
      <form className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <div className="profile__user-data">
          <div className="profile__user-name">
            <span className="profile__font-weight">Имя</span>
            {inputActive ? 
            <input className="profile__user-data-input-name"
              autoComplete="off"
              name="name"
              placeholder="Введите имя"
              autoFocus />
            :
            (<span>{currentUserName}</span>)}
          </div>
          <div className="profile__user-email">
            <span className="profile__font-weight">Почта</span>
            {inputActive ?
            <input className="profile__user-data-input-email"
              autoComplete="off"
              name="email"
              placeholder="Введите email" />
            :
            (<span>{currentUserEmail}</span>)}
          </div>
        </div>

        {inputActive ? 
        <ul className="profile__list-items">
          <li className="profile__item">
            <ProfileSubmitButton
              handleUpdateUserData={handleUpdateUserData}
              submitButtonDisabled={submitButtonDisabled} />
          </li>
          <li className="profile__item">
            <button
              className="profile__signout-button"
              type="button"
              onClick={cancelUpdatingUserData}>
                Отменить
            </button>
          </li>
        </ul> :
        <ul className="profile__list-items">
          <li className="profile__item">
            <button
              className="profile__edit-button"
              type="button"
              onClick={allowUpdatingUserData}>
                Редактировать
            </button>
          </li>
          <li className="profile__item">
            <button
              className="profile__signout-button"
              type="button"
              onClick={signout}>
                Выйти из аккаунта
            </button>
          </li>
        </ul>}
      </form>
    </>
  );
}

export default Profile;