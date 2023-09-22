import { useState, useEffect } from 'react';

// Component prefix definition
import cpd from '../common-prefix-definition';

const TwitterButton = ({ style }) => {

  // State

  // Method

  // Side effect
  useEffect(() => {
  }, []);

  return (
    <div className={`sp-login-social-container ${cpd.button.twitter}-container`} style={{ ...style }}>
      <i className='sp-login-twitter-button-logo' />
      <div className='social-text'>Sign In with Twitter</div>
    </div >
  )
}

export default TwitterButton;