import emailIcon from 'assets/img/v2/splash_page/icon_email.png';
import { useState, useEffect } from 'react';

// Component prefix definition
import cpd from '../common-prefix-definition';

// Component

const ActivationInput = ({ style, isPreviewMode }) => {

  // State
  const [value, setValue] = useState('');

  // Method

  // Side effect
  useEffect(() => {
  }, []);

  return (
    <div className={`sp-login-input-container ${isPreviewMode ? 'sp-login-container--input-preview' : ''}`} style={{ ...style }}>
      <div className={`sp-login-input-block ${isPreviewMode ? 'sp-login-input-block--preview' : ''}`}>
        <input
          type='text'
          placeholder='Activation code'
        />
      </div>
    </div >
  )
}

export default ActivationInput;