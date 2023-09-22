import React from 'react';

// Context
import { DeviceContextProvider } from './Context';

// Component
import Device from './Device';

const Index = () => {
  return (
    <DeviceContextProvider>
      <Device />
    </DeviceContextProvider >
  )
}

export default Index;