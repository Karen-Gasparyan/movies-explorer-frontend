import React from 'react';

import './SearchForm.css';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = (
  { placeholder,
    buttonText,
    handleSubmitSearchForm,
    searchFormValue,
    searchFormHeandler,
    emptyListValue,
    filterCheckbox,
    handleFilterCheckbox
  }) => {
  return (
    <form
      className="search-from"
      onSubmit={handleSubmitSearchForm}>
      <div className="search-form__container">
        <label
          className="search-from__icon"
          htmlFor="search-from-input">
        </label>
        <input
          className={`search-from__input ${emptyListValue ? 'search-from__input-disabled' : ''}`}
          id="search-from-input"
          autoComplete="off"
          placeholder={placeholder}
          value={searchFormValue}
          onChange={searchFormHeandler}
          disabled={emptyListValue}
          required />
        <button
          className={`search-from__submit-button ${emptyListValue ? 'search-from__submit-button-disabled' : ''}`}
          disabled={emptyListValue} >
          {buttonText}
        </button>
      </div>
      <div className="search-from__checkbox">
      <FilterCheckbox
        disabled={emptyListValue}
        filterCheckbox={filterCheckbox}
        handleFilterCheckbox={handleFilterCheckbox} />
      </div>
    </form>
  );
}

export default SearchForm;