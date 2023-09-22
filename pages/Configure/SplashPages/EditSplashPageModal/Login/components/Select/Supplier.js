import { useState } from 'react';

const SupplierSelect = ({ isPreviewMode, style }) => {

  return (
    <div className={`sp-login-select-container ${isPreviewMode ? 'sp-login-container--select-preview' : ''}`} style={{ ...style }}>
      <div className='sp-login-select-block'>
        <select />
      </div>
    </div >
  )
}

export default SupplierSelect;