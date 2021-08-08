import React from 'react';

import './SectionHeading.css';

const SectionHeading = ({ value }) => {
  return (
    <>
      <h2 className="section-heading">{value}</h2>
      <div className="section-heading__decoration-line"></div>
    </>
  );
}

export default SectionHeading;