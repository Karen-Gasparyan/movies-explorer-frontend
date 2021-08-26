import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

import Logo from '../Logo/Logo';
import RegisterForm from '../RegisterForm/RegisterForm';

const Register = (
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
    <div className="auth-page">
      <div className="auth-page__header">
        <Logo />
        <h2 className="auth-page__title">
          Добро пожаловать!
        </h2>
      </div>

      <RegisterForm
        name={name}
        email={email}
        password={password}
        errorMessage={errorMessage}
        formValid={formValid}
        focusHandler={focusHandler}
        userNameHandler={userNameHandler}
        userEmailHandler={userEmailHandler}
        userPasswordHandler={userPasswordHandler}
        userNameError={userNameError}
        userEmailError={userEmailError}
        userPasswordError={userPasswordError}
        handleSubmitRegister={handleSubmitRegister} />

      <p className="auth-page__text-question">
        Уже зарегистрированы?
        <Link
          to="/signin"
          className="auth-page__signin-link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;