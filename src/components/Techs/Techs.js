import React from 'react';

import './Techs.css';
import SectionHeading from '../SectionHeading/SectionHeading';
import TechnologyTable from '../TechnologyTable/TechnologyTable';

const Techs = () => {
  return (
    <div className="techs">
      <section className="techs__container">
        <SectionHeading
          id="technology"
          title={"Технологии"} />
        <article className="techs__content">
          <h3 className="techs__content-title">7 технологий</h3>
          <p  className="techs__content-subtitle">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
          <TechnologyTable />
        </article>
      </section>
    </div>
  );
}

export default Techs;