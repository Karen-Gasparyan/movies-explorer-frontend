import React from 'react';

import './AboutProject.css';

import SectionHeading from '../SectionHeading/SectionHeading';

const AboutProject = () => {
  return (
    <article className="about-project">
      <SectionHeading value={"О проекте"} />
      <div className="about-project__contents-container">
        <section className="about-project__content-section">
          <h3 className="about-project__conditions-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__conditions-subtitle">
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </section>
        
        <section className="about-project__content-section">
          <h3 className="about-project__conditions-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__conditions-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </section>
      </div>

      <ul className="about-project__table">
        <li>
          <ul className="about-project__table-list">
            <li className="about-project__table-title about-project__table-title_colored">1 неделя</li>
            <li className="about-project__table-subtitle">Back-end</li>
          </ul>
        </li>

        <li>
          <ul className="about-project__table-list">
            <li className="about-project__table-title">4 недели</li>
            <li className="about-project__table-subtitle">Front-end</li>
          </ul>
        </li>
      </ul>
    </article>
  );
}

export default AboutProject;