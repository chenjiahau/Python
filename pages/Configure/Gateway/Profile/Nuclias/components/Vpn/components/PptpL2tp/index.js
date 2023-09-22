import { useState, useEffect, useContext } from 'react';

// Component
import PptpL2tp from './PptpL2tp';

// Context
import { PptpL2tpContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <PptpL2tpContextProvider>
        <PptpL2tp />
      </PptpL2tpContextProvider>
    </div>
  )
}

export default Index;