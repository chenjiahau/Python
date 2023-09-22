import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Const
import { deviceType } from 'const/nuclias/device';

// UI
import PushToDeviceResultModal from 'cloudUi/Modals/PushToDeviceResultModal';

// Component
import { Breadcrumb, MessageBoxGroup, Tab, DropdownWithItem } from 'components/';

import Basic from './components/Basic';
import Summary from './components/Summary';
import Ports from './components/Ports';
import AuthenticationSession from './components/AuthenticationSession';
import PowerConsumption from './components/PowerConsumption';
import Tools from './components/Tools';
import License from './components/License';

// Context
import { deviceAction, DeviceContext } from './Context';

// Dummy
import { generateSiteList } from 'dummy/data/site';
import { generateSiteTagList } from 'dummy/data/sitetag';
import { generateDevice } from 'dummy/data/device';
import { getPushToDeviceResult } from 'dummy/data/push';
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
  { label: 'Devices', isLink: true, path: '/cloud/configure/switch/devices' },
  { label: '', isLink: false },
  { label: 'BASIC', isLink: false }
];

const defaultTabList = [
  { id: 1, breadCrumbLabel: 'BASIC', label: 'Basic', value: 'basic', isActive: true },
  { id: 2, breadCrumbLabel: 'SUMMARY', label: 'SUMMARY', value: 'summary', isActive: false },
  { id: 3, breadCrumbLabel: 'PORTS', label: 'PORTS', value: 'ports', isActive: false },
  { id: 4, breadCrumbLabel: 'AUTHENTICATION_SESSION', label: 'AUTHENTICATION TABLE', value: 'authenticationSession', isActive: false },
  { id: 5, breadCrumbLabel: 'POWER_CONSUMPTION', label: 'POWER CONSUMPTION', value: 'powerConsumption', isActive: false },
  { id: 6, breadCrumbLabel: 'TOOLS', label: 'TOOLS', value: 'tools', isActive: false },
  { id: 7, breadCrumbLabel: 'LICENSE', label: 'LICENSE', value: 'license', isActive: false },
];

const defaultModalStatus = {
  pushToDeviceResult: {
    self: 'pushToDeviceResult',
    status: false,
  }
};

const Device = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { dispatch } = useContext(DeviceContext);

  // Fake API
  let i = +searchParams.get('i') || 0;
  const fakeDeviceList = [
    {
      isActive: false, title: 'AP001', iconClass: 'icon-round online',
      ...generateDevice(deviceType.switch, 'DBS-2000', 'EA:E0:0C:14:87:A7', 'Online', null, false, { sw: { portGroup: 10 } })
    },
    {
      isActive: false, title: 'AP002', iconClass: 'icon-round online',
      ...generateDevice(deviceType.switch, 'DBS-2000', '39:8A:AF:9E:F7:01', 'Online', null, false, { sw: { portGroup: 52 } })
    },
    {
      isActive: false, title: 'AP003', iconClass: 'icon-round online',
      ...generateDevice(deviceType.switch, 'DBS-2000', 'A8:77:AE:19:5A:A5', 'Online', null, false, { sw: { portGroup: 28 } })
    },
    {
      isActive: false, title: 'AP004', iconClass: 'icon-round offline',
      ...generateDevice(deviceType.switch, 'DBS-2000', 'FD:E9:71:AE:8F:83', 'Offline', null, false, { sw: { portGroup: 10 } })
    },
    {
      isActive: false, title: 'AP005', iconClass: 'icon-round dormant',
      ...generateDevice(deviceType.switch, 'DBS-2000', '5C:B6:9F:20:1D:E7', 'Dormant', null, false, { sw: { portGroup: 52 } })
    },
  ];

  fakeDeviceList.forEach((device, index) => {
    device.title = device.name
  });

  const fakeDevice = { ...fakeDeviceList[i] };
  fakeDeviceList[i].isActive = true;

  // Variable
  const defaultTab = searchParams.get('tab');
  defaultPathList[3].label = fakeDevice.name;

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [siteList, setSiteList] = useState(generateSiteList());
  const [siteTagList, setSiteTagList] = useState(generateSiteTagList());
  const [deviceList, setDeviceList] = useState(cloneDeep(fakeDeviceList));
  const [device, setDevice] = useState(cloneDeep(fakeDevice));
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [pathList, setPathList] = useState(cloneDeep(defaultPathList));
  const [tabList, setTabList] = useState(cloneDeep(defaultTabList));
  const [pushResultList, setPushResultList] = useState([]);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeDevice = selectedDevice => {
    const updatedDeviceList = cloneDeep(deviceList);
    const updatedPathList = cloneDeep(pathList);

    for (const index in updatedDeviceList) {
      if (updatedDeviceList[+index].title === selectedDevice.title) {
        updatedDeviceList[+index].isActive = true;
        setDevice(cloneDeep(deviceList[index]));

        updatedPathList[3].label = deviceList[index].name;
        setPathList(updatedPathList);
      } else {
        updatedDeviceList[+index].isActive = false;
      }
    }

    setDeviceList(updatedDeviceList);
    setTabList(cloneDeep(defaultTabList));
  }

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
    dispatch({ type: deviceAction.increaseTabChangeTime });
  }

  const pushToDevice = () => {
    setPushResultList(getPushToDeviceResult(device));
    changeModalStatus(modalStatus.pushToDeviceResult.self, true);
  }

  // Side effect
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
      <div className='layout-container breadcrumb--extended'>
        <div>
          <Breadcrumb full={false} pathList={pathList} />
        </div>
        <div className='breadcrumb--extended-right-for-device'>
          <DropdownWithItem
            id='dropdown-1'
            type='normal'
            isTruncate={true}
            selectedItem={deviceList.filter(item => item.isActive)[0]}
            itemList={deviceList}
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

      <Tab tabList={tabList} changeTab={changeTab} />

      {/* Basic */}
      {
        tabList[0].isActive && (
          <Basic
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            device={device}
            pushToDevice={pushToDevice}
          />
        )
      }
      {/* Summary */}
      {
        tabList[1].isActive && (
          <Summary
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            device={device}
            pushToDevice={pushToDevice}
          />
        )
      }
      {/* Ports */}
      {
        tabList[2].isActive && (
          <Ports
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            device={device}
            pushToDevice={pushToDevice}
          />
        )
      }
      {/* Authentication session */}
      {
        tabList[3].isActive && (
          <AuthenticationSession
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            device={device}
            pushToDevice={pushToDevice}
          />
        )
      }
      {/* Power consumption */}
      {
        tabList[4].isActive && (
          <PowerConsumption
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            device={device}
            pushToDevice={pushToDevice}
          />
        )
      }
      {/* Tools */}
      {
        tabList[4].isActive && (
          <Tools
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            device={device}
            pushToDevice={pushToDevice}
          />
        )
      }
      {/* License */}
      {
        tabList[5].isActive && (
          <License
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            device={device}
            pushToDevice={pushToDevice}
          />
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

export default Device;