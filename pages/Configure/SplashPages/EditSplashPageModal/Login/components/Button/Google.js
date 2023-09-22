import { useState, useEffect } from 'react';

// Component prefix definition
import cpd from '../common-prefix-definition';

const GoogleButton = ({ style }) => {

  // State

  // Method

  // Side effect
  useEffect(() => {
  }, []);

  return (
    <div className={`sp-login-social-container ${cpd.button.google}-container`} style={{ ...style }}>
      <i className='sp-login-google-button-logo' />
      <div className='social-text'>Sign In with Google</div>
    </div >
  )
}

export default GoogleButton;