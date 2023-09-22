import React from 'react';
import { useSelector } from 'react-redux';

// Slice
import { selectUserLevel } from 'stores/slice/user';

// Component
import Nuclias from './Nuclias';

// Context
import { ConfigContextProvider } from './Nuclias/Context';

const Index = () => {
  // State
  const userLevel = useSelector(selectUserLevel) || localStorage.getItem('userLevel');

  return (
    <ConfigContextProvider>
      {userLevel !== 'ntt-care' && <Nuclias />}
    </ConfigContextProvider >
  )
}

export default Index;