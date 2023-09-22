import firmwareStyle from './firmware.module.css';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Breadcrumb from '../../../components/Breadcrumb';
import Tab from '../../../components/Tab';
import MessageBoxGroup from 'components/MessageBoxGroup';

// Sub pages
import FirmwareManagement from './FirmwareManagement';
import FirmwareUpgrades from './FirmwareUpgrades';
import NewReleases from './NewReleases';

const LicenseManagement = () => {
  let [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab');

  const defaultTabList = [
    { id: 1, breadCrumbLabel: 'NewReleases', label: 'NEW RELEASES', value: 'newReleases', isActive: true },
    { id: 2, breadCrumbLabel: 'FirmwareUpgrades', label: 'FIRMWARE UPGRADES', value: 'firmwareUpgrades', isActive: false },
    { id: 3, breadCrumbLabel: 'FirmwareManagement', label: 'FIRMWARE MANAGEMENT', value: 'firmwareManagement', isActive: false },
  ];

  const defaultPathList = [
    { label: 'Settings', isLink: false },
    { label: 'Firmware', isLink: false }
  ];

  // const defaultMessages = {
  //   success: 'Successfully',
  //   error: 'Device not found.',
  //   warning: 'Changing the profile will re-configure all device settings. This may disconnect all currently connected clients',
  // }

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

      {tabList[0].isActive && <NewReleases />}
      {tabList[1].isActive && <FirmwareUpgrades />}
      {tabList[2].isActive && <FirmwareManagement />}
    </>
  )
}

export default LicenseManagement;