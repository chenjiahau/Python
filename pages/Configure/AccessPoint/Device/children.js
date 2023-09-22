import { useState, useEffect, useContext } from 'react';
import { useSearchParams, UNSAFE_NavigationContext as NavigationContext, useNavigate } from "react-router-dom";
import { cloneDeep } from 'lodash';

// Util
import { raiseMainLayoutZIndex, lowerMainLayoutZIndex } from 'utils/dom';

// Const
import { deviceType } from 'const/nuclias/device';

// UI
import AddDhcpServerModal from 'cloudUi/Modals/DhcpSeverModal/AddDhcpServerModal';
import DhcpServerPoolModal from 'cloudUi/Modals/DhcpSeverModal/DhcpServerPoolModal';
import AddRadiusServerModal from 'cloudUi/Modals/AuthenticationServersModal/AddRadiusServerModal';
import AddLdapServerModal from 'cloudUi/Modals/AuthenticationServersModal/AddLdapServerModal';
import AddLocalAuthenticationModal from 'cloudUi/Modals/LocalAuthenticationModal/AddLocalAuthenticationModal';
import AddWalledGardenModal from 'cloudUi/Modals/WalledGardenModal/AddWalledGarednModal';
import AddSmsConfigureModal from 'cloudUi/Modals/SmsConfigurationModal/AddSmsConfigurationModal';
import PushToDeviceResultModal from 'cloudUi/Modals/PushToDeviceResultModal';
import AddMacAclModal from 'cloudUi/Modals/MacAclModal/AddMacAclModal';
import AddIpAclModal from 'cloudUi/Modals/IpAclsModal/AddIpAclModal';
import AddSchedulePolicyModal from 'cloudUi/Modals/SchedulePolicyModal/AddSchedulePolicyModal';

// Component
import { Breadcrumb, MessageBoxGroup, Tab, DropdownWithItem, ConfirmMessageModal } from 'components/';

import Basic from './components/Basic';
import SSID from './components/SSID';
import Radio from './components/Radio';
import Tools from './components/Tools';
import License from './components/License';

// Hook
import usePrompt, { ConfirmMessageModal1Id, ConfirmMessageModal2Id } from 'hooks/useBlocker';

// Dummy
import { generateSiteList } from 'dummy/data/site';
import { generateSiteTagList } from 'dummy/data/sitetag';
import { generateDevice } from 'dummy/data/device';
import { getPushToDeviceResult } from 'dummy/data/push';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

// Context
import DataContext from './DataContext';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'Access Point', isLink: false },
  { label: 'Devices', isLink: true, path: '/cloud/configure/access-point/devices' },
  { label: '', isLink: false },
  { label: 'BASIC', isLink: false }
];

const defaultTabList = [
  { id: 1, breadCrumbLabel: 'BASIC', label: 'Basic', value: 'basic', isActive: true },
  { id: 2, breadCrumbLabel: 'SSID', label: 'SSID', value: 'ssid', isActive: false },
  { id: 3, breadCrumbLabel: 'RADIO', label: 'RADIO', value: 'radio', isActive: false },
  { id: 4, breadCrumbLabel: 'TOOLS', label: 'TOOLS', value: 'tools', isActive: false },
  { id: 5, breadCrumbLabel: 'LICENSE', label: 'LICENSE', value: 'license', isActive: false },
];

const defaultModalStatus = {
  pushToDeviceResult: {
    self: 'pushToDeviceResult',
    status: false,
  },
  addSsid: {
    self: 'addSsid',
    status: false
  },
  deleteSsid: {
    self: 'deleteSsid',
    status: false
  },
  addDhcpServer: {
    self: 'addDhcpServer',
    status: false
  },
  dhcpServerPool: {
    self: 'dhcpServerPool',
    status: false
  },
  addRadius: {
    self: 'addRadius',
    status: false
  },
  addLdap: {
    self: 'addLdap',
    status: false
  },
  addLocalDb: {
    self: 'addLocalDb',
    status: false
  },
  addWalledGarden: {
    self: 'addWalledGarden',
    status: false
  },
  addSms: {
    self: 'addSms',
    status: false
  },
  addMacAcl: {
    self: 'addMacAcl',
    status: false
  },
  addIpAcl: {
    self: 'addIpAcl',
    status: false
  },
  addSchedulePolicy: {
    self: 'addSchedulePolicy',
    status: false
  }
};

const Children = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Fake API
  let i = +searchParams.get('i') || 0;
  const fakeDeviceList = [
    {
      isActive: false, title: 'AP001', iconClass: 'icon-round online',
      ...generateDevice(deviceType.ap, 'DBA-1210P', 'F1:4A:03:3C:02:32', 'Online')
    },
    {
      isActive: false, title: 'AP002', iconClass: 'icon-round online',
      ...generateDevice(deviceType.ap, 'DBA-1510P', '46:EA:61:96:67:B8', 'Online')
    },
    {
      isActive: false, title: 'AP003', iconClass: 'icon-round online',
      ...generateDevice(deviceType.ap, 'DBA-2320P', 'E9:A9:A8:01:B5:EE', 'Online')
    },
    {
      isActive: false, title: 'AP004', iconClass: 'icon-round offline',
      ...generateDevice(deviceType.ap, 'DBA-2620P', 'E0:CD:8A:80:31:37', 'Offline')
    },
    {
      isActive: false, title: 'AP005', iconClass: 'icon-round dormant',
      ...generateDevice(deviceType.ap, 'DBA-1510P', 'B2:0F:73:95:25:DF', 'Dormant')
    },
  ];

  fakeDeviceList.forEach((device, index) => {
    device.title = device.name
  });

  const fakeDevice = { ...fakeDeviceList[i] };
  fakeDeviceList[i].isActive = true;

  // Context
  const navigatorContext = useContext(NavigationContext);
  const ctx = useContext(DataContext);

  // Variable
  const defaultTab = searchParams.get('tab');
  defaultPathList[3].label = fakeDevice.name;

  // State
  const [stopTransition, setStopTransition] = useState(false);
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

  const {
    basic, changedBasic,
    ssidBasic, changedSsidBasic,
    ssidCaptivePortal, changedSsidCaptivePortal,
    ssidIpFiltering, changedSsidIpFiltering,
    ssidMacFiltering, changedSsidMacFiltering,
    ssidScheduleAvailability, changedSsidScheduleAvailability,
    ssidAdvanced, changedSsidAdvanced,
    radio, changedRadio
  } = ctx;

  usePrompt(
    stopTransition,
    !ctx.checkAll(
      basic, changedBasic,
      ssidBasic, changedSsidBasic,
      ssidCaptivePortal, changedSsidCaptivePortal,
      ssidIpFiltering, changedSsidIpFiltering,
      ssidMacFiltering, changedSsidMacFiltering,
      ssidScheduleAvailability, changedSsidScheduleAvailability,
      ssidAdvanced, changedSsidAdvanced,
      radio, changedRadio
    )
  );

  const confirmLeaving = (who, answer) => {
    if (answer) {
      savingSelectedDevice && changeDevice(savingSelectedDevice);
      savingSelectedTab && changeTab(savingSelectedTab);
      who === 1 && setStopTransition(true);
    } else {
      document.getElementById(ConfirmMessageModal2Id).hidden = true;
      who === 1 && setStopTransition(false);
    }

    who === 1 && (document.getElementById(ConfirmMessageModal1Id).hidden = true);
    document.getElementById(ConfirmMessageModal2Id).hidden = true;

    lowerMainLayoutZIndex();
  };

  let savingSelectedDevice = null;
  const preChangeDevice = (selectedDevice) => {
    if (!ctx.checkAll(
      basic, changedBasic,
      ssidBasic, changedSsidBasic,
      ssidCaptivePortal, changedSsidCaptivePortal,
      ssidIpFiltering, changedSsidIpFiltering,
      ssidMacFiltering, changedSsidMacFiltering,
      ssidScheduleAvailability, changedSsidScheduleAvailability,
      ssidAdvanced, changedSsidAdvanced,
      radio, changedRadio
    )) {
      savingSelectedDevice = selectedDevice;
      document.getElementById(ConfirmMessageModal2Id).hidden = false;
      raiseMainLayoutZIndex();

      return;
    }

    changeDevice(selectedDevice);
  }

  const changeDevice = selectedDevice => {
    ctx.updateBasic(null);
    ctx.updateChangedBasic(null);
    ctx.updateSsidBasic(null);
    ctx.updateChangedSsidBasic(null);
    ctx.updateSsidCaptivePortal(null);
    ctx.updateChangedSsidCaptivePortal(null);
    ctx.updateSsidIpFiltering(null);
    ctx.updateChangedSsidIpFiltering(null);
    ctx.updateSsidMacFiltering(null);
    ctx.updateChangedSsidMacFiltering(null);
    ctx.updateSsidScheduleAvailability(null);
    ctx.updateChangedSsidScheduleAvailability(null);
    ctx.updateSsidAdvanced(null);
    ctx.updateChangedSsidAdvanced(null);
    ctx.updateRadio(null);
    ctx.updateChangedRadio(null);

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

  let savingSelectedTab = null;
  const preChangeTab = selectedTab => {
    if (!ctx.checkAll(
      basic, changedBasic,
      ssidBasic, changedSsidBasic,
      ssidCaptivePortal, changedSsidCaptivePortal,
      ssidIpFiltering, changedSsidIpFiltering,
      ssidMacFiltering, changedSsidMacFiltering,
      ssidScheduleAvailability, changedSsidScheduleAvailability,
      ssidAdvanced, changedSsidAdvanced,
      radio, changedRadio
    )) {
      savingSelectedTab = selectedTab;
      document.getElementById(ConfirmMessageModal2Id).hidden = false;
      raiseMainLayoutZIndex();

      return;
    }

    changeTab(selectedTab);
  };

  const changeTab = selectedTab => {
    ctx.updateBasic(null);
    ctx.updateChangedBasic(null);
    ctx.updateSsidBasic(null);
    ctx.updateChangedSsidBasic(null);
    ctx.updateSsidCaptivePortal(null);
    ctx.updateChangedSsidCaptivePortal(null);
    ctx.updateSsidIpFiltering(null);
    ctx.updateChangedSsidIpFiltering(null);
    ctx.updateSsidMacFiltering(null);
    ctx.updateChangedSsidMacFiltering(null);
    ctx.updateSsidScheduleAvailability(null);
    ctx.updateChangedSsidScheduleAvailability(null);
    ctx.updateSsidAdvanced(null);
    ctx.updateChangedSsidAdvanced(null);
    ctx.updateRadio(null);
    ctx.updateChangedRadio(null);

    searchParams.delete('tab');
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
    setPushResultList(getPushToDeviceResult(device));
    changeModalStatus(modalStatus.pushToDeviceResult.self, true);
  }

  // Side effect
  useEffect(() => {
    if (stopTransition) {
      navigatorContext.navigator.lastPath.pathname && navigate(navigatorContext.navigator.lastPath.pathname)
    }
  }, [stopTransition]);

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
      <div className="layout-container breadcrumb--extended">
        <div>
          <Breadcrumb full={false} pathList={pathList} />
        </div>
        <div className="breadcrumb--extended-right-for-device">
          <DropdownWithItem
            id="dropdown-1"
            type="normal"
            isTruncate={true}
            selectedItem={deviceList.filter(item => item.isActive)[0]}
            itemList={deviceList}
            onClick={(item) => preChangeDevice(item)}
          />
        </div>
      </div>

      <div className="layout-container">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
      </div>


      <Tab tabList={tabList} changeTab={preChangeTab} />

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
      {
        tabList[1].isActive && (
          <SSID
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            device={device}
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
            pushToDevice={pushToDevice}
          />
        )
      }
      {
        tabList[2].isActive && (
          <Radio
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            device={device}
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
            pushToDevice={pushToDevice}
          />
        )
      }
      {
        tabList[3].isActive && (
          <Tools
            setMessages={setMessages}
            device={device}
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
            pushToDevice={pushToDevice}
          />
        )
      }
      {
        tabList[4].isActive && (
          <License
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            device={device}
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
            pushToDevice={pushToDevice}
          />
        )
      }

      <AddDhcpServerModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <DhcpServerPoolModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <AddRadiusServerModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <AddLdapServerModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <AddLocalAuthenticationModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <AddWalledGardenModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <AddSmsConfigureModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <AddMacAclModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <AddIpAclModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        siteTagList={siteTagList}
        siteList={siteList}
      />

      <AddSchedulePolicyModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <PushToDeviceResultModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        pushResultList={pushResultList}
      />

      <ConfirmMessageModal
        domId={ConfirmMessageModal1Id}
        confirmLeaving={answer => confirmLeaving(1, answer)}
      />

      <ConfirmMessageModal
        domId={ConfirmMessageModal2Id}
        confirmLeaving={answer => confirmLeaving(2, answer)}
      />
    </>
  )
}

export default Children;