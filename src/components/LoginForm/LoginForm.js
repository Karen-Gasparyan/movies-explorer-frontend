import React from 'react';

import './LoginForm.css';
import AuthInput from '../AuthInput/AuthInput';
import AuthButton from '../AuthButton/AuthButton';

const LoginForm = () => {

  return (
    <form
      className="login-form"
      name="login">
      <div className="login-form_input-wrapper">
        <AuthInput
          id={'userEmail'}
          name={'email'}
          label={'E-mail'}
          type={'email'}
          error={ 'Что-то пошло не так' } />
        <AuthInput
          id={'userPassword'}
          name={'password'}
          label={'Пароль'}
          type={'password'}
          minLength={ 8 }
          error={ 'Что-то пошло не так' } />
      </div>
        <AuthButton
          text={'Войти'} />
    </form>
  );
}

export default LoginForm;