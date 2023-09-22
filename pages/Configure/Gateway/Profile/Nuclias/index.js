import mainStyle from '../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Const
import { deviceType } from 'const/nuclias/device';

// UI
import PushToDeviceResultModal from 'cloudUi/Modals/PushToDeviceResultModal';

// Component
import { Breadcrumb, MessageBoxGroup, Tab, ButtonWithIcon } from 'components/';

import Network from './components/Network';
import Security from './components/Security';
import Vpn from './components/Vpn';

// Context
import { configAction, ConfigContext } from './Context';

// Dummy
import { modelName } from 'dummy/data/device';
import { generateGwProfileList } from 'dummy/data/profile';
import { getPushToMultipleDeviceResult } from 'dummy/data/push';
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import gwFeature from 'dummy/data/gateway/feature';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'Gateway', isLink: false },
  { label: 'Profiles', isLink: true, path: '/cloud/configure/gateway/profiles' },
  { label: '', isLink: false },
  { label: 'NETWORK', isLink: false }
];

const defaultTabList = [
  { id: 1, breadCrumbLabel: 'NETWORK', label: 'NETWORK', value: 'network', isShow: false, sActive: false },
  { id: 2, breadCrumbLabel: 'SECURITY', label: 'SECURITY', value: 'security', isShow: false, isActive: false },
  { id: 3, breadCrumbLabel: 'VPN', label: 'VPN', value: 'vpn', isShow: false, isActive: false }
];

const defaultModalStatus = {
  pushToDeviceResult: {
    self: 'pushToDeviceResult',
    status: false,
  }
};

const Nuclias = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { dispatch } = useContext(ConfigContext);
  const { id: profileId } = useParams();

  // Fake API
  let i = +searchParams.get('i') || 0;
  const fakerProfileList = generateGwProfileList([
    { model: modelName[deviceType.gateway][1] },
    { model: modelName[deviceType.gateway][1] },
    { model: modelName[deviceType.gateway][1] },
    { model: modelName[deviceType.gateway][1] },
    { model: modelName[deviceType.gateway][1] },
    { model: modelName[deviceType.gateway][1] },
    { model: modelName[deviceType.gateway][2] },
    { model: modelName[deviceType.gateway][2] },
    { model: modelName[deviceType.gateway][2] },
    { model: modelName[deviceType.gateway][2] },
  ]);
  const fakeProfile = { ...fakerProfileList[profileId] };

  // Variable
  const forceTab = searchParams.get('forceTab');
  const defaultTab = searchParams.get('tab');
  defaultPathList[3].label = fakeProfile.title;

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [pathList, setPathList] = useState(cloneDeep(defaultPathList));
  const [tabList, setTabList] = useState([]);
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

  // Side effect
  useEffect(() => {
    const updatedProfile = cloneDeep(fakeProfile);
    setProfile(updatedProfile);
    dispatch({ type: configAction.setProfile, payload: updatedProfile });

    const instancedModel = gwFeature.getProfileModelInstance(updatedProfile.modelName);
    const firstLevelFeature = instancedModel.getFirstLevelFeature(gwFeature.configPath.profile);
    const updatedTabList = cloneDeep(defaultTabList);

    firstLevelFeature.network && (updatedTabList[0].isShow = true);
    firstLevelFeature.security && (updatedTabList[1].isShow = true);
    firstLevelFeature.vpn && (updatedTabList[2].isShow = true);

    if (defaultTab) {
      const index = defaultTabList.findIndex(tab => tab.value.toLocaleLowerCase() === defaultTab.toLocaleLowerCase())
      if (index > -1) {
        updatedTabList[index].isActive = true;
      }
    } else {
      updatedTabList[0].isActive = true;
    }

    setTabList(updatedTabList);
  }, []);

  useEffect(() => {
    if (forceTab) {
      const index = defaultTabList.findIndex(tab => tab.value.toLocaleLowerCase() === forceTab.toLocaleLowerCase())
      if (index > -1) {
        changeTab(tabList[index]);
      }
    }
  }, [forceTab]);

  if (!profile || tabList.length === 0) {
    return;
  }

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

      <Tab tabList={tabList.filter(tab => tab.isShow)} changeTab={changeTab}>
        <ButtonWithIcon
          label="PUSH CONFIGURATION"
          iconClassName={profile.syncStatus ? 'icon-push-normal' : 'icon-push-unsync'}
          className={mainStyle['push-to-configuration']}
          onClick={() => pushToDevice()}
        />
      </Tab>

      {tabList[0].isShow && tabList[0].isActive && <Network />}
      {tabList[1].isShow && tabList[1].isActive && <Security />}
      {tabList[2].isShow && tabList[2].isActive && <Vpn />}

      <PushToDeviceResultModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        pushResultList={pushResultList}
      />
    </>
  )
}

export default Nuclias;