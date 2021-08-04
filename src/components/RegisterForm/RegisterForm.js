import React from 'react';

import './RegisterForm.css';
import AuthInput from '../AuthInput/AuthInput';
import AuthButton from '../AuthButton/AuthButton';

const RegisterForm = () => {

  return (
    <form className="register-form">
      <div className="register-form_input-wrapper">
        <AuthInput
          id={'userName'}
          name={'name'}
          label={'Имя'}
          type={'text'}
          minLength={ 2 }
          error={ 'Что-то пошло не так' } />
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
          text={'Зарегистрироваться'} />
    </form>
  );
}

export default RegisterForm;