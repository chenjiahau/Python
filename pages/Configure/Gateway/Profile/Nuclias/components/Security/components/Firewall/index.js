import { useState, useEffect, useContext } from 'react';

// Component
import Firewall from './Firewall';

// Context
import { FirewallContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <FirewallContextProvider>
        <Firewall />
      </FirewallContextProvider>
    </div>
  )
}

export default Index;