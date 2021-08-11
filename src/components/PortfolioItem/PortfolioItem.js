import React from 'react';

import './PortfolioItem.css';

const PortfolioItem = ({ url, title }) => {
  return (
    <li className="portfolio-item">
      <a className="portfolio-item__link"
          href={url}
          rel="noreferrer"
          target="_blank">
            {title}
          <span className="portfolio-item__link-icon"></span>
        </a>
    </li>
  );
}

export default PortfolioItem;