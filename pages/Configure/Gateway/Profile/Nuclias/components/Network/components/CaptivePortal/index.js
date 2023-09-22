import { useState, useEffect, useContext } from 'react';

// Component
import CaptivePortal from './CaptivePortal';

// Context
import { CaptivePortalContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <CaptivePortalContextProvider>
        <CaptivePortal />
      </CaptivePortalContextProvider>
    </div>
  )
}

export default Index;