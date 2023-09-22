import { useState, useEffect, useContext } from 'react';

// Component
import Ips from './Ips';

// Context
import { IpsContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <IpsContextProvider>
        <Ips />
      </IpsContextProvider>
    </div>
  )
}

export default Index;