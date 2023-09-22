import { useState, useEffect, useContext } from 'react';

// Component
import Addressing from './Addressing';

// Context
import { AddressingContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <AddressingContextProvider>
        <Addressing />
      </AddressingContextProvider>
    </div>
  )
}

export default Index;