import React from 'react';
import './AuthForm.css';

import AuthInput from '../AuthInput/AuthInput';

const AuthForm = () => {

  return (
    <form className="auth-form">
      <AuthInput />
      <AuthInput />
      <AuthInput />
    </form>
  );
}

export default AuthForm;