
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import TabSubTab from 'components/TabSubTab';
import MessageBoxGroup from 'components/MessageBoxGroup';

// Sub pages
import ScheduleUpgrades from './ScheduleUpgrades';
import BulkUpgrades from './BulkUpgrades';



const FirmwareUpgrades = () => {
  let [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab');

  const defaultTabList = [
    { id: 1, breadCrumbLabel: 'Schedule Upgrades', label: 'SCHEDULE UPGRADES', value: 'scheduleUpgrades', isActive: true },
    { id: 2, breadCrumbLabel: 'Bulk Upgrades', label: 'BULK UPGRADES', value: 'bulkUpgrades', isActive: false },
  ];

  const defaultPathList = [
    { label: 'Settings', isLink: false },
    { label: defaultTabList[0].label, isLink: false }
  ];

  // const defaultMessages = {
  //   success: 'Successfully',
  //   error: 'Device not found.',
  //   warning: 'Changing the profile will re-configure all device settings. This may disconnect all currently connected clients',
  // }

  const defaultMessages = {
    success: null,
    error: null,
    warning: null
  }
  // const [key, setKey] = useState('Schedule Upgrades');

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
      <MessageBoxGroup
        containerMode={true}
        messages={messages}
        onClose={type => setMessages({ ...messages, [type]: null })}
      />

      <TabSubTab tabList={tabList} changeTab={changeTab} />

      {tabList[0].isActive && <ScheduleUpgrades />}
      {tabList[1].isActive && <BulkUpgrades />}
    </>
  )
}

export default FirmwareUpgrades;