import React from 'react';

import './AuthInput.css';

const AuthInput = (
  { id,
    name,
    label,
    type,
    minLength,
    onFocus,
    value,
    onChange
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
        onFocus={ onFocus }
        value={ value }
        onChange={ onChange } />
    </>
  );
}

export default AuthInput;