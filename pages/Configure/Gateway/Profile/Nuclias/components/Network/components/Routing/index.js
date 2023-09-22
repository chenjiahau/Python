import { useState, useEffect, useContext } from 'react';

// Component
import Routing from './Routing';

// Context
import { RoutingContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <RoutingContextProvider>
        <Routing />
      </RoutingContextProvider>
    </div>
  )
}

export default Index;