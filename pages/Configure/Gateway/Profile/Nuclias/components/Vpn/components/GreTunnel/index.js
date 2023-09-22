import { useState, useEffect, useContext } from 'react';

// Component
import GreTunnel from './GreTunnel';

// Context
import { GreTunnelContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <GreTunnelContextProvider>
        <GreTunnel />
      </GreTunnelContextProvider>
    </div>
  )
}

export default Index;