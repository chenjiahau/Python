import { useState, useEffect, useContext } from 'react';

// Component
import TrafficManagement from './TrafficManagement';

// Context
import { TrafficManagementContextProvider } from './Context';

const Index = () => {
  return (
    <div className='tab-container-border'>
      <TrafficManagementContextProvider>
        <TrafficManagement />
      </TrafficManagementContextProvider>
    </div>
  )
}

export default Index;