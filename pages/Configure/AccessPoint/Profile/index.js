import { useState } from 'react';
import { isEqual } from 'lodash';

// Component
import Children from './children';

// Context
import DataContext from './DataContext';

const Profile = () => {
  // State
  const [ssidBasic, setSsidBasic] = useState(null);
  const [ssidCaptivePortal, setSsidCaptivePortal] = useState(null);
  const [ssidIpFiltering, setSsidIpFiltering] = useState(null);
  const [ssidMacFiltering, setSsidMacFiltering] = useState(null);
  const [ssidScheduleAvailability, setSsidScheduleAvailability] = useState(null);
  const [ssidAdvanced, setSsidAdvanced] = useState(null);
  const [radioBasic, setRadioBasic] = useState(null);
  const [radioChannel, setRadioChannel] = useState(null);
  const [radioAdvanced, setRadioAdvanced] = useState(null);
  const [settings, setSettings] = useState(null);
  ;
  const [changedSsidBasic, setChangedSsidBasic] = useState(null);
  const [changedSsidCaptivePortal, setChangedSsidCaptivePortal] = useState(null);
  const [changedSsidIpFiltering, setChangedSsidIpFiltering] = useState(null);
  const [changedSsidMacFiltering, setChangedSsidMacFiltering] = useState(null);
  const [changedSsidScheduleAvailability, setChangedSsidScheduleAvailability] = useState(null);
  const [changedSsidAdvanced, setChangedSsidAdvanced] = useState(null);
  const [changedRadioBasic, setChangedRadioBasic] = useState(null);
  const [changedRadioChannel, setChangedRadioChannel] = useState(null);
  const [changedRadioAdvanced, setChangedRadioAdvanced] = useState(null);
  const [changedSettings, setChangedSettings] = useState(null)

  return (
    <DataContext.Provider
      value={{
        ssidBasic,
        ssidCaptivePortal,
        ssidIpFiltering,
        ssidMacFiltering,
        ssidScheduleAvailability,
        ssidAdvanced,
        radioBasic,
        radioChannel,
        radioAdvanced,
        settings,
        changedSsidBasic,
        changedSsidCaptivePortal,
        changedSsidIpFiltering,
        changedSsidMacFiltering,
        changedSsidScheduleAvailability,
        changedSsidAdvanced,
        changedRadioBasic,
        changedRadioChannel,
        changedRadioAdvanced,
        changedSettings,
        updateSsidBasic: (data) => setSsidBasic(data),
        updateSsidCaptivePortal: (data) => setSsidCaptivePortal(data),
        updateSsidIpFiltering: (data) => setSsidIpFiltering(data),
        updateSsidMacFiltering: (data) => setSsidMacFiltering(data),
        updateSsidScheduleAvailability: (data) => setSsidScheduleAvailability(data),
        updateSsidAdvanced: (data) => setSsidAdvanced(data),
        updateRadioBasic: (data) => setRadioBasic(data),
        updateRadioChannel: (data) => setRadioChannel(data),
        updateRadioAdvanced: (data) => setRadioAdvanced(data),
        updateSettings: (data) => setSettings(data),
        updateChangedSsidBasic: (data) => setChangedSsidBasic(data),
        updateChangedSsidCaptivePortal: (data) => setChangedSsidCaptivePortal(data),
        updateChangedSsidIpFiltering: (data) => setChangedSsidIpFiltering(data),
        updateChangedSsidMacFiltering: (data) => setChangedSsidMacFiltering(data),
        updateChangedSsidScheduleAvailability: (data) => setChangedSsidScheduleAvailability(data),
        updateChangedSsidAdvanced: (data) => setChangedSsidAdvanced(data),
        updateChangedRadioBasic: (data) => setChangedRadioBasic(data),
        updateChangedRadioChannel: (data) => setChangedRadioChannel(data),
        updateChangedRadioAdvanced: (data) => setChangedRadioAdvanced(data),
        updateChangedSettings: (data) => setChangedSettings(data),
        checkAll: (
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
        ) => {
          return (
            isEqual(ssidBasic, changedSsidBasic) && isEqual(ssidCaptivePortal, changedSsidCaptivePortal) &&
            isEqual(ssidIpFiltering, changedSsidIpFiltering) && isEqual(ssidMacFiltering, changedSsidMacFiltering) &&
            isEqual(ssidScheduleAvailability, changedSsidScheduleAvailability) && isEqual(ssidAdvanced, changedSsidAdvanced) &&
            isEqual(radioBasic, changedRadioBasic) &&
            isEqual(radioChannel, changedRadioChannel) &&
            isEqual(radioAdvanced, changedRadioAdvanced) &&
            isEqual(settings, changedSettings)
          );
        }
      }}
    >
      <Children />
    </DataContext.Provider>
  )
}

export default Profile;