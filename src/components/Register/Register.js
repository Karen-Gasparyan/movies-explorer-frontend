import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css';
import Logo from '../Logo/Logo';
import RegisterForm from '../RegisterForm/RegisterForm';

const Register = () => {

  return (
    <div className="register">
      <div className="register__header">
        <Logo />
        <h2 className="register__title">
          Добро пожаловать!
        </h2>
      </div>

      <RegisterForm />

      <p className="register__text-question">
        Уже зарегистрированы?
        <Link
          to="#"
          className="register__signin-link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;