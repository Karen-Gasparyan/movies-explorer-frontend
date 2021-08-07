import React from 'react';
import { Link } from 'react-router-dom';

import './RegisterButton.css';

const RegisterButton = () => {
  return (
    <Link to="/signup" className="register-button">Регистрация</Link>
  );
}

export default RegisterButton;