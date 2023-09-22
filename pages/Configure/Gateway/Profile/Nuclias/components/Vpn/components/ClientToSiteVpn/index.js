import { useState, useEffect, useContext } from 'react';

// Component
import ClientToSiteVpn from './ClientToSiteVpn';

// Context
import { ClientToSiteVpnContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <ClientToSiteVpnContextProvider>
        <ClientToSiteVpn />
      </ClientToSiteVpnContextProvider>
    </div>
  )
}

export default Index;