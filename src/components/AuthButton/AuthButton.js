import React from 'react';

import './AuthButton.css';

const AuthButton = ({ text, formValid }) => {

  return (
    <button
      className={ formValid ? "auth-button" : "auth-button button-disabled" }
      type="submit"
      disabled={ !formValid } >
      { text }
    </button>
  );
}

export default AuthButton;