import { useState, useEffect } from 'react';

// Component prefix definition
import cpd from '../common-prefix-definition';

const WeiboButton = ({ style }) => {

  // State

  // Method

  // Side effect
  useEffect(() => {
  }, []);

  return (
    <div className={`sp-login-social-container ${cpd.button.weibo}-container`} style={{ ...style }}>
      <i className='sp-login-weibo-button-logo' />
      <div className='social-text'>Sign In with Weibo</div>
    </div >
  )
}

export default WeiboButton;