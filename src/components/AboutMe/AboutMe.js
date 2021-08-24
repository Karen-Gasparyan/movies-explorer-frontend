import React from 'react';

import './AboutMe.css';
import UserPhoto from '../../images/user-photo.jpg';

import SectionHeading from '../SectionHeading/SectionHeading';
import SocialNetwork from '../SocialNetwork/SocialNetwork';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <section className="about-me">
      <SectionHeading
        id={'student'}
        title={'Студент'} />

      <article className="about-me__content">
        <header className="about-me__header">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__about">Фронтенд-разработчик, 30 лет</p>
        </header>

        <p className="about-me__summary">
          Я родился и живу в Саратове, закончил факультет экономики СГУ.
          У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке,
          начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>

        <img className="about-me__photo"
          src={UserPhoto} alt="Фото пользователя" />

        <ul className="about-me__networks-list">
          <li>
            <SocialNetwork
              url={'https://www.facebook.com'}
              title={'Facebook'} />
          </li>
          <li>
            <SocialNetwork
            url={'https://github.com/Karen-Gasparyan'}
            title={'Github'} />
          </li>
        </ul>
      </article>
      
      <Portfolio />
    </section>
  );
}

export default AboutMe;