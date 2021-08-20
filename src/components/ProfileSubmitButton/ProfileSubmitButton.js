import React from 'react';

import './ProfileSubmitButton.css';

const ProfileSubmitButton = (
  { handleUpdateUserData,
    formValid
  }) => {

  return (
    <button
      className={!formValid ?
        "profile-submit-button button-disabled" :
        "profile-submit-button"}
      type="submit"
      onClick={handleUpdateUserData}
      disabled={!formValid} >
        Сохранить
    </button>
  );
}

export default ProfileSubmitButton;