import React from 'react';

import './TechnologyItem.css';

const TechnologyItem = ({ url, title }) => {
  return (
    <li className="technology-item">
      <a className="technology-item__link"
        rel="noreferrer"
        href={url} target="_blank">{title}
      </a>
    </li>
  );
}

export default TechnologyItem;