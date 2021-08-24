import React from 'react';
import { Link } from 'react-router-dom';

import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h2 className="error-page__error-status">404</h2>
      <p className="error-page__error-message">Страница не найдена</p>
      <Link to="/"
        className="error-page__back-link">Назад
      </Link>
    </div>
  );
}

export default ErrorPage;