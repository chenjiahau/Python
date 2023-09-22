import mainStyle from '../../../settings.module.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component
import { TooltipDialog, DropdownWithAdvancedSearch } from 'components/';

// Fake data
import { generateVlanData } from 'dummy/data/switch/basic/vlan';

const Vlan = (props) => {
  const { profile } = props;
  const navigate = useNavigate();

  // Fake data
  const fakeVlanData = generateVlanData();

  // State
  const [vlanId, setVlanId] = useState('');

  // Method
  const redirectToProfilePorts = () => {
    navigate(`/cloud/configure/switch/profile/${profile.id}/?forceTab=ports&vlan=${vlanId}`);
  }

  const redirectToSwitchPorts = () => {
    navigate(`/cloud/configure/switch/switch-ports?vlan=${vlanId}`);
  }

  // Side effect
  useEffect(() => {
    setVlanId(fakeVlanData.vlanId);
  }, []);

  return (
    <>
      <div className='text-title'>VLAN CONFIGURATION</div>
      <div className={mainStyle['detail']} >
        <div>
          <div className='form-title required'>
            VLAN ID
            <TooltipDialog
              className='ms-1 me-1'
              placement='auto'
              title="If there is not a member port belonging to the management VLAN, the management traffic, such as accessing the D-Link Cloud switch, cannot access the D-Link Cloud switch"
            />
          </div>
        </div>
        <div>
          <div className={`${mainStyle['block']} ${mainStyle['two-column-block']}`}>
            <DropdownWithAdvancedSearch
              type='number'
              value={vlanId}
              placeholder='1-4094'
              alignEnd={true}
              hasButton={false}
              noIcon={true}
              isSelectingItem={true}
              dataBsToggleOnInput={true}
              dataBsToggleOnButton={true}
              onChange={e => { }}
            >
              <li>1-Management VLAN</li>
              <li>2-Voice VLAN</li>
            </DropdownWithAdvancedSearch>
            {/* <div className='text-error'>The range should be from 1 to 4094</div> */}
          </div>
          <div className={mainStyle['block']}>
            <span className='redirect-to' onClick={redirectToProfilePorts}>90</span> member ports belonging to this management VLAN in the profile ports.
          </div>
          <div className={mainStyle['block']}>
            <span className='redirect-to' onClick={redirectToSwitchPorts}>89</span> member ports belonging to this management VLAN currently.
          </div>
        </div>
      </div>
    </>
  )
}

export default Vlan;