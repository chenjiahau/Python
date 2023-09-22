import mainStyle from '../../settings.module.scss';

import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// UI
import AddRadiusServerModal from 'cloudUi/Modals/AuthenticationServersModal/AddRadiusServerModal';

// Component
import { Input, DropdownWithItem, TooltipDialog, DropdownWithAdvancedSearch, Button } from 'components/';

// Fake data
import { getRadiusList } from 'dummy/data/radius';
import { generateVlanData } from 'dummy/data/switch/vlan';
import { generateAccessPolicyData } from 'dummy/data/switch/access-policy';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

const defaultModalStatus = {
  addRadius: {
    self: 'addRadius',
    status: false,
  },
};

const defaultAccessPolicyTypeDropdown = [
  { title: '802.1X port-based', isActive: false },
  { title: '802.1X MAC-based', isActive: false },
]

const AccessPolicy = (props) => {
  const { profile } = props;
  const navigate = useNavigate();

  // Fake data
  const fakeRadius = getRadiusList(true);
  const fakeVlanData = generateVlanData();
  const fakeAccessPolicyData = generateAccessPolicyData();

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [form, setForm] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const redirectToProfilePorts = (vlanId) => {
    navigate(`/cloud/configure/switch/profile/${profile.id}/?forceTab=ports&vlan=${vlanId}`);
  }

  const redirectToSwitchPorts = (vlanId) => {
    navigate(`/cloud/configure/switch/switch-ports?vlan=${vlanId}`);
  }

  // Side effect
  useEffect(() => {
    const radiusServer1Dropdown = cloneDeep(fakeRadius);
    const radiusServer2Dropdown = cloneDeep(fakeRadius);
    const radiusServer3Dropdown = cloneDeep(fakeRadius);

    for (const radius of radiusServer1Dropdown) {
      radius.isActive = false;
      if (radius.title === fakeAccessPolicyData.radiusServer1) {
        radius.isActive = true;
        break;
      }
    }

    for (const radius of radiusServer2Dropdown) {
      radius.isActive = false;
      if (radius.title === fakeAccessPolicyData.radiusServer2) {
        radius.isActive = true;
        break;
      }
    }

    for (const radius of radiusServer3Dropdown) {
      radius.isActive = false;
      if (radius.title === fakeAccessPolicyData.radiusServer3) {
        radius.isActive = true;
      }
    }

    !radiusServer1Dropdown.find(item => item.isActive) && (radiusServer1Dropdown[0].isActive = true);
    !radiusServer2Dropdown.find(item => item.isActive) && (radiusServer2Dropdown[0].isActive = true);
    !radiusServer3Dropdown.find(item => item.isActive) && (radiusServer3Dropdown[0].isActive = true);

    const accessPolicyTypeDropdown = cloneDeep(defaultAccessPolicyTypeDropdown);
    for (const accessPolicyType of accessPolicyTypeDropdown) {
      accessPolicyType.isActive = false;
      if (accessPolicyType.title === fakeAccessPolicyData.accessPolicyType) {
        accessPolicyType.isActive = true;
      }
    }

    const vlanDataDropdown = cloneDeep(fakeVlanData);
    vlanDataDropdown.unshift({ id: 0, title: 'Disabled', isActive: false });
    for (const vlan of vlanDataDropdown) {
      vlan.isActive = false;
      if (vlan.title === fakeAccessPolicyData.guestVlan) {
        vlan.isActive = true;
      }
    }

    const updatedForm = {
      name: fakeAccessPolicyData.name,
      radiusServer1: radiusServer1Dropdown,
      radiusServer2: radiusServer2Dropdown,
      radiusServer3: radiusServer3Dropdown,
      accessPolicyType: accessPolicyTypeDropdown,
      guestVlan: fakeAccessPolicyData.guestVlan,
      vlan: vlanDataDropdown,
      memberPort: fakeAccessPolicyData.memberPort,
      switchPorts: fakeAccessPolicyData.switchPorts
    }

    setForm(updatedForm);
  }, []);

  if (!form) {
    return;
  }

  return (
    <>
      <div className={`tab-container-border ${mainStyle['access-policy-container']}`}>
        <div className={mainStyle['block']} >
          {/* Name */}
          <div className='form-group'>
            <div className='form-title required'>
              Policy name *
            </div>
            <div className='form-field'>
              <Input
                type='text'
                placeholder='1 - 64 characters'
                isMiddleSize={true}
                autoComplete="new-email"
                value={form.name}
                onChange={(e) => { }}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
          </div>
          {/* Radius server 1 */}
          <div className='form-group'>
            <div className='form-title required'>
              Radius server1
              <TooltipDialog
                className='ms-1 me-1'
                placement="auto"
                title='You may specify one or multiple RADIUS servers that you would like for your switches to forward access requests. Authentication requests will get processes using the each of the RADIUS servers in the order they are entered.RADIUS accounting is not supported on DBS-2000 series.'
              />
            </div>
            <div className='form-field form-field--horizontal'>
              <DropdownWithItem
                type='normal'
                isMiddleSize={true}
                selectedItem={form.radiusServer1.find(item => item.isActive)}
                itemList={form.radiusServer1}
                onClick={item => { }}
              />
              <div>
                <Button
                  label="Add RADIUS server"
                  className='btn-grey-blue'
                  onClick={() => changeModalStatus(modalStatus.addRadius.self, true)}
                />
              </div>
              <div>
                <Link to="/cloud/configure/authentication/authentication-servers" className='text-decoration-underline'>RADIUS servers</Link>
              </div>
            </div>
          </div>
          {/* Radius server 2 */}
          <div className='form-group'>
            <div className='form-title'>
              Radius server2
            </div>
            <div className='form-field'>
              <DropdownWithItem
                type='normal'
                isMiddleSize={true}
                selectedItem={form.radiusServer2.find(item => item.isActive)}
                itemList={form.radiusServer2}
                onClick={item => { }}
              />
            </div>
          </div>
          {/* Radius server 3 */}
          <div className='form-group'>
            <div className='form-title'>
              Radius server3
            </div>
            <div className='form-field'>
              <DropdownWithItem
                type='normal'
                isMiddleSize={true}
                selectedItem={form.radiusServer3.find(item => item.isActive)}
                itemList={form.radiusServer3}
                onClick={item => { }}
              />
            </div>
          </div>
          {/* Access policy type */}
          <div className='form-group'>
            <div className='form-title'>
              Access policy type
              <TooltipDialog
                className='ms-1 me-1'
                placement="auto"
                title='You may specify one or multiple RADIUS servers that you would like for your switches to forward access requests. Authentication requests will get processes using the each of the RADIUS servers in the order they are entered.RADIUS accounting is not supported on DBS-2000 series.'
              />
            </div>
            <div className='form-field'>
              <DropdownWithItem
                type='normal'
                isMiddleSize={true}
                selectedItem={form.accessPolicyType.find(item => item.isActive)}
                itemList={form.accessPolicyType}
                onClick={item => { }}
              />
            </div>
          </div>
          {/* Guest VLAN */}
          <div className='form-group form-group--align-top'>
            <div className='form-title'>
              Guest VLAN
            </div>
            <div className='form-field'>
              <div style={{ width: '220px' }}>
                <DropdownWithAdvancedSearch
                  id='guest-vlan'
                  type='text'
                  value={form.guestVlan}
                  noIcon={true}
                  placeholder='Disable or 1-4094'
                  alignEnd={true}
                  hasButton={false}
                  isSelectingItem={true}
                  dataBsToggleOnInput={true}
                  dataBsToggleOnButton={true}
                  onChange={e => { }}
                >
                  <li>1-Management VLAN</li>
                  <li>2-Voice VLAN</li>
                </DropdownWithAdvancedSearch>
              </div>
              {/* {
                !form.guestVlan && (
                  <div className='mt-1'>
                    <div className='text-error'>The range should be from 1 to 4094</div>
                  </div>
                )
              } */}
              <div className='mt-2'>
                <span className='redirect-to' onClick={() => redirectToProfilePorts(form.memberPort.profile)}>{form.memberPort.profile}</span> member ports belonging to this guest VLAN in the profile ports.
              </div>
              <div className='mt-2'>
                <span className='redirect-to' onClick={() => redirectToProfilePorts(form.memberPort.current)}>{form.memberPort.current}</span> member ports belonging to this guest VLAN currently.
              </div>
            </div>
          </div>
          {/* Switch ports */}
          <div className='form-group'>
            <div className='form-title'>
              Switch ports
            </div>
            <div className='form-field'>
              <span className='redirect-to' onClick={() => redirectToSwitchPorts(form.switchPorts)}>{form.switchPorts}</span> ports using this policy currently.
            </div>
          </div>

          <div className='apply-btn-group'>
            <Button
              label='Cancel'
              className='btn-cancel me-3'
              onClick={() => { console.log('Click on Cancel') }}
            />
            <Button
              label='Save'
              className='btn-submit'
              onClick={() => { }}
            />
          </div>
        </div>
      </div>

      <AddRadiusServerModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </>
  )
}

export default AccessPolicy;