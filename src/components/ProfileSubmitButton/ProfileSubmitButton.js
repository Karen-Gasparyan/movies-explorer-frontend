import React from 'react';

import './ProfileSubmitButton.css';
import '../../mixins/button-disabled.css';

const ProfileSubmitButton = (
  { handleUpdateUserData,
    submitButtonDisabled
  }) => {

  return (
    <button
      className={submitButtonDisabled ?
        "profile-submit-button button-disabled" :
        "profile-submit-button"}
      type="submit"
      onClick={handleUpdateUserData}
      disabled={submitButtonDisabled} >
        Сохранить
    </button>
  );
}

export default ProfileSubmitButton;