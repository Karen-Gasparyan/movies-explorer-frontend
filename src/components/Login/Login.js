import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
import Logo from '../Logo/Logo';
import LoginForm from '../LoginForm/LoginForm';

const Login = () => {

  return (
    <div className="login">
      <div className="login__header">
        <Logo />
        <h2 className="login__title">
          Рады видеть!
        </h2>
      </div>

      <LoginForm />

      <p className="login__text-question">
        Ещё не зарегистрированы?
        <Link
          to="/signup"
          className="login__signin-link">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;