import React from 'react';

import '../../mixins/auth-forms.css'
import './RegisterForm.css';

import AuthInput from '../AuthInput/AuthInput';
import AuthButton from '../AuthButton/AuthButton';

const RegisterForm = (
  { userName,
    userEmail,
    userPassword,
    errorMessage,
    formValid,
    focusHandler,
    userNameHandler,
    userEmailHandler,
    userPasswordHandler
  }) => {

  return (
    <form 
      className="auth-form"
      name="register">
      <div className="auth-form_input-wrapper register-form_input-wrapper">
        <AuthInput
          id={'user-name'}
          name={'name'}
          label={'Имя'}
          type={'text'}
          minLength={ 2 }
          maxLength={ 30 }
          onFocus={ focusHandler }
          value={ userName }
          onChange={ userNameHandler } />

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
          text={'Зарегистрироваться'}
          formValid={ formValid } />
    </form>
  );
}

export default RegisterForm;