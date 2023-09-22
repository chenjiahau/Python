import dashboardStyle from './dashboard.module.scss';

import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uiActions } from 'stores/slice/ui';

// Slice
import { selectUserView } from 'stores/slice/user';

// Component
import Nuclias from './Nuclias';
import Connect from './Connect';

const Dashboard = () => {

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const userView = useSelector(selectUserView) || localStorage.getItem('userView');
  dispatch(uiActions.showSpinner()); ///?????
  // if (!userView) {
  //   navigation('/login');
  // }

  const closeSpinner = () => {
    dispatch(uiActions.hideSpinner());
  }

  useEffect(() => {
    // dispatch(uiActions.showSpinner());
  }, [userView]);

  return (
    <div className={`layout-container layout-container--fluid ${dashboardStyle['dashboard-container']}`}>
      {userView === 'nuclias' && <><Nuclias />{closeSpinner()}</>}
      {userView === 'connect' && <><Connect />{closeSpinner()}</>}
    </div>
  );
};

export default Dashboard;
