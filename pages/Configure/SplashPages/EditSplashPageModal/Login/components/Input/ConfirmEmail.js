import emailIcon from 'assets/img/v2/splash_page/icon_email.png';
import { useState, useEffect } from 'react';

// Component prefix definition
import cpd from '../common-prefix-definition';

// Component

const ConfirmEmailInput = ({ style, isPreviewMode }) => {

  // State
  const [value, setValue] = useState('');

  // Method

  // Side effect
  useEffect(() => {
  }, []);

  return (
    <div className={`sp-login-input-container ${isPreviewMode ? 'sp-login-container--input-preview' : ''}`} style={{ ...style }}>
      <div className={`sp-login-input-block ${isPreviewMode ? 'sp-login-input-block--preview' : ''}`}>
        <img src={emailIcon} alt='' />
        <input
          type='text'
          placeholder='Confirm Email address'
        />
      </div>
    </div >
  )
}

export default ConfirmEmailInput;