import mainStyle from './profile.module.scss';

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
import { Breadcrumb, MessageBoxGroup, Tab, ConfirmMessageModal, ButtonWithIcon } from 'components/';

import SSID from './components/SSID';
import Radio from './components/Radio';
import Settings from './components/Settings';

// Hook
import usePrompt, { ConfirmMessageModal1Id, ConfirmMessageModal2Id } from 'hooks/useBlocker';

// Dummy
import { generateSiteList } from 'dummy/data/site';
import { generateSiteTagList } from 'dummy/data/sitetag';
import { generateProfileList } from 'dummy/data/profile';
import { getPushToMultipleDeviceResult } from 'dummy/data/push';
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
  { label: 'Profiles', isLink: true, path: '/cloud/configure/access-point/profiles' },
  { label: '', isLink: false },
  { label: 'BASIC', isLink: false }
];

const defaultTabList = [
  { id: 1, breadCrumbLabel: 'SSID', label: 'SSID', value: 'ssid', isActive: false },
  { id: 2, breadCrumbLabel: 'RADIO', label: 'RADIO', value: 'radio', isActive: false },
  { id: 3, breadCrumbLabel: 'SETTINGS', label: 'SETTINGS', value: 'settings', isActive: false },
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
  const fakerProfileList = generateProfileList(deviceType.ap, 10, true);
  const fakeProfile = { ...fakerProfileList[i] };

  // Context
  const navigatorContext = useContext(NavigationContext);
  const ctx = useContext(DataContext);

  // Variable
  const defaultTab = searchParams.get('tab');
  defaultPathList[3].label = fakeProfile.title;

  // State
  const [stopTransition, setStopTransition] = useState(false);
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

  const {
    ssidBasic, changedSsidBasic,
    ssidCaptivePortal, changedSsidCaptivePortal,
    ssidIpFiltering, changedSsidIpFiltering,
    ssidMacFiltering, changedSsidMacFiltering,
    ssidScheduleAvailability, changedSsidScheduleAvailability,
    ssidAdvanced, changedSsidAdvanced,
    radioBasic, changedRadioBasic,
    radioChannel, changedRadioChannel,
    radioAdvanced, changedRadioAdvanced,
    settings, changedSettings
  } = ctx;

  usePrompt(
    stopTransition,
    !ctx.checkAll(
      ssidBasic, changedSsidBasic,
      ssidCaptivePortal, changedSsidCaptivePortal,
      ssidIpFiltering, changedSsidIpFiltering,
      ssidMacFiltering, changedSsidMacFiltering,
      ssidScheduleAvailability, changedSsidScheduleAvailability,
      ssidAdvanced, changedSsidAdvanced,
      radioBasic, changedRadioBasic,
      radioChannel, changedRadioChannel,
      radioAdvanced, changedRadioAdvanced,
      settings, changedSettings
    )
  );

  const confirmLeaving = (who, answer) => {
    if (answer) {
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

  let savingSelectedTab = null;
  const preChangeTab = selectedTab => {
    if (!ctx.checkAll(
      ssidBasic, changedSsidBasic,
      ssidCaptivePortal, changedSsidCaptivePortal,
      ssidIpFiltering, changedSsidIpFiltering,
      ssidMacFiltering, changedSsidMacFiltering,
      ssidScheduleAvailability, changedSsidScheduleAvailability,
      ssidAdvanced, changedSsidAdvanced,
      radioBasic, changedRadioBasic,
      radioChannel, changedRadioChannel,
      radioAdvanced, changedRadioAdvanced,
      settings, changedSettings
    )) {
      savingSelectedTab = selectedTab;
      document.getElementById(ConfirmMessageModal2Id).hidden = false;
      raiseMainLayoutZIndex();

      return;
    }

    changeTab(selectedTab);
  };

  const changeTab = selectedTab => {
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
    ctx.updateRadioBasic(null);
    ctx.updateChangedRadioBasic(null);
    ctx.updateRadioChannel(null);
    ctx.updateChangedRadioChannel(null);
    ctx.updateRadioAdvanced(null);
    ctx.updateChangedRadioAdvanced(null);
    ctx.updateSettings(null);
    ctx.updateChangedSettings(null);

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
    setPushResultList(getPushToMultipleDeviceResult(profile.deviceList));
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
      </div>

      <div className="layout-container">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
      </div>

      <Tab tabList={tabList} changeTab={preChangeTab}>
        <ButtonWithIcon
          label="PUSH CONFIGURATION"
          iconClassName={profile.syncStatus ? 'icon-push-normal' : 'icon-push-unsync'}
          className={mainStyle['push-to-configuration']}
          onClick={() => pushToDevice()}
        />
      </Tab>

      {
        tabList[0].isActive && (
          <SSID
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            profile={profile}
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
          />
        )
      }
      {
        tabList[1].isActive && (
          <Radio
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            profile={profile}
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
          />
        )
      }
      {
        tabList[2].isActive && (
          <Settings
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            profile={profile}
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