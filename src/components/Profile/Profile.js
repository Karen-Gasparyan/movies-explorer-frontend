import React, { useState } from 'react';

import './Profile.css';

import Header from '../Header/Header';
import ProfileSubmitButton from '../ProfileSubmitButton/ProfileSubmitButton';

const Profile = (
  { currentUserName,
    currentUserEmail,
    currentUserNameHandler,
    currentUserEmailHandler,
    formValid,
    signout,
    loggedIn,
    isOpen,
    openNavigation,
    closeNavigation,
    handleSubmitUserData
  }) => {

  const [inputActive, setInputActive] = useState(false);

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
      <form
        className="profile"
        name="user-profile-form"
        onSubmit={handleSubmitUserData} >
        <h2 className="profile__title">Привет, Виталий!</h2>
        <div className="profile__user-data">
          <div className="profile__user-name">
            <label
              className="profile__font-weight"
              htmlFor="current-user-name" >
                Имя
            </label>
            {inputActive ? 
            <input className="profile__user-data-input-name"
              id="current-user-name"
              autoComplete="off"
              type="text"
              required
              minLength={2}
              name="current-user-name"
              placeholder="Введите имя"
              value={currentUserName}
              onChange={currentUserNameHandler}
              autoFocus />
            :
            (<span>{currentUserName}</span>)}
          </div>
          <div className="profile__user-email">
            <label
              className="profile__font-weight"
              htmlFor="current-user-email" >
                Почта
            </label>
            {inputActive ?
            <input className="profile__user-data-input-email"
              id="current-user-email"
              type="email"
              required
              autoComplete="off"
              name="current-user-email"
              placeholder="Введите email"
              value={currentUserEmail}
              onChange={currentUserEmailHandler} />
            :
            (<span>{currentUserEmail}</span>)}
          </div>
        </div>

        {inputActive ? 
        <ul className="profile__list-items">
          <li className="profile__item">
            <ProfileSubmitButton
              handleUpdateUserData={handleUpdateUserData}
              formValid={formValid} />
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