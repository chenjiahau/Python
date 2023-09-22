import { useState, useEffect, useContext } from 'react';

// Component
import Wireless from './Wireless';

// Context
import { WirelessContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <WirelessContextProvider>
        <Wireless />
      </WirelessContextProvider>
    </div>
  )
}

export default Index;