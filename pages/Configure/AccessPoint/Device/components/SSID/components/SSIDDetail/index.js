import { useState, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Util
import { raiseMainLayoutZIndex, lowerMainLayoutZIndex } from 'utils/dom';

// Component
import { TabSubTab, ConfirmMessageModal } from 'components/';

import Basic from './components/Basic';
import AccessControl from './components/AccessControl';
import CaptivePortal from './components/CaptivePortal';
import ScheduleAvailability from './components/ScheduleAvailability';
import Advanced from './components/Advanced';

// Context
import DataContext from '../../../../DataContext';

// Hook
import { ConfirmMessageModal3Id } from 'hooks/useBlocker';

// Default variable
const defaultTabList = [
  { id: 1, label: 'BASIC', value: 'basic', isActive: true },
  { id: 2, label: 'CAPTIVE PORTAL', value: 'captivePortal', isActive: false },
  { id: 3, label: 'ACCESS CONTROL', value: 'accessControl', isActive: false },
  { id: 4, label: 'SCHEDULE AVAILABILITY', value: 'scheduleAvailability', isActive: false },
  { id: 5, label: 'ADVANCED', value: 'advanced', isActive: false },
];

const SSIDDetail = (props) => {
  const {
    defaultMessages,
    setMessages,
    modalStatus,
    changeModalStatus,
    selectedSsid,
    pushToDevice
  } = props;

  const ctx = useContext(DataContext);

  // State
  const [tabList, setTabList] = useState(cloneDeep(defaultTabList));

  // Method
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

  const confirmLeaving = (answer) => {
    if (answer) {
      changeTab(savingSelectedTab);
    } else {
      document.getElementById(ConfirmMessageModal3Id).hidden = true;
    }

    document.getElementById(ConfirmMessageModal3Id).hidden = true;
    lowerMainLayoutZIndex();
  };

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
      document.getElementById(ConfirmMessageModal3Id).hidden = false;
      raiseMainLayoutZIndex();

      return;
    }

    savingSelectedTab = selectedTab;
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
              selectedSsid={selectedSsid}
              pushToDevice={pushToDevice}
            />
          )
        }

        {
          tabList[1].isActive && (
            <CaptivePortal
              modalStatus={modalStatus}
              changeModalStatus={changeModalStatus}
              selectedSsid={selectedSsid}
              pushToDevice={pushToDevice}
            />
          )
        }

        {
          tabList[2].isActive && (
            <AccessControl
              modalStatus={modalStatus}
              changeModalStatus={changeModalStatus}
              selectedSsid={selectedSsid}
              pushToDevice={pushToDevice}
            />
          )
        }

        {
          tabList[3].isActive && (
            <ScheduleAvailability
              modalStatus={modalStatus}
              changeModalStatus={changeModalStatus}
              selectedSsid={selectedSsid}
              pushToDevice={pushToDevice}
            />
          )
        }

        {
          tabList[4].isActive && (
            <Advanced
              modalStatus={modalStatus}
              changeModalStatus={changeModalStatus}
              selectedSsid={selectedSsid}
              pushToDevice={pushToDevice}
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

export default SSIDDetail;
