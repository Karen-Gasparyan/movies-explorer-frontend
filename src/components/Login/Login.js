import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

import Logo from '../Logo/Logo';
import LoginForm from '../LoginForm/LoginForm';

const Login = (
  { email,
    password,
    errorMessage,
    formValid,
    focusHandler,
    userEmailHandler,
    userPasswordHandler,
    userEmailError,
    userPasswordError,
    handleSubmitLogin,
    resetAuthForms
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
        email={email}
        password={password}
        errorMessage={errorMessage}
        formValid={formValid}
        focusHandler={focusHandler}
        userEmailHandler={userEmailHandler}
        userPasswordHandler={userPasswordHandler}
        userEmailError={userEmailError}
        userPasswordError={userPasswordError}
        handleSubmitLogin={handleSubmitLogin} />

      <p className="auth-page__text-question">
        Ещё не зарегистрированы?
        <Link to="/signup"
          className="auth-page__signin-link"
          onClick={resetAuthForms} >
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;