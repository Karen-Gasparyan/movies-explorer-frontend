import React from 'react';
import { Link } from 'react-router-dom';

import '../../mixins/auth-pages.css'
import './Register.css';

import Logo from '../Logo/Logo';
import RegisterForm from '../RegisterForm/RegisterForm';

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-page__header">
        <Logo />
        <h2 className="auth-page__title">
          Добро пожаловать!
        </h2>
      </div>

      <RegisterForm
        errorMessage="Что-то пошло не так" />

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