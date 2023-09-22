import { useSelector } from 'react-redux';

// Slice
import { selectUserLevel } from 'stores/slice/user';

// Component
import Nuclias from './Nuclias';

const EventLog = () => {
  // State
  const userLevel = useSelector(selectUserLevel) || localStorage.getItem('userLevel');

  return (
    <>
      {userLevel === 'nuclias' && <Nuclias />}
    </>
  )
}

export default EventLog;