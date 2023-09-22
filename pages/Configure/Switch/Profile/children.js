import mainStyle from './profile.module.scss';

import { useState, useEffect } from 'react';
import { useSearchParams, UNSAFE_NavigationContext as NavigationContext, useNavigate } from "react-router-dom";
import { cloneDeep } from 'lodash';

// Const
import { deviceType } from 'const/nuclias/device';

// UI
import PushToDeviceResultModal from 'cloudUi/Modals/PushToDeviceResultModal';

// Component
import { Breadcrumb, MessageBoxGroup, Tab, ButtonWithIcon } from 'components/';

import Ports from './components/Ports';
import Settings from './components/Settings';

// Dummy
import { generateSiteList } from 'dummy/data/site';
import { generateSiteTagList } from 'dummy/data/sitetag';
import { generateProfileList } from 'dummy/data/profile';
import { getPushToMultipleDeviceResult } from 'dummy/data/push';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'Switch', isLink: false },
  { label: 'Profiles', isLink: true, path: '/cloud/configure/switch/profiles' },
  { label: '', isLink: false },
  { label: 'PORTS', isLink: false }
];

const defaultTabList = [
  { id: 1, breadCrumbLabel: 'PORTS', label: 'PORTS', value: 'ports', isActive: false },
  { id: 2, breadCrumbLabel: 'SETTINGS', label: 'SETTINGS', value: 'settings', isActive: false },
];

const defaultModalStatus = {
  pushToDeviceResult: {
    self: 'pushToDeviceResult',
    status: false,
  },
};

const Children = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  // Fake API
  let i = +searchParams.get('i') || 0;
  const fakerProfileList = generateProfileList(deviceType.switch, 10, true);
  const fakeProfile = { ...fakerProfileList[i] };

  // Variable
  const forceTab = searchParams.get('forceTab');
  const defaultTab = searchParams.get('tab');
  defaultPathList[3].label = fakeProfile.title;

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [siteList, setSiteList] = useState(generateSiteList());
  const [siteTagList, setSiteTagList] = useState(generateSiteTagList());
  const [profile, setProfile] = useState(cloneDeep(fakeProfile));
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [pathList, setPathList] = useState(cloneDeep(defaultPathList));
  const [tabList, setTabList] = useState(cloneDeep(defaultTabList));
  const [pushResultList, setPushResultList] = useState([]);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeTab = selectedTab => {
    setSearchParams({});
    const newTabList = cloneDeep(tabList);
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);

    newTabList.map(tab => tab.isActive = false);
    newTabList[index].isActive = true;
    setTabList(newTabList);

    const newPathList = cloneDeep(pathList);
    newPathList[4].label = selectedTab.breadCrumbLabel;
    setPathList(newPathList);

    setMessages(cloneDeep(defaultMessages));
  }

  const pushToDevice = () => {
    setPushResultList(getPushToMultipleDeviceResult(profile.deviceList));
    changeModalStatus(modalStatus.pushToDeviceResult.self, true);
  }

  useEffect(() => {
    if (defaultTab) {
      const index = defaultTabList.findIndex(tab => tab.value.toLocaleLowerCase() === defaultTab.toLocaleLowerCase())
      if (index > -1) {
        changeTab(tabList[index]);
      }
    } else {
      changeTab(tabList[0]);
    }
  }, []);

  useEffect(() => {
    if (forceTab) {
      const index = defaultTabList.findIndex(tab => tab.value.toLocaleLowerCase() === forceTab.toLocaleLowerCase())
      if (index > -1) {
        changeTab(tabList[index]);
      }
    }
  }, [forceTab]);

  return (
    <>
      <div className="layout-container breadcrumb--extended">
        <div>
          <Breadcrumb full={false} pathList={pathList} />
        </div>
      </div>

      <div className="layout-container">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
      </div>

      <Tab tabList={tabList} changeTab={changeTab}>
        <ButtonWithIcon
          label="PUSH CONFIGURATION"
          iconClassName={profile.syncStatus ? 'icon-push-normal' : 'icon-push-unsync'}
          className={mainStyle['push-to-configuration']}
          onClick={() => pushToDevice()}
        />
      </Tab>

      {
        tabList[0].isActive && (
          <Ports profile={profile} />
        )
      }
      {
        tabList[1].isActive && (
          <Settings profile={profile} />
        )
      }

      <PushToDeviceResultModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        pushResultList={pushResultList}
      />
    </>
  )
}

export default Children;