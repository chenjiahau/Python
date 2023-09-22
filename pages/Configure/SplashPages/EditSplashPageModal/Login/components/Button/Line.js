import { useState, useEffect } from 'react';

// Component prefix definition
import cpd from '../common-prefix-definition';

const LineButton = ({ style }) => {

  // State

  // Method

  // Side effect
  useEffect(() => {
  }, []);

  return (
    <div className={`sp-login-social-container ${cpd.button.line}-container`} style={{ ...style }}>
      <i className='sp-login-line-button-logo' />
      <div className='social-text'>LINE login</div>
    </div >
  )
}

export default LineButton;