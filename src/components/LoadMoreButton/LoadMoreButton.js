import React from 'react';

import './LoadMoreButton.css';

const LoadMoreButton = (
  { disabled,
    title,
    loadMoreCards,
    spinner,
    buttonName
  }) => {

  return (
    <button
      className={(disabled || spinner) ? "display-none" : "load-more-button"}
      type="button"
      name={buttonName}
      disabled={disabled}
      onClick={loadMoreCards}>
        {title}
    </button>
  );
}

export default LoadMoreButton;