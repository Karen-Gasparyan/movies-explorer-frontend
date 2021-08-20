import React from 'react';

import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({ placeholder, buttonText }) => {
  return (
    <form className="search-from">
      <div className="search-form__container">
        <label
          className="search-from__icon"
          htmlFor="search-from-input">
        </label>
        <input
          className="search-from__input"
          id="search-from-input"
          autoComplete="off"
          placeholder={placeholder} />
        <button className="search-from__submit-button">{buttonText}</button>
      </div>
      <div className="search-from__checkbox">
        <FilterCheckbox />
      </div>
    </form>
  );
}

export default SearchForm;