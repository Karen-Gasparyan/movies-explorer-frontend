import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

import Logo from '../Logo/Logo';
import LoginForm from '../LoginForm/LoginForm';

const Login = (
  { userEmail,
    userPassword,
    errorMessage,
    formValid,
    focusHandler,
    userEmailHandler,
    userPasswordHandler,
    userEmailError,
    userPasswordError
}) => {

  return (
    <div className="auth-page">
      <div className="auth-page__header">
        <Logo />
        <h2 className="auth-page__title">
          Рады видеть!
        </h2>
      </div>

      <LoginForm
        userEmail={userEmail}
        userPassword={userPassword}
        errorMessage={errorMessage}
        formValid={formValid}
        focusHandler={focusHandler}
        userEmailHandler={userEmailHandler}
        userPasswordHandler={userPasswordHandler}
        userEmailError={userEmailError}
        userPasswordError={userPasswordError} />

      <p className="auth-page__text-question">
        Ещё не зарегистрированы?
        <Link
          to="/signup"
          className="auth-page__signin-link">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;