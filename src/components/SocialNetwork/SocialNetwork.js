import React from 'react';

import './SocialNetwork.css';

const SocialNetwork = ({ url, title }) => {
  return (
    <li className="social-network">
      <a className="social-network__link"
        rel="noreferrer" 
        href={url} target="_blank">{title}</a>
    </li>
  );
}

export default SocialNetwork;