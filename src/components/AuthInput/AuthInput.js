import React from 'react';

import './AuthInput.css';

const AuthInput = ({
  id,
  name,
  label,
  type,
  minLength,
  error
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
        minLength={ minLength }
      />
      <span className="auth-error-message">{ error }</span>
    </>
  );
}

export default AuthInput;