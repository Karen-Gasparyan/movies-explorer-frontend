import React from 'react';

import '../../mixins/auth-forms.css'
import './LoginForm.css';

import AuthInput from '../AuthInput/AuthInput';
import AuthButton from '../AuthButton/AuthButton';

const LoginForm = ({ errorMessage }) => {
  return (
    <form
      className="auth-form"
      name="login">
      <div className="auth-form_input-wrapper login-form_input-wrapper">
        <AuthInput
          id={'userEmail'}
          name={'email'}
          label={'E-mail'}
          type={'email'} />
        <AuthInput
          id={'userPassword'}
          name={'password'}
          label={'Пароль'}
          type={'password'}
          minLength={ 8 } />
        <span className="auth-error-message">{ errorMessage }</span>
      </div>
        <AuthButton
          text={'Войти'} />
    </form>
  );
}

export default LoginForm;