import { useState } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { TabSubTab } from 'components/';

import Basic from './components/Basic';
import Acl from './components/Acl';
import AccessPolicy from './components/AccessPolicy';
import IgmpSnooping from './components/IgmpSnooping';
import Vlan from './components/Vlan';

// Default variable
const defaultTabList = [
  { id: 1, label: 'BASIC', value: 'basic', isActive: true },
  { id: 2, label: 'ACL', value: 'acl', isActive: false },
  { id: 3, label: 'ACCESS POLICY', value: 'accessPolicy', isActive: false },
  { id: 4, label: 'IGMP SNOOPING', value: 'igmpSnooping', isActive: false },
  { id: 5, label: 'VLAN', value: 'vlan', isActive: false },
];

const SettingsDetail = (props) => {
  const { profile } = props;

  // State
  const [tabList, setTabList] = useState(cloneDeep(defaultTabList));

  // Method
  const changeTab = selectedTab => {
    const newTabList = cloneDeep(tabList);
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);

    newTabList.map(tab => tab.isActive = false);
    newTabList[index].isActive = true;
    setTabList(newTabList);
  }

  return (
    <>
      <div className="layout-container layout-container--column layout-container--fluid">
        <TabSubTab tabList={tabList} changeTab={changeTab} />

        {
          tabList[0].isActive && (
            <Basic profile={profile} />
          )
        }

        {
          tabList[1].isActive && (
            <Acl profile={profile} />
          )
        }

        {
          tabList[2].isActive && (
            <AccessPolicy profile={profile} />
          )
        }

        {
          tabList[3].isActive && (
            <IgmpSnooping profile={profile} />
          )
        }

        {
          tabList[4].isActive && (
            <Vlan profile={profile} tabList={tabList} changeTab={changeTab} />
          )
        }
      </div>
    </>
  );
}

export default SettingsDetail;
