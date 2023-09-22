import { useState, useEffect, useContext } from 'react';

// Component
import WebContentFilter from './WebContentFilter';

// Context
import { WcfContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <WcfContextProvider>
        <WebContentFilter />
      </WcfContextProvider>
    </div>
  )
}

export default Index;