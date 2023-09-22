import { useState, useEffect, useContext } from 'react';

// Component
import ApplicationControl from './ApplicationControl';

// Context
import { AppCtrlContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <AppCtrlContextProvider>
        <ApplicationControl />
      </AppCtrlContextProvider>
    </div>
  )
}

export default Index;