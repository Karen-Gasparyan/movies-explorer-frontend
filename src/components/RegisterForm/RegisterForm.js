import React from 'react';

import '../../mixins/auth-forms.css'
import './RegisterForm.css';

import AuthInput from '../AuthInput/AuthInput';
import AuthButton from '../AuthButton/AuthButton';

const RegisterForm = ({ errorMessage }) => {
  return (
    <form 
      className="auth-form"
      name="register">
      <div className="auth-form_input-wrapper register-form_input-wrapper">
        <AuthInput
          id={'userName'}
          name={'name'}
          label={'Имя'}
          type={'text'}
          minLength={ 2 }
          maxLength={ 30 } />
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
          text={'Зарегистрироваться'} />
    </form>
  );
}

export default RegisterForm;