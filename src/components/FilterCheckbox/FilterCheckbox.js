import React from 'react';

import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <>
      <input
        className="filter-checkbox"
        id="filter-checkbox"
        type="checkbox"
        name="filter-checkbox" />
      <label 
        className="filter-checkbox__label"
        htmlFor="filter-checkbox">
          Короткометражки
      </label>
    </>
  );
}

export default FilterCheckbox;