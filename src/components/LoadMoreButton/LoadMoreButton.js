import React from 'react';

import './LoadMoreButton.css';
import '../../mixins/display-none.css';

const LoadMoreButton = (
  { disabled,
    title,
    loadMoreCards,
    spinner
  }) => {
  return (
    <button
      className={(disabled || spinner) ? "display-none" : "load-more-button"}
      type="button"
      disabled={disabled}
      onClick={loadMoreCards}>
        {title}
    </button>
  );
}

export default LoadMoreButton;