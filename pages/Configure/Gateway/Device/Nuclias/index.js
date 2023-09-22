import mainStyle from '../../Profile/config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Const
import { deviceType } from 'const/nuclias/device';

// UI
import PushToDeviceResultModal from 'cloudUi/Modals/PushToDeviceResultModal';

// Component
import { Breadcrumb, MessageBoxGroup, Tab, Button, DropdownWithItem } from 'components/';

import Basic from './components/Basic';
import Summary from './components/Summary';
import Network from '../../Profile/Nuclias/components/Network';
import Security from '../../Profile/Nuclias/components/Security';
import Vpn from '../../Profile/Nuclias/components/Vpn';
import Tools from './components/Tools';
import License from './components/License';

// Context
import { configAction, ConfigContext } from '../../Profile/Nuclias/Context';

// Dummy
import { modelName, generateDevice } from 'dummy/data/device';
import { generateSiteList } from 'dummy/data/site';
import { generateSiteTagList } from 'dummy/data/sitetag';
import { getPushToDeviceResult } from 'dummy/data/push';
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import gwFeature from 'dummy/data/gateway/feature';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPaths = [
  { label: 'Monitor', isLink: false },
  { label: 'Gateway', isLink: false },
  { label: 'Device', isLink: true, path: '/monitor/gateway/devices' },
  { label: '', isLink: false },
];

const defaultTabs = [
  { id: 1, breadCrumbLabel: 'BASIC', label: 'BASIC', value: 'basic', isShow: true, sActive: false },
  { id: 2, breadCrumbLabel: 'SUMMARY', label: 'SUMMARY', value: 'summary', isShow: true, sActive: false },
  { id: 3, breadCrumbLabel: 'NETWORK', label: 'NETWORK', value: 'network', isShow: false, sActive: false },
  { id: 4, breadCrumbLabel: 'SECURITY', label: 'SECURITY', value: 'security', isShow: false, isActive: false },
  { id: 5, breadCrumbLabel: 'VPN', label: 'VPN', value: 'vpn', isShow: false, isActive: false },
  { id: 6, breadCrumbLabel: 'TOOLS', label: 'TOOLS', value: 'tools', isShow: true, isActive: false },
  { id: 7, breadCrumbLabel: 'LICENSE', label: 'LICENSE', value: 'license', isShow: true, isActive: false }
];

const defaultModalStatus = {
  pushToDeviceResult: {
    self: 'pushToDeviceResult',
    status: false,
  }
};

const Nuclias = () => {
  const { state, dispatch } = useContext(ConfigContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const { id: deviceId } = useParams();
  const navigate = useNavigate();

  // Fake API data
  let i = +searchParams.get('i') || 0;
  const fakeDevices = [
    // {
    //   isActive: false, iconClass: 'icon-round online',
    //   ...generateDevice('GATEWAY', modelName['GATEWAY'][0], '76:15:03:9A:CE:8E', 'Online', 'DBG-2000-1')
    // },
    {
      isActive: false, iconClass: 'icon-round online',
      ...generateDevice('GATEWAY', modelName['GATEWAY'][1].split('/')[0], '4D:58:E2:88:1D:41', 'Online', 'DBG-X1000-1')
    },
    {
      isActive: false, iconClass: 'icon-round online',
      ...generateDevice('GATEWAY', modelName['GATEWAY'][1].split('/')[1], '57:66:9F:E8:42:07', 'Online', 'DBG-2000-B1-1')
    },
    {
      isActive: false, iconClass: 'icon-round offline',
      ...generateDevice('GATEWAY', modelName['GATEWAY'][1].split('/')[1], '1D:D7:6C:78:B2:03', 'Offline', 'DBG-2000-B1-2')
    },
    {
      isActive: false, iconClass: 'icon-round dormant',
      ...generateDevice('GATEWAY', modelName['GATEWAY'][2], '4A:31:DD:13:BC:3E', 'Dormant', 'DBG-X800-1')
    },
  ];
  fakeDevices.forEach((device, index) => {
    device.title = device.name
  });

  const fakeDevice = { ...fakeDevices[deviceId] };
  fakeDevices[deviceId].isActive = true;

  // Variable
  const forceTab = searchParams.get('forceTab');
  const defaultTab = searchParams.get('tab');
  defaultPaths[3].label = fakeDevice.name;

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [sites, setSites] = useState(generateSiteList());
  const [siteTags, setSiteTags] = useState(generateSiteTagList());
  const [devices, setDevices] = useState(cloneDeep(fakeDevices));
  const [device, setDevice] = useState(cloneDeep(fakeDevice));
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [paths, setPaths] = useState(cloneDeep(defaultPaths));
  const [tabs, setTabs] = useState([]);
  const [pushResults, setPushResults] = useState([]);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeDevice = selectedDevice => {
    const updatedDevices = cloneDeep(devices);
    const updatedPaths = cloneDeep(paths);

    for (const index in updatedDevices) {
      if (updatedDevices[+index].title === selectedDevice.title) {
        updatedDevices[+index].isActive = true;
        setDevice(cloneDeep(updatedDevices[index]));
        updatedPaths[3].label = selectedDevice.name;
      } else {
        updatedDevices[+index].isActive = false;
      }
    }

    setDevices(updatedDevices);
    setPaths(updatedPaths);
    setTabs(cloneDeep(defaultTabs));
    dispatch({ type: configAction.setDevice, payload: selectedDevice });
    dispatch({ type: configAction.setUseProfileConfig, payload: false });
  }

  const changeTab = selectedTab => {
    setSearchParams({});
    const newTabs = cloneDeep(tabs);
    const index = newTabs.findIndex(tab => tab.id === selectedTab.id);

    newTabs.map(tab => tab.isActive = false);
    newTabs[index].isActive = true;
    setTabs(newTabs);

    const newPaths = cloneDeep(paths);
    setPaths(newPaths);

    setMessages(cloneDeep(defaultMessages));
  }

  const pushToDevice = () => {
    setPushResults(getPushToDeviceResult(device));
    changeModalStatus(modalStatus.pushToDeviceResult.self, true);
  }

  // Side effect
  useEffect(() => {
    const updatedDevice = cloneDeep(fakeDevice);
    setDevice(updatedDevice);
    dispatch({ type: configAction.setDevice, payload: updatedDevice });
  }, []);

  useEffect(() => {
    if (!device) {
      return;
    }

    const instancedModel = gwFeature.getDeviceModelInstance(device.modelName);
    const firstLevelFeature = instancedModel.getFirstLevelFeature(gwFeature.configPath.device);
    const updatedTabs = cloneDeep(defaultTabs);

    firstLevelFeature.network && (updatedTabs[2].isShow = true);
    firstLevelFeature.security && (updatedTabs[3].isShow = true);
    firstLevelFeature.vpn && (updatedTabs[4].isShow = true);

    if (defaultTab) {
      const index = defaultTabs.findIndex(tab => tab.value.toLocaleLowerCase() === defaultTab.toLocaleLowerCase())
      if (index > -1) {
        updatedTabs[index].isActive = true;
      }
    } else {
      updatedTabs[0].isActive = true;
    }

    setTabs(updatedTabs);
  }, [device]);

  useEffect(() => {
    if (defaultTab) {
      const index = defaultTabs.findIndex(tab => tab.value.toLocaleLowerCase() === defaultTab.toLocaleLowerCase())
      if (index > -1) {
        changeTab(tabs[index]);
      }
    }
  }, [defaultTab]);

  useEffect(() => {
    if (forceTab) {
      const index = defaultTabs.findIndex(tab => tab.value.toLocaleLowerCase() === forceTab.toLocaleLowerCase())
      if (index > -1) {
        changeTab(tabs[index]);
      }
    }
  }, [forceTab]);

  if (!device || tabs.length === 0) {
    return;
  }

  return (
    <>
      <div className='layout-container breadcrumb--extended'>
        <div>
          <Breadcrumb full={false} pathList={paths} />
        </div>
        <div className='breadcrumb--extended-right-for-device'>
          <DropdownWithItem
            id='dropdown-1'
            type='normal'
            isTruncate={true}
            selectedItem={devices.filter(item => item.isActive)[0]}
            itemList={devices}
            onClick={(item) => changeDevice(item)}
          />
        </div>
      </div>

      <div className='layout-container'>
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
      </div>

      <Tab tabList={tabs.filter(tab => tab.isShow)} changeTab={changeTab}>
        <Button
          label='Apply'
          className={mainStyle['apply-to-device']}
          onClick={() => pushToDevice()}
        />
      </Tab>

      {tabs[0].isActive && <Basic {...{ pushToDevice }} />}
      {tabs[1].isActive && <Summary />}
      {tabs[2].isShow && tabs[2].isActive && <Network />}
      {tabs[3].isShow && tabs[3].isActive && <Security />}
      {tabs[4].isShow && tabs[4].isActive && <Vpn />}
      {tabs[5].isActive && <Tools />}
      {tabs[6].isActive && <License />}

      < PushToDeviceResultModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        pushResultList={pushResults}
      />
    </>
  )
}

export default Nuclias;