import React from 'react';

import './AuthButton.css';

const AuthButton = ({ text }) => {

  return (
    <button
      className="auth-button"
      type="submit" >
      { text }
    </button>
  );
}

export default AuthButton;