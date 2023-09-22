import { useState, useEffect, useContext } from 'react';

// Component
import OpenVpn from './OpenVpn';

// Context
import { OpenVpnContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <OpenVpnContextProvider>
        <OpenVpn />
      </OpenVpnContextProvider>
    </div>
  )
}

export default Index;