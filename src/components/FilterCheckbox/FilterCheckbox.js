import React from 'react';

import './FilterCheckbox.css';

const FilterCheckbox = (
  { filterCheckbox,
    handleFilterCheckbox
  }) => {
    
  return (
    <>
      <input
        className="filter-checkbox"
        id="filter-checkbox"
        type="checkbox"
        name="filter-checkbox"
        onChange={handleFilterCheckbox}
        checked={filterCheckbox}/>
      <label 
        className="filter-checkbox__label"
        htmlFor="filter-checkbox">
          Короткометражки
      </label>
    </>
  );
}

export default FilterCheckbox;