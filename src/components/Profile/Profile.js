import React from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

const Profile = () => {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <div className="profile__user-data">
        <div className="profile__user-name">
          <span className="profile__font-weight">Имя</span>
          <span>Виталий</span>
        </div>
        <div className="profile__user-email">
          <span className="profile__font-weight">Почта</span>
          <span>pochta@yandex.ru</span>
        </div>
      </div>

      <ul className="profile__list-items">
        <li className="profile__item">
          <Link to="#"
            className="profile__edit-link">
              Редактировать
          </Link>
        </li>
        <li className="profile__item">
          <Link to="#"
            className="profile__signout-link">
              Выйти из аккаунта
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Profile;