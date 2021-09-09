import React from 'react';

import './RegisterForm.css';

import AuthInput from '../AuthInput/AuthInput';
import AuthButton from '../AuthButton/AuthButton';

const RegisterForm = (
  { name,
    email,
    password,
    errorMessage,
    formValid,
    focusHandler,
    userNameHandler,
    userEmailHandler,
    userPasswordHandler,
    userNameError,
    userEmailError,
    userPasswordError,
    handleSubmitRegister
  }) => {

  return (
    <form 
      className="auth-form"
      name="register"
      onSubmit={handleSubmitRegister} >
      <div className="auth-form_input-wrapper register-form_input-wrapper">
        <AuthInput
          id={'user-name'}
          name={'name'}
          label={'Имя'}
          type={'text'}
          placeholder={''}
          minLength={ 2 }
          maxLength={ 30 }
          onFocus={ focusHandler }
          value={ name }
          onChange={ userNameHandler }
          errorText={ userNameError }
          errorMessage={errorMessage} />

        <AuthInput
          id={'user-email'}
          name={'email'}
          label={'E-mail'}
          type={'email'}
          placeholder={''}
          onFocus={ focusHandler }
          value={ email }
          onChange={ userEmailHandler }
          errorText={ userEmailError }
          errorMessage={errorMessage} />

        <AuthInput
          id={'user-password'}
          name={'password'}
          label={'Пароль'}
          type={'password'}
          minLength={ 8 }
          placeholder={''}
          onFocus={ focusHandler }
          value={ password }
          onChange={ userPasswordHandler }
          errorText={ userPasswordError }
          errorMessage={errorMessage} />

        <span className="auth-error-message">{ errorMessage }</span>
      </div>
        <AuthButton
          text={'Зарегистрироваться'}
          formValid={ formValid } />
    </form>
  );
}

export default RegisterForm;