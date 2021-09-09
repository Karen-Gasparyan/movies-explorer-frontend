import React from 'react';

import './Profile.css';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import Header from '../Header/Header';
import ProfileSubmitButton from '../ProfileSubmitButton/ProfileSubmitButton';

const Profile = (
  { userName,
    userEmail,
    currentUserNameHandler,
    currentUserEmailHandler,
    formValid,
    signout,
    loggedIn,
    isOpen,
    openNavigation,
    closeNavigation,
    handleUpdateUserProfile,
    userProfileInputActive,
    allowUpdatingUserData,
    cancelUpdatingUserData
  }) => {

  const currentUser = React.useContext(CurrentUserContext);

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
        onSubmit={handleUpdateUserProfile} >
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <div className="profile__user-data">
          <div className="profile__user-name">
            <label
              className="profile__font-weight"
              htmlFor="current-user-name" >
                Имя
            </label>
            {userProfileInputActive ? 
            <input className="profile__user-data-input-name"
              id="current-user-name"
              autoComplete="off"
              type="text"
              required
              minLength={2}
              name="current-user-name"
              placeholder="Введите имя"
              value={userName}
              onChange={currentUserNameHandler}
              autoFocus />
            :
            (<span>{currentUser.name}</span>)}
          </div>
          <div className="profile__user-email">
            <label
              className="profile__font-weight"
              htmlFor="current-user-email" >
                Почта
            </label>
            {userProfileInputActive ?
            <input className="profile__user-data-input-email"
              id="current-user-email"
              type="email"
              required
              autoComplete="off"
              name="current-user-email"
              placeholder="Введите email"
              value={userEmail}
              onChange={currentUserEmailHandler} />
            :
            (<span>{currentUser.email}</span>)}
          </div>
        </div>

        {userProfileInputActive ? 
        <ul className="profile__list-items">
          <li className="profile__item">
            <ProfileSubmitButton formValid={formValid} />
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