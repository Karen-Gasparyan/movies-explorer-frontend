import React from 'react';

import '../../mixins/auth-forms.css'
import './LoginForm.css';

import AuthInput from '../AuthInput/AuthInput';
import AuthButton from '../AuthButton/AuthButton';

const LoginForm = (
  { userEmail,
    userPassword,
    errorMessage,
    formValid,
    focusHandler,
    userEmailHandler,
    userPasswordHandler
}) => {

  return (
    <form
      className="auth-form"
      name="login">
      <div className="auth-form_input-wrapper login-form_input-wrapper">
        <AuthInput
          id={'user-email'}
          name={'email'}
          label={'E-mail'}
          type={'email'}
          onFocus={ focusHandler }
          value={ userEmail }
          onChange={ userEmailHandler } />
        <AuthInput
          id={'user-password'}
          name={'password'}
          label={'Пароль'}
          type={'password'}
          minLength={ 8 }
          onFocus={ focusHandler }
          value={ userPassword }
          onChange={ userPasswordHandler } />
        <span className="auth-error-message">{ errorMessage }</span>
      </div>
        <AuthButton
          text={'Войти'}
          formValid={ formValid } />
    </form>
  );
}

export default LoginForm;