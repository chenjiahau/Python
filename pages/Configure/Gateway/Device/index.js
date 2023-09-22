import { useSelector } from 'react-redux';

// Slice
import { selectUserView } from 'stores/slice/user';

// Component
import Nuclias from './Nuclias';

// Context
import { ConfigContextProvider } from '../Profile/Nuclias/Context';

const Device = () => {
  // State
  const userView = useSelector(selectUserView) || localStorage.getItem('userView');

  return (
    <>
      (
      <ConfigContextProvider>
        <Nuclias />
      </ConfigContextProvider >
      )
    </>

  )
}

export default Device;