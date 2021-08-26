import React from 'react';

import './ProfileSubmitButton.css';

const ProfileSubmitButton = ({ formValid }) => {
  return (
    <button
      className={!formValid ?
        "profile-submit-button button-disabled" :
        "profile-submit-button"}
      type="submit"
      disabled={!formValid}
      aria-label="Сохранить" >
        Сохранить
    </button>
  );
}

export default ProfileSubmitButton;