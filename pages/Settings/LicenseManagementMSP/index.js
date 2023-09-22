import licenseManagementStyle from './license-management.module.scss';

import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";

import Breadcrumb from '../../../components/Breadcrumb';
import Tab from '../../../components/Tab';
import MessageBoxGroup from 'components/MessageBoxGroup';

// Sub pages
import Overview from './Overview';
import Devices from './Devices';
import Licenses from './Licenses';
import LicenseLog from './LicenseLog';

const LicenseManagement = () => {
  let [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab');

  const defaultTabList = [
    { id: 1, breadCrumbLabel: 'Overview', label: 'OVERVIEW', value: 'overview', isActive: true },
    { id: 2, breadCrumbLabel: 'Inventory', label: 'DEVICES', value: 'devices', isActive: false },
    { id: 3, breadCrumbLabel: 'License management', label: 'LICENSES', value: 'licenses', isActive: false },
    { id: 4, breadCrumbLabel: 'License logs', label: 'LICENSE LOGS', value: 'license-logs', isActive: false }
  ];

  const defaultPathList = [
    { label: 'Settings', isLink: false },
    { label: defaultTabList[0].label, isLink: false }
  ];

  const defaultMessages = {
    success: null,
    error: null,
    warning: null,
  }

  const [tabList, setTabList] = useState([...defaultTabList]);
  const [pathList, setPathList] = useState([...defaultPathList]);
  const [messages, setMessages] = useState({ ...defaultMessages });

  const changeTab = selectedTab => {
    searchParams.delete('tab');
    const newTabList = [...tabList];
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);

    newTabList.map(tab => tab.isActive = false);
    newTabList[index].isActive = true;
    setTabList(newTabList);

    const newPathList = [...pathList];
    newPathList[1].label = selectedTab.breadCrumbLabel;
    setPathList(newPathList);
  }

  useEffect(() => {
    if (defaultTab) {
      const index = defaultTabList.findIndex(tab => tab.value.toLocaleLowerCase() === defaultTab.toLocaleLowerCase())
      if (index > -1) {
        changeTab(tabList[index]);
      }
    }
  }, [defaultTab]);


  return (
    <>
      <Breadcrumb pathList={pathList} />

      <MessageBoxGroup
        containerMode={true}
        messages={messages}
        onClose={type => setMessages({ ...messages, [type]: null })}
      />

      <Tab tabList={tabList} changeTab={changeTab} />

      {tabList[0].isActive && <Overview />}
      {tabList[1].isActive && <Devices />}
      {tabList[2].isActive && <Licenses />}
      {tabList[3].isActive && <LicenseLog />}
    </>
  )
}

export default LicenseManagement;