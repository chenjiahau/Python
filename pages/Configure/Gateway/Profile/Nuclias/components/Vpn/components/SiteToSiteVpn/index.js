import { useState, useEffect, useContext } from 'react';

// Component
import SiteToSiteVpn from './SiteToSiteVpn';

// Context
import { SiteToSiteVpnContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <SiteToSiteVpnContextProvider>
        <SiteToSiteVpn />
      </SiteToSiteVpnContextProvider>
    </div>
  )
}

export default Index;