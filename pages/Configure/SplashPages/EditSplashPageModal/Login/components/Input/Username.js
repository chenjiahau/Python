import usernameIcon from 'assets/img/v2/splash_page/icon_user.png';
import { useState, useEffect } from 'react';

// Component prefix definition
import cpd from '../common-prefix-definition';

// Component

const UsernameInput = ({ style, isPreviewMode }) => {

  // State
  const [value, setValue] = useState('');

  // Method

  // Side effect
  useEffect(() => {
  }, []);

  return (
    <div className={`sp-login-input-container ${isPreviewMode ? 'sp-login-container--input-preview' : ''}`} style={{ ...style }}>
      <div className={`sp-login-input-block ${isPreviewMode ? 'sp-login-input-block--preview' : ''}`}>
        <img src={usernameIcon} alt='' />
        <input
          type='text'
          placeholder='Username'
        />
      </div>
    </div >
  )
}

export default UsernameInput;