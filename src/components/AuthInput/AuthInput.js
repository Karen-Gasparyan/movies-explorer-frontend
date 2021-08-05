import React from 'react';

import './AuthInput.css';

const AuthInput = ({
  id,
  name,
  label,
  type,
  minLength
}) => {

  return (
    <>
      <label
        className="auth-label"
        htmlFor={ id } >{ label }
      </label>
      <input
        required
        id={ id }
        name={ name }
        className="auth-input"
        autoComplete="off"
        type={ type }
        minLength={ minLength } />
    </>
  );
}

export default AuthInput;