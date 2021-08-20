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
    onChange,
    errorText,
    errorMessage,
    placeholder
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
        className={ (errorText && errorMessage) ? "auth-input auth-input-error" : "auth-input" }
        autoComplete="off"
        placeholder={placeholder}
        type={ type }
        minLength={ minLength }
        onFocus={ onFocus }
        value={ value }
        onChange={ onChange } />
    </>
  );
}

export default AuthInput;