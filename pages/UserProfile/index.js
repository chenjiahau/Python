import userProfileStyle from './user-profile.module.scss';

import { useState } from 'react';

import { Container } from 'react-bootstrap';
import Breadcrumb from '../../components/Breadcrumb';
import Tab from '../../components/Tab';

// Sub pages
import MyProfile from './MyProfile';
import ApiAccess from './ApiAccess';
import RecentLogin from './RecentLogin';

const BreadCrumbComponent = props => {
  const { pathList } = props;
  return <Breadcrumb pathList={pathList} />
}

const UserProfile = () => {
  const defaultTabList = [
    { id: 1, label: 'My profile', isActive: true },
    { id: 2, label: 'Recent logins', isActive: false },
    { id: 3, label: 'Api access', isActive: false }
  ];

  const defaultPathList = [
    { label: 'User profile', isLink: false },
    { label: defaultTabList[0].label, isLink: false }
  ];

  const [tabList, setTabList] = useState([...defaultTabList]);
  const [pathList, setPathList] = useState([...defaultPathList]);

  const changeTab = selectedTab => {
    const newTabList = [...tabList];
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);

    newTabList.map(tab => tab.isActive = false);
    newTabList[index].isActive = true;
    setTabList(newTabList);

    const newPathList = [...pathList];
    newPathList[1].label = selectedTab.label;
    setPathList(newPathList);
  }

  return (
    <>
      <BreadCrumbComponent pathList={pathList} />

      <Tab tabList={tabList} changeTab={changeTab} />

      {tabList[0].isActive && <MyProfile />}
      {tabList[1].isActive && <RecentLogin />}
      {tabList[2].isActive && <ApiAccess />}
    </>
  )
}

export default UserProfile;