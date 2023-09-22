import { useState, useEffect, useContext } from 'react';

// Component
import Ethernet from './Ethernet';

// Context
import { EthernetContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <EthernetContextProvider>
        <Ethernet />
      </EthernetContextProvider>
    </div>
  )
}

export default Index;