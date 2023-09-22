

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import Func from '../../../../../Func';
import RunAutoChannelModal from 'cloudPages/Configure/AccessPoint/Profile/components/Radio/RunAutoChannelModal';

import FullSize from './FullSize';
import RwdSize from './RwdSize';

// Context
import { ConfigContext } from '../../../../../../Context';
import { WirelessContext } from '../../Context';

// Dummy data
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const defaultModalStatus = {
  runAutoChannel: {
    self: 'runAutoChannel',
    status: false,
  }
};

const radioModeDefinition = {
  f24g: {
    nOnly: 'N Only',
    bG: 'B / G',
    bGN: 'B / G / N',
    bGNAx: 'B / G / N / AX',
  },
  f5g: {
    nOnly: 'N Only',
    aOnly: 'A Only',
    aN: 'A / N',
    aNAc: 'A / N / AC',
    aNAcAx: 'A / N / AC / AX',
  },
};

const channelBandwidthDefinition = {
  f24g: {
    nOnly: [
      '20 MHz',
      '20/40 MHz (Auto)',
    ],
    bG: [
      '20 MHz',
    ],
    bGN: [
      '20 MHz',
      '20/40 MHz (Auto)',
    ],
    bGNAx: [
      '20 MHz',
      '20/40 MHz (Auto)',
    ],
  },
  f5g: {
    nOnly: [
      '20 MHz',
      '20/40 MHz (Auto)',
    ],
    aOnly: [
      '20 MHz',
    ],
    aN: [
      '20 MHz',
      '20/40 MHz (Auto)',
    ],
    aNAc: [
      '20 MHz',
      '20/40 MHz (Auto)',
      '20/40/80 MHz (Auto)',
    ],
    aNAcAx: [
      '20 MHz',
      '20/40 MHz (Auto)',
      '20/40/80 MHz (Auto)',
    ],
  }
}

const Radio = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: wirelessState } = useContext(WirelessContext);

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [f24gForm, setF24gForm] = useState(null);
  const [f5gForm, setF5gForm] = useState(null);
  const [profileF24gForm, setProfileF24gForm] = useState(null);
  const [profileF5gForm, setProfileF5gForm] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);
  const changeF24gValue = getChangeValueEnhanceFn(f24gForm, setF24gForm);
  const changeF5gValue = getChangeValueEnhanceFn(f5gForm, setF5gForm);

  const changeRadioMode = (f, radioMode) => {
    if (f === 'f24g') {
      const updatedF24gForm = cloneDeep(f24gForm);
      updatedF24gForm.radioMode.forEach((item) => {
        item.isActive = false;
        if (item.value === radioMode.value) {
          item.isActive = true;
        }
      });

      updatedF24gForm.channelBandwidth = [];
      let selectedF24gChannelBandwidth = null;
      switch (radioMode.value) {
        case radioModeDefinition.f24g.nOnly:
          selectedF24gChannelBandwidth = channelBandwidthDefinition.f24g.nOnly;
          break;
        case radioModeDefinition.f24g.bG:
          selectedF24gChannelBandwidth = channelBandwidthDefinition.f24g.bG;
          break;
        case radioModeDefinition.f24g.bGN:
          selectedF24gChannelBandwidth = channelBandwidthDefinition.f24g.bGN;
          break;
        case radioModeDefinition.f24g.bGNAx:
          selectedF24gChannelBandwidth = channelBandwidthDefinition.f24g.bGNAx;
          break;
        default:
          break;
      }
      for (const value of selectedF24gChannelBandwidth) {
        updatedF24gForm.channelBandwidth.push({
          title: value,
          value: value,
          isActive: false
        });
      }
      updatedF24gForm.channelBandwidth[0].isActive = true;
      setF24gForm(updatedF24gForm);
    } else {
      const updatedF5gForm = cloneDeep(f5gForm);
      updatedF5gForm.radioMode.forEach((item) => {
        item.isActive = false;
        if (item.value === radioMode.value) {
          item.isActive = true;
        }
      });

      updatedF5gForm.channelBandwidth = [];
      let selectedF5gChannelBandwidth = null;
      switch (radioMode.value) {
        case radioModeDefinition.f5g.nOnly:
          selectedF5gChannelBandwidth = channelBandwidthDefinition.f5g.nOnly;
          break;
        case radioModeDefinition.f5g.aOnly:
          selectedF5gChannelBandwidth = channelBandwidthDefinition.f5g.aOnly;
          break;
        case radioModeDefinition.f5g.aN:
          selectedF5gChannelBandwidth = channelBandwidthDefinition.f5g.aN;
          break;
        case radioModeDefinition.f5g.aNAc:
          selectedF5gChannelBandwidth = channelBandwidthDefinition.f5g.aNAc;
          break;
        case radioModeDefinition.f5g.aNAcAx:
          selectedF5gChannelBandwidth = channelBandwidthDefinition.f5g.aNAcAx;
          break;
        default:
          break;
      }

      for (const value of selectedF5gChannelBandwidth) {
        updatedF5gForm.channelBandwidth.push({
          title: value,
          value: value,
          isActive: false
        });
      }
      updatedF5gForm.channelBandwidth[0].isActive = true;

      setF5gForm(updatedF5gForm);
    }
  }

  const changeEligibleChannels = (f, index) => {
    if (f === 'f24g') {
      if (!f24gForm.autoChannel) {
        return;
      }

      const updatedF24gForm = cloneDeep(f24gForm);
      updatedF24gForm.eligibleChannels[index].state = !updatedF24gForm.eligibleChannels[index].state;
      setF24gForm(updatedF24gForm);
    } else {
      if (!f5gForm.autoChannel) {
        return;
      }

      const updatedF5gForm = cloneDeep(f5gForm);
      updatedF5gForm.eligibleChannels[index].state = !updatedF5gForm.eligibleChannels[index].state;
      setF5gForm(updatedF5gForm);
    }
  }

  // Side effect
  useEffect(() => {
    const { radio: [f24g, f5g] } = wirelessState;

    // 2.4 GHz
    const f24gRadioModeDropdown = [];
    for (const [_, value] of Object.entries(radioModeDefinition.f24g)) {
      f24gRadioModeDropdown.push({
        title: value,
        value: value,
        isActive: false
      });
    }
    f24gRadioModeDropdown.forEach((item) => {
      if (item.value === f24g.radioMode) {
        item.isActive = true;
      }
    });

    const f24gChannelBandwidthDropdown = [];
    let selectedF24gChannelBandwidthDefinition = null;

    switch (f24g.radioMode) {
      case radioModeDefinition.f24g.nOnly:
        selectedF24gChannelBandwidthDefinition = channelBandwidthDefinition.f24g.nOnly;
        break;
      case radioModeDefinition.f24g.bG:
        selectedF24gChannelBandwidthDefinition = channelBandwidthDefinition.f24g.bG;
        break;
      case radioModeDefinition.f24g.bGN:
        selectedF24gChannelBandwidthDefinition = channelBandwidthDefinition.f24g.bGN;
        break;
      case radioModeDefinition.f24g.bGNAx:
        selectedF24gChannelBandwidthDefinition = channelBandwidthDefinition.f24g.bGNAx;
        break;
      default:
        break;
    }
    for (const value of selectedF24gChannelBandwidthDefinition) {
      f24gChannelBandwidthDropdown.push({
        title: value,
        value: value,
        isActive: false
      });
    }
    f24gChannelBandwidthDropdown.forEach((item) => {
      if (item.value === f24g.channelBandwidth) {
        item.isActive = true;
      }
    });

    const f24gChannelDropdown = [];
    const f24gEligibleChannels = [];
    for (const channel of f24g.channels) {
      f24gChannelDropdown.push({
        title: channel.channel,
        value: channel.channel,
        isActive: false,
      });
      f24gEligibleChannels.push(channel);
    }
    f24gChannelDropdown.forEach((item) => {
      if (item.value === f24g.channel) {
        item.isActive = true;
      }
    });

    // 5 GHz
    const f5gRadioModeDropdown = [];
    for (const [_, value] of Object.entries(radioModeDefinition.f5g)) {
      f5gRadioModeDropdown.push({
        title: value,
        value: value,
        isActive: false
      });
    }
    f5gRadioModeDropdown.forEach((item) => {
      if (item.value === f5g.radioMode) {
        item.isActive = true;
      }
    });

    const f5gChannelBandwidthDropdown = [];
    let selectedF5gChannelBandwidthDefinition = null;

    switch (f5g.radioMode) {
      case radioModeDefinition.f5g.nOnly:
        selectedF5gChannelBandwidthDefinition = channelBandwidthDefinition.f5g.nOnly;
        break;
      case radioModeDefinition.f5g.aOnly:
        selectedF5gChannelBandwidthDefinition = channelBandwidthDefinition.f5g.aOnly;
        break;
      case radioModeDefinition.f5g.aN:
        selectedF5gChannelBandwidthDefinition = channelBandwidthDefinition.f5g.aN;
        break;
      case radioModeDefinition.f5g.aNAc:
        selectedF5gChannelBandwidthDefinition = channelBandwidthDefinition.f5g.aNAc;
        break;
      case radioModeDefinition.f5g.aNAcAx:
        selectedF5gChannelBandwidthDefinition = channelBandwidthDefinition.f5g.aNAcAx;
        break;
      default:
        break;
    }
    for (const value of selectedF5gChannelBandwidthDefinition) {
      f5gChannelBandwidthDropdown.push({
        title: value,
        value: value,
        isActive: false
      });
    }
    f5gChannelBandwidthDropdown.forEach((item) => {
      if (item.value === f24g.channelBandwidth) {
        item.isActive = true;
      }
    });

    const f5gChannelDropdown = [];
    const f5gEligibleChannels = [];
    for (const channel of f5g.channels) {
      f5gChannelDropdown.push({
        title: channel.channel,
        value: channel.channel,
        isActive: false,
      });
      f5gEligibleChannels.push(channel);
    }
    f5gChannelDropdown.forEach((item) => {
      if (item.value === f5g.channel) {
        item.isActive = true;
      }
    });

    const updatedForm = {
      f24g: {
        ...f24g,
        radioMode: f24gRadioModeDropdown,
        channelBandwidth: f24gChannelBandwidthDropdown,
        channel: f24gChannelDropdown,
        eligibleChannels: f24gEligibleChannels,
      },
      f5g: {
        ...f5g,
        radioMode: f5gRadioModeDropdown,
        channelBandwidth: f5gChannelBandwidthDropdown,
        channel: f5gChannelDropdown,
        eligibleChannels: f5gEligibleChannels,
      }
    };
    setF24gForm(updatedForm['f24g']);
    setF5gForm(updatedForm['f5g']);
    setProfileF24gForm(updatedForm['f24g']);
    setProfileF5gForm(updatedForm['f5g']);
  }, [wirelessState.radio]);

  if (!f24gForm || !f5gForm) {
    return (
      <Func title='RADIO' />
    )
  }

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;
  const isUseProfileConfig = !isProfilePath && isNotStandalone;
  const sourceF24g = isUseProfileConfig ? profileF24gForm : f24gForm;
  const sourceF5g = isUseProfileConfig ? profileF5gForm : f5gForm;

  return (
    <>
      <Func title='RADIO' last={true}>
        <FullSize
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
          isProfilePath={isProfilePath}
          isUseProfileConfig={isUseProfileConfig}
          f24gForm={sourceF24g}
          f5gForm={sourceF5g}
          changeF24gValue={changeF24gValue}
          changeF5gValue={changeF5gValue}
          changeRadioMode={changeRadioMode}
          changeEligibleChannels={changeEligibleChannels}
        />

        <RwdSize
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
          isProfilePath={isProfilePath}
          isUseProfileConfig={isUseProfileConfig}
          f24gForm={sourceF24g}
          f5gForm={sourceF5g}
          changeF24gValue={changeF24gValue}
          changeF5gValue={changeF5gValue}
          changeRadioMode={changeRadioMode}
          changeEligibleChannels={changeEligibleChannels}
        />
      </Func >

      <RunAutoChannelModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </>
  )
}

export default Radio;