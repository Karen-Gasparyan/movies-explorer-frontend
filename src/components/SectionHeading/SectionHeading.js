import React from 'react';

import './SectionHeading.css';

const SectionHeading = ({ id, title }) => {
  return (
    <header className="section-heading" id={id}>
      <h2 className="section-heading__title">{title}</h2>
      <div className="section-heading__decoration-line"></div>
    </header>
  );
}

export default SectionHeading;