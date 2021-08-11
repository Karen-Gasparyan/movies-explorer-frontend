import React from 'react';

import './SocialNetwork.css';

const SocialNetwork = ({ url, title }) => {
  return (
    <a className="social-network__link"
       rel="noreferrer"
       href={url} target="_blank">{title}
    </a>
  );
}

export default SocialNetwork;