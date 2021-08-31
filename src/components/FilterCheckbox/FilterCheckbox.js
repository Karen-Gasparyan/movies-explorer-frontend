import React from 'react';

import './FilterCheckbox.css';

const FilterCheckbox = (
  { disabled,
    filterCheckbox,
    handleFilterCheckbox
  }) => {

  return (
    <>
      <input
        className="filter-checkbox"
        id="filter-checkbox"
        type="checkbox"
        name="filter-checkbox"
        disabled={disabled}
        onChange={handleFilterCheckbox}
        checked={filterCheckbox} />
      <label 
        className="filter-checkbox__label"
        htmlFor="filter-checkbox">
          Короткометражки
      </label>
    </>
  );
}

export default FilterCheckbox;