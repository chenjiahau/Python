import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Slice
import { selectUserView } from 'stores/slice/user';

// Component
import Nuclias from './Nuclias';

const Devices = () => {
  const navigation = useNavigate();
  const userView = useSelector(selectUserView) || localStorage.getItem('userView');

  if (!userView) {
    navigation('/login');
  }

  return (
    <>
      {userView === 'nuclias' && <Nuclias />}
    </>
  );
}

export default Devices;