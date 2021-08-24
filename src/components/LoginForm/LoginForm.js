import React from 'react';

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
    userPasswordHandler,
    userEmailError,
    userPasswordError,
    handleSubmitLogin
}) => {

  return (
    <form
      className="auth-form"
      name="login"
      onSubmit={handleSubmitLogin} >
      <div className="auth-form_input-wrapper login-form_input-wrapper">
        <AuthInput
          id={'user-email'}
          name={'email'}
          label={'E-mail'}
          type={'email'}
          placeholder={''}
          onFocus={ focusHandler }
          value={ userEmail }
          onChange={ userEmailHandler }
          errorText={ userEmailError }
          errorMessage={errorMessage} />

        <AuthInput
          id={'user-password'}
          name={'password'}
          label={'Пароль'}
          type={'password'}
          placeholder={''}
          minLength={ 8 }
          onFocus={ focusHandler }
          value={ userPassword }
          onChange={ userPasswordHandler }
          errorText={ userPasswordError }
          errorMessage={errorMessage} />
          
        <span className="auth-error-message">{ errorMessage }</span>
      </div>
        <AuthButton
          text={'Войти'}
          formValid={ formValid } />
    </form>
  );
}

export default LoginForm;