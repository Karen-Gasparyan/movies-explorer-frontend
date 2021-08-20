import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

import Logo from '../Logo/Logo';
import RegisterForm from '../RegisterForm/RegisterForm';

const Register = (
  { userName,
    userEmail,
    userPassword,
    errorMessage,
    formValid,
    focusHandler,
    userNameHandler,
    userEmailHandler,
    userPasswordHandler,
    userNameError,
    userEmailError,
    userPasswordError
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
        userName={userName}
        userEmail={userEmail}
        userPassword={userPassword}
        errorMessage={errorMessage}
        formValid={formValid}
        focusHandler={focusHandler}
        userNameHandler={userNameHandler}
        userEmailHandler={userEmailHandler}
        userPasswordHandler={userPasswordHandler}
        userNameError={userNameError}
        userEmailError={userEmailError}
        userPasswordError={userPasswordError} />

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