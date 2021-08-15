import React from 'react';

import './LoadMoreButton.css';
import '../../mixins/display-none.css';

const LoadMoreButton = ({ disabled, title, loadMoreCards }) => {
  return (
    <button
      className={disabled ? "display-none" : "load-more-button"}
      type="button"
      disabled={disabled}
      onClick={loadMoreCards}>
        {title}
    </button>
  );
}

export default LoadMoreButton;