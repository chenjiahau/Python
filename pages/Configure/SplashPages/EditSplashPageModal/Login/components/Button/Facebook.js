import { useState, useEffect } from 'react';

// Component prefix definition
import cpd from '../common-prefix-definition';

const FacebookButton = ({ style }) => {

  // State

  // Method

  // Side effect
  useEffect(() => {
  }, []);

  return (
    <div className={`sp-login-social-container ${cpd.button.facebook}-container`} style={{ ...style }}>
      <i className='sp-login-facebook-button-logo' />
      <div className='social-text'>Continue with Facebook</div>
    </div >
  )
}

export default FacebookButton;