import { useState, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { TabSubTab, ConfirmMessageModal } from 'components/';

import Basic from './components/Basic';
import Channel from './components/Channel';
import Advanced from './components/Advanced';

// Context
import DataContext from '../../DataContext';

// Hook
import { ConfirmMessageModal3Id } from 'hooks/useBlocker';

// Default variable
const defaultTabList = [
  { id: 1, label: 'BASIC', value: 'basic', isActive: true },
  { id: 2, label: 'CHANNEL', value: 'channel', isActive: false },
  { id: 3, label: 'ADVANCED', value: 'advanced', isActive: false },
];

const Radio = (props) => {
  const {
    defaultMessages,
    setMessages,
    profile,
    modalStatus,
    changeModalStatus
  } = props;

  const ctx = useContext(DataContext);

  // State
  const [tabList, setTabList] = useState(cloneDeep(defaultTabList));

  // Method
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
    settings, changedSettings,
  } = ctx;

  const confirmLeaving = (answer) => {
    if (answer) {
      changeTab(savingSelectedTab);
    } else {
      document.getElementById(ConfirmMessageModal3Id).hidden = true;
    }

    document.getElementById(ConfirmMessageModal3Id).hidden = true;
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
      document.getElementById(ConfirmMessageModal3Id).hidden = false;
      return;
    }

    savingSelectedTab = selectedTab;
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

    const newTabList = cloneDeep(tabList);
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);

    newTabList.map(tab => tab.isActive = false);
    newTabList[index].isActive = true;
    setTabList(newTabList);
  }

  return (
    <>
      <div className="layout-container layout-container--column layout-container--fluid">
        <TabSubTab tabList={tabList} changeTab={preChangeTab} />

        {
          tabList[0].isActive && (
            <Basic
              modalStatus={modalStatus}
              changeModalStatus={changeModalStatus}
              profile={profile}
            />
          )
        }

        {
          tabList[1].isActive && (
            <Channel
              modalStatus={modalStatus}
              changeModalStatus={changeModalStatus}
              profile={profile}
            />
          )
        }

        {
          tabList[2].isActive && (
            <Advanced
              profile={profile}
            />
          )
        }
      </div>

      <ConfirmMessageModal
        domId={ConfirmMessageModal3Id}
        confirmLeaving={confirmLeaving}
      />
    </>
  );
}

export default Radio;
