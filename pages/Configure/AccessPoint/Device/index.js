import { useState } from 'react';
import { isEqual } from 'lodash';

// Component
import Children from './children';

// Context
import DataContext from './DataContext';

const Device = () => {
  // State
  const [basic, setBasic] = useState(null);
  const [ssidBasic, setSsidBasic] = useState(null);
  const [ssidCaptivePortal, setSsidCaptivePortal] = useState(null);
  const [ssidIpFiltering, setSsidIpFiltering] = useState(null);
  const [ssidMacFiltering, setSsidMacFiltering] = useState(null);
  const [ssidScheduleAvailability, setSsidScheduleAvailability] = useState(null);
  const [ssidAdvanced, setSsidAdvanced] = useState(null);
  const [radio, setRadio] = useState(null);

  const [changedBasic, setChangedBasic] = useState(null);
  const [changedSsidBasic, setChangedSsidBasic] = useState(null);
  const [changedSsidCaptivePortal, setChangedSsidCaptivePortal] = useState(null);
  const [changedSsidIpFiltering, setChangedSsidIpFiltering] = useState(null);
  const [changedSsidMacFiltering, setChangedSsidMacFiltering] = useState(null);
  const [changedSsidScheduleAvailability, setChangedSsidScheduleAvailability] = useState(null);
  const [changedSsidAdvanced, setChangedSsidAdvanced] = useState(null);
  const [changedRadio, setChangedRadio] = useState(null);

  return (
    <DataContext.Provider
      value={{
        basic,
        ssidBasic,
        ssidCaptivePortal,
        ssidIpFiltering,
        ssidMacFiltering,
        ssidScheduleAvailability,
        ssidAdvanced,
        radio,
        changedBasic,
        changedSsidBasic,
        changedSsidCaptivePortal,
        changedSsidIpFiltering,
        changedSsidMacFiltering,
        changedSsidScheduleAvailability,
        changedSsidAdvanced,
        changedRadio,
        updateBasic: (data) => setBasic(data),
        updateSsidBasic: (data) => setSsidBasic(data),
        updateSsidCaptivePortal: (data) => setSsidCaptivePortal(data),
        updateSsidIpFiltering: (data) => setSsidIpFiltering(data),
        updateSsidMacFiltering: (data) => setSsidMacFiltering(data),
        updateSsidScheduleAvailability: (data) => setSsidScheduleAvailability(data),
        updateSsidAdvanced: (data) => setSsidAdvanced(data),
        updateRadio: (data) => setRadio(data),
        updateChangedBasic: (data) => setChangedBasic(data),
        updateChangedSsidBasic: (data) => setChangedSsidBasic(data),
        updateChangedSsidCaptivePortal: (data) => setChangedSsidCaptivePortal(data),
        updateChangedSsidIpFiltering: (data) => setChangedSsidIpFiltering(data),
        updateChangedSsidMacFiltering: (data) => setChangedSsidMacFiltering(data),
        updateChangedSsidScheduleAvailability: (data) => setChangedSsidScheduleAvailability(data),
        updateChangedSsidAdvanced: (data) => setChangedSsidAdvanced(data),
        updateChangedRadio: (data) => setChangedRadio(data),
        checkAll: (
          basic, changedBasic,
          ssidBasic, changedSsidBasic,
          ssidCaptivePortal, changedSsidCaptivePortal,
          ssidIpFiltering, changedSsidIpFiltering,
          ssidMacFiltering, changedSsidMacFiltering,
          ssidScheduleAvailability, changedSsidScheduleAvailability,
          ssidAdvanced, changedSsidAdvanced,
          radio, changedRadio
        ) => {
          return isEqual(basic, changedBasic) && isEqual(radio, changedRadio) &&
            isEqual(ssidBasic, changedSsidBasic) && isEqual(ssidCaptivePortal, changedSsidCaptivePortal) &&
            isEqual(ssidIpFiltering, changedSsidIpFiltering) && isEqual(ssidMacFiltering, changedSsidMacFiltering) &&
            isEqual(ssidScheduleAvailability, changedSsidScheduleAvailability) && isEqual(ssidAdvanced, changedSsidAdvanced);
        }
      }}
    >
      <Children />
    </DataContext.Provider>
  )
}

export default Device;