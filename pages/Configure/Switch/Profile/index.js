import { useState } from 'react';
import { isEqual } from 'lodash';

// Component
import Children from './children';

// Context
import DataContext from './DataContext';

const Profile = () => {
  // State
  const [settingsBasic, setSettingsBasic] = useState(null);
  const [settingsAcl, setSettingsAcl] = useState(null);
  const [settingsAccessPolicy, setSettingsAccessPolicy] = useState(null);
  const [settingsIgmpSnooping, setSettingsIgmpSnooping] = useState(null);
  const [changedSettingsBasic, setChangedSettingsBasic] = useState(null);
  const [changedSettingsAcl, setChangedSettingsAcl] = useState(null);
  const [changedSettingsAccessPolicy, setChangedSettingsAccessPolicy] = useState(null);
  const [changedSettingsIgmpSnooping, setChangedSettingsIgmpSnooping] = useState(null);

  return (
    <DataContext.Provider
      value={{
        settingsBasic,
        settingsAcl,
        settingsAccessPolicy,
        settingsIgmpSnooping,
        changedSettingsBasic,
        changedSettingsAcl,
        changedSettingsAccessPolicy,
        changedSettingsIgmpSnooping,
        updateSettingsBasic: (data) => setSettingsBasic(data),
        updateSettingsAcl: (data) => setSettingsAcl(data),
        updateSettingsAccessPolicy: (data) => setSettingsAccessPolicy(data),
        updateSettingsIgmpSnooping: (data) => setSettingsIgmpSnooping(data),
        updateChangedSettingsBasic: (data) => setChangedSettingsBasic(data),
        updateChangedSettingsAcl: (data) => setChangedSettingsAcl(data),
        updateChangedSettingsAccessPolicy: (data) => setChangedSettingsAccessPolicy(data),
        updateChangedSettingsIgmpSnooping: (data) => setChangedSettingsIgmpSnooping(data),
        checkAll: (
          settingsBasic, changedSettingsBasic,
          settingsAcl, changedSettingsAcl,
          settingsAccessPolicy, changedSettingsAccessPolicy,
          settingsIgmpSnooping, changedSettingsIgmpSnooping
        ) => {
          return (
            isEqual(settingsBasic, changedSettingsBasic) &&
            isEqual(settingsAcl, changedSettingsAcl) &&
            isEqual(settingsAccessPolicy, changedSettingsAccessPolicy) &&
            isEqual(settingsIgmpSnooping, changedSettingsIgmpSnooping)
          );
        }
      }}
    >
      <Children />
    </DataContext.Provider>
  )
}

export default Profile;