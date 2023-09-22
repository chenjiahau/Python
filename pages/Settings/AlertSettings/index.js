import mainStyle from './alert-settings.module.scss';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Slice
import { selectUserLevel } from 'stores/slice/user';

// Component
import Nuclias from './Nuclias';

const AlertSettings = () => {
  const navigation = useNavigate();
  const userLevel = useSelector(selectUserLevel) || localStorage.getItem('userLevel');

  // if (!userLevel) {
  //   navigation('/login');
  // }

  return (
    <>
      <Nuclias />
    </>
  );
};

export default AlertSettings;
