import React from 'react';
import { Link } from 'react-router-dom';

import './LoginButton.css';

const LoginButton = () => {
  return (
    <Link to="/signin" className="login-button">Войти</Link>
  );
}

export default LoginButton;