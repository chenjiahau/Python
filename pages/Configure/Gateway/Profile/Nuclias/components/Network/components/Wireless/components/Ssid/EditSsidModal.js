import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Components
import {
  MessageBoxGroup, Input, Button, Checkbox, ModalContainer,
  EditableNameBox, TooltipDialog, DropdownWithItem, InputWithIcon, RadioButton
} from 'components/';

// Dummy data
import { getRadiusList } from 'dummy/data/radius';
import { getSchedulePolicyList } from 'dummy/data/schedule-policy';
import { getMacAclList } from 'dummy/data/mac-acl';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';
import AddRadiusServerModal from 'cloudUi/Modals/AuthenticationServersModal/AddRadiusServerModal';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const securityDefinition = {
  open: 'Open',
  enhancedOpen: 'Enhanced Open',
  enhancedOpenAndOpen: 'Enhanced Open + Open',
  wpa2: 'WPA2',
  wpaOrWpa2: 'WPA / WPA2',
  wpa3: 'WPA3',
  wpa2AndWpa3: 'WPA2 + WPA3',
};

const authMethodDefinition = {
  wpa2: {
    psk: 'PSK',
    radius: 'RADIUS'
  },
  wpa3: {
    sae: 'SAE',
    radius: 'RADIUS'
  },
  wpa2OrWpa3: {
    pskOrSae: 'PSK / SAE',
  },
};

const encryptionDefinition = {
  wpa2: {
    aes: 'AES',
    aesOrTkip: 'AES / TKIP',
  },
  wpa3: {
    aes: 'AES'
  }
};

const EditSsidModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    bridgedInterface,
    selectedSsid,
    addRadiusServer,
    addSchedulePolicy
  } = props;

  // Fake data
  const fakePrimaryRadius = getRadiusList(false);
  const fakeSecondaryRadius = getRadiusList(true);
  const fakeMacAclList = getMacAclList(false);
  const fakeSchedulePolicy = getSchedulePolicyList();

  // State
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [form, setForm] = useState(null);
  const [stage, setStage] = useState(1);
  const [passphraseEye, setPassphraseEye] = useState(true);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  const changeGuestMode = (state) => {
    const updatedForm = cloneDeep(form);
    if (state) {
      updatedForm.guestAccessMode = true;
      updatedForm.stationIsolation = true;
    } else {
      updatedForm.guestAccessMode = false;
    }

    setForm(updatedForm);
  }

  const changeStationIsolation = (state) => {
    const updatedForm = cloneDeep(form);
    if (state) {
      updatedForm.stationIsolation = true;
    } else {
      updatedForm.guestAccessMode = false;
      updatedForm.stationIsolation = false;
    }

    setForm(updatedForm);
  }

  const changeSecurity = (selectedSecurity) => {
    const updatedForm = cloneDeep(form);

    updatedForm.security.forEach(item => {
      if (item.value === selectedSecurity.value) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });

    let selectedAuthMethodDefinition = null;
    if (
      selectedSecurity.value === securityDefinition.wpa2
      || selectedSecurity.value === securityDefinition.wpaOrWpa2
    ) {
      selectedAuthMethodDefinition = authMethodDefinition.wpa2;
    } else if (selectedSecurity.value === securityDefinition.wpa3) {
      selectedAuthMethodDefinition = authMethodDefinition.wpa3;
    } else {
      selectedAuthMethodDefinition = authMethodDefinition.wpa2OrWpa3;
    }

    const authMethodDropdown = [];
    for (const key in selectedAuthMethodDefinition) {
      authMethodDropdown.push({
        title: selectedAuthMethodDefinition[key],
        value: selectedAuthMethodDefinition[key],
        isActive: false,
      });
    }
    authMethodDropdown[0].isActive = true;

    // Encryption
    let selectedEncryptionDefinition = null;
    if (
      selectedSecurity.value === securityDefinition.wpa2
      || selectedSecurity.value === securityDefinition.wpaOrWpa2
    ) {
      selectedEncryptionDefinition = encryptionDefinition.wpa2;
    } else {
      selectedEncryptionDefinition = encryptionDefinition.wpa3;
    }

    const encryptionDropdown = [];
    for (const key in selectedEncryptionDefinition) {
      encryptionDropdown.push({
        title: selectedEncryptionDefinition[key],
        value: selectedEncryptionDefinition[key],
        isActive: false,
      });
    }
    encryptionDropdown[0].isActive = true;

    updatedForm.authMethod = authMethodDropdown;
    updatedForm.encryption = encryptionDropdown;

    setForm(updatedForm);
  }

  // Side effect
  useEffect(() => {
    if (!selectedSsid) {
      return;
    }

    setStage(1);
    const config = cloneDeep(selectedSsid.config);

    // Primary radius
    const primaryRadiusDropdown = [];
    for (const key in fakePrimaryRadius) {
      primaryRadiusDropdown.push({
        title: fakePrimaryRadius[key].title,
        value: fakePrimaryRadius[key].title,
        isActive: false,
      });
    }
    primaryRadiusDropdown.forEach(item => {
      if (item.value === config.primaryRadiusServer) {
        item.isActive = true;
      }
    });

    // Secondary radius
    const secondaryRadiusDropdown = [];
    for (const key in fakeSecondaryRadius) {
      secondaryRadiusDropdown.push({
        title: fakeSecondaryRadius[key].title,
        value: fakeSecondaryRadius[key].title,
        isActive: false,
      });
    }
    if (!config.secondaryRadiusServer) {
      secondaryRadiusDropdown[0].isActive = true;
    } else {
      secondaryRadiusDropdown.forEach(item => {
        if (item.value === config.secondaryRadiusServer) {
          item.isActive = true;
        }
      });
    }

    // MAC ACL
    const macAclDropdown = [];
    for (const key in fakeMacAclList) {
      macAclDropdown.push({
        title: fakeMacAclList[key].title,
        value: fakeMacAclList[key].title,
        isActive: false,
      });
    }
    macAclDropdown[0].isActive = true;

    // Schedule policy
    const schedulePolicyDropdown = [];
    for (const key in fakeSchedulePolicy) {
      schedulePolicyDropdown.push({
        title: fakeSchedulePolicy[key].title,
        value: fakeSchedulePolicy[key].title,
        isActive: false,
      });
    }
    schedulePolicyDropdown.forEach(item => {
      if (item.value === config.schedulePolicy) {
        item.isActive = true;
      }
    });

    // Security
    const securityDropdown = [];
    for (const key in securityDefinition) {
      securityDropdown.push(
        {
          title: securityDefinition[key],
          value: securityDefinition[key],
          isActive: false
        }
      );
    }
    securityDropdown.forEach(item => {
      if (item.value === config.security) {
        item.isActive = true;
      }
    });

    // Auth method
    let selectedAuthMethodDefinition = null;
    if (
      config.security === securityDefinition.wpa2
      || config.security === securityDefinition.wpaOrWpa2
    ) {
      selectedAuthMethodDefinition = authMethodDefinition.wpa2;
    } else if (config.security === securityDefinition.wpa3) {
      selectedAuthMethodDefinition = authMethodDefinition.wpa3;
    } else {
      selectedAuthMethodDefinition = authMethodDefinition.wpa2OrWpa3;
    }

    const authMethodDropdown = [];
    for (const key in selectedAuthMethodDefinition) {
      authMethodDropdown.push({
        title: selectedAuthMethodDefinition[key],
        value: selectedAuthMethodDefinition[key],
        isActive: false,
      });
    }

    authMethodDropdown.forEach(item => {
      if (item.value === config.authMethod) {
        item.isActive = true;
      }
    });

    // Encryption
    let selectedEncryptionDefinition = null;
    if (
      config.security === securityDefinition.wap2
      || config.security === securityDefinition.wpaOrWpa2
    ) {
      selectedEncryptionDefinition = encryptionDefinition.wpa2;
    } else {
      selectedEncryptionDefinition = encryptionDefinition.wpa3;
    }

    const encryptionDropdown = [];
    for (const key in selectedEncryptionDefinition) {
      encryptionDropdown.push({
        title: selectedEncryptionDefinition[key],
        value: selectedEncryptionDefinition[key],
        isActive: false,
      });
    }

    encryptionDropdown.forEach(item => {
      if (item.value === config.encryption) {
        item.isActive = true;
      }
    });

    // Bridge interface
    const bridgedInterfaceDropdown = [];
    for (const iface of bridgedInterface) {
      bridgedInterfaceDropdown.push({
        title: iface.interface,
        value: iface.interface,
        isActive: false,
      });
    }

    bridgedInterfaceDropdown.forEach(item => {
      if (item.value === config.bridgedInterface) {
        item.isActive = true;
      }
    });

    const updatedForm = {
      ...config,
      security: securityDropdown,
      authMethod: authMethodDropdown,
      encryption: encryptionDropdown,
      securityPrimaryRadiusServer: primaryRadiusDropdown,
      securitySecondaryRadiusServer: secondaryRadiusDropdown,
      macAclPrimaryRadiusServer: primaryRadiusDropdown,
      macAclSecondaryRadiusServer: secondaryRadiusDropdown,
      macAclName: macAclDropdown,
      bridgedInterface: bridgedInterfaceDropdown,
      schedulePolicy: schedulePolicyDropdown,
    };

    setForm(updatedForm);
  }, [modalStatus, bridgedInterface])

  if (!form) {
    return;
  }

  const selectedSecurity = form.security.find(item => item.isActive);
  const selectedAuthMethod = form.authMethod.find(item => item.isActive);

  return (
    <ModalContainer
      modalWidthType='modal-1000px'
      openModal={modalStatus.editSsid.status}
      closeModal={() => changeModalStatus(modalStatus.editSsid.self, false)}
    >
      <div className='header'>
        <div className='title'>Edit SSID</div>
      </div>
      <div className='body'>
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
        <div className='form-groups form-group--align-top'>
          {
            stage === 1 ? (
              <>
                {/* SSID name */}
                <div className='form-title required'>
                  SSID name
                </div>
                <div className='form-field'>
                  <EditableNameBox
                    isMiddleSize={true}
                    isInvalid={true}
                    onClickCancelIcon={() => changeValue('name', form.name)}
                    inputFieldOnKeyDown={(e) => { }}
                    inputFieldOnChange={e => changeValue('name', e.target.value)}
                    value={form.name}
                  />
                </div>
                {/* Security */}
                <div className='form-title'>
                  Security
                  <TooltipDialog
                    className='ms-1 me-1'
                    placement='bottom'
                    hasScroll={true}
                    title={ReactDOMServer.renderToString(
                      <Table>
                        <tr>
                          <td className={mainStyle['table-tip-left-td']}>Open:</td>
                          <td>Any user can associate without encryption.</td>
                        </tr>
                        <tr>
                          <td className={mainStyle['table-tip-left-td']}>Enhanced Open:</td>
                          <td>Encryption for open wireless networks that prevents eavesdropping attacks based on Opportunistic Wireless Encryption (OWE). The client devices include Wi-Fi Enhanced Open will benefit from the new protections provided. There is no need for additional user configuration.</td>
                        </tr>
                        <tr>
                          <td className={mainStyle['table-tip-left-td']}>Open + Enhanced Open:</td>
                          <td>Any user can associate. This is deployed in a transition mode which allows for gradual migration from an Open network to a Wi-Fi Enhanced Open network without disruption to users. The client devices include Wi-Fi Enhanced Open will benefit from the new protections provided. There is no need for additional user configuration. This transition mode would be occupied 2 SSIDs per radio from your available SSIDs. Users will only see an Open network to associate.</td>
                        </tr>
                        <tr>
                          <td className={mainStyle['table-tip-left-td']}>WPA2:</td>
                          <td>User credentials are validated with 802.1X association time or users must enter a password to associate.</td>
                        </tr>
                        <tr>
                          <td className={mainStyle['table-tip-left-td']}>WPA3:</td>
                          <td>WPA3 networks use the latest security methods, disallow outdated legacy protocols, and require use of Protected Management. Frames (PMF) to maintain resiliency of mission critical networks. User credentials are validated with 802.1X association time or users must enter a password to associate. Some old devices cannot be associated with AP which enable the WPA3 only.</td>
                        </tr>
                      </Table>
                    )}
                  />
                </div>
                <div className='form-field form-field--dropdown-middle-width'>
                  <DropdownWithItem
                    type='normal'
                    isMiddleSize={true}
                    selectedItem={form.security.find(item => item.isActive)}
                    itemList={form.security}
                    onClick={item => changeSecurity(item)}
                  />
                </div>
                {
                  (
                    selectedSecurity.value !== securityDefinition.open
                    && selectedSecurity.value !== securityDefinition.enhancedOpen
                    && selectedSecurity.value !== securityDefinition.enhancedOpenAndOpen
                  ) && (
                    <>
                      {/* Auth method */}
                      <div className='form-title form-title--indent'>
                        Auth method
                      </div>
                      <div className='form-field form-field--dropdown-middle-width'>
                        <DropdownWithItem
                          type='normal'
                          isMiddleSize={true}
                          selectedItem={form.authMethod.find(item => item.isActive)}
                          disabled={selectedSecurity.value === securityDefinition.wpa2AndWpa3}
                          itemList={form.authMethod}
                          onClick={item => changeValue('authMethod', item)}
                        />
                      </div>
                      {/* Encryption */}
                      <div className='form-title form-title--indent'>
                        Encryption
                      </div>
                      <div className='form-field form-field--dropdown-middle-width'>
                        <DropdownWithItem
                          type='normal'
                          isMiddleSize={true}
                          selectedItem={form.encryption.find(item => item.isActive)}
                          disabled={selectedSecurity.value === securityDefinition.wpa3 || selectedSecurity.value === securityDefinition.wpa2AndWpa3}
                          itemList={form.encryption}
                          onClick={item => changeValue('encryption', item)}
                        />
                      </div>
                      {/* Passphrase */}
                      <div className='form-title form-title--indent required'>
                        Passphrase
                      </div>
                      <div className='form-field form-field--horizontal'>
                        <InputWithIcon
                          type={`${passphraseEye ? 'password' : 'text'}`}
                          placeholder='8-63 characters'
                          autoComplete='new-password'
                          value={form.passphrase}
                          onChange={e => changeValue('passphrase', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                          iconTitle={`${passphraseEye ? 'Hide password' : 'Show password'}`}
                          iconClassName={`${!passphraseEye ? 'icon-close-eye' : 'icon-open-eye'}`}
                          iconOnClick={() => setPassphraseEye(!passphraseEye)}
                        />
                        <div>sec.</div>
                      </div>
                      {/* Group key update interval */}
                      <div className='form-title form-title--indent required'>
                        Group key update interval
                      </div>
                      <div className='form-field'>
                        <Input
                          type='number'
                          value={form.groupKeyUpdateInterval}
                          isMiddleSize={true}
                          placeholder='1-64 characters'
                          onChange={e => changeValue('groupKeyUpdateInterval', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </div>
                      {
                        selectedAuthMethod.value === 'RADIUS' && (
                          <>
                            {/* Primary radius server */}
                            <div className='form-title form-title--indent required'>
                              Primary radius server
                            </div>
                            <div className='form-field form-field--dropdown-middle-width form-field--horizontal'>
                              <DropdownWithItem
                                type='normal'
                                isMiddleSize={true}
                                selectedItem={form.securityPrimaryRadiusServer.find(item => item.isActive)}
                                itemList={form.securityPrimaryRadiusServer}
                                onClick={item => changeValue('securityPrimaryRadiusServer', item)}
                              />
                              <div>
                                <Button
                                  label='Add RADIUS server'
                                  className='btn-grey-blue'
                                  onClick={addRadiusServer}
                                />
                              </div>
                              <div>
                                <Link to='/cloud/configure/authentication/authentication-servers' className='text-decoration-underline'>RADIUS servers</Link>
                              </div>
                            </div>
                            {/* Secondary radius server */}
                            <div className='form-title form-title--indent'>
                              Secondary radius server
                            </div>
                            <div className='form-field form-field--dropdown-middle-width'>
                              <DropdownWithItem
                                type='normal'
                                isMiddleSize={true}
                                selectedItem={form.securitySecondaryRadiusServer.find(item => item.isActive)}
                                itemList={form.securitySecondaryRadiusServer}
                                onClick={item => changeValue('securitySecondaryRadiusServer', item)}
                              />
                            </div>
                          </>
                        )
                      }
                    </>
                  )
                }
                {/* MAC filtering */}
                <div className='form-title'>
                  MAC filtering
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id='mac-filtering-enable'
                    name='macFilteringEnable'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.macFiltering}
                    onChange={() => changeValue('macFiltering', true)}
                  />
                  <RadioButton
                    id='mac-filtering-disable'
                    name='macFilteringDisable'
                    label='Disable'
                    checked={!form.macFiltering}
                    onChange={() => changeValue('macFiltering', false)}
                  />
                </div>
                {
                  form.macFiltering && (
                    <>
                      {/* Filter */}
                      <div className='form-title form-title--indent'>
                        Filter
                      </div>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='filter-enable'
                          name='filterEnable'
                          label='MAC ACLs'
                          hasRightMargin={true}
                          checked={form.filter}
                          onChange={() => changeValue('filter', true)}
                        />
                        <RadioButton
                          id='filter-disable'
                          name='filterDisable'
                          label='RADIUS server'
                          checked={!form.filter}
                          onChange={() => changeValue('filter', false)}
                        />
                      </div>
                      {
                        form.filter ? (
                          <>
                            {/* MAC ACL policy */}
                            <div className='form-title form-title--indent'>
                              MAC ACL policy
                            </div>
                            <div className='form-field form-field--horizontal'>
                              <RadioButton
                                id='mac-acl-policy-enable'
                                name='macAclPolicyEnable'
                                label='Allow'
                                hasRightMargin={true}
                                checked={form.filter}
                                onChange={() => changeValue('filter', true)}
                              />
                              <RadioButton
                                id='mac-acl-policy-disable'
                                name='macAclPolicyDisable'
                                label='Deny'
                                checked={!form.filter}
                                onChange={() => changeValue('filter', false)}
                              />
                            </div>
                            {/* MAC ACL name */}
                            <div className='form-title form-title--indent'>
                              MAC ACL name
                            </div>
                            <div className='form-field form-field--dropdown-middle-width'>
                              <DropdownWithItem
                                type='normal'
                                isMiddleSize={true}
                                selectedItem={form.macAclName.find(item => item.isActive)}
                                itemList={form.macAclName}
                                onClick={item => changeValue('macAclName', item)}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Primary radius server */}
                            <div className='form-title form-title--indent required'>
                              Primary radius server
                            </div>
                            <div className='form-field form-field--dropdown-middle-width form-field--horizontal'>
                              <DropdownWithItem
                                type='normal'
                                isMiddleSize={true}
                                selectedItem={form.macAclPrimaryRadiusServer.find(item => item.isActive)}
                                itemList={form.macAclPrimaryRadiusServer}
                                onClick={item => changeValue('macAclPrimaryRadiusServer', item)}
                              />
                              <div>
                                <Button
                                  label='Add RADIUS server'
                                  className='btn-grey-blue'
                                  onClick={addRadiusServer}
                                />
                              </div>
                              <div>
                                <Link to='/cloud/configure/authentication/authentication-servers' className='text-decoration-underline'>RADIUS servers</Link>
                              </div>
                            </div>
                            {/* Secondary radius server */}
                            <div className='form-title form-title--indent'>
                              Secondary radius server
                            </div>
                            <div className='form-field form-field--dropdown-middle-width'>
                              <DropdownWithItem
                                type='normal'
                                isMiddleSize={true}
                                selectedItem={form.macAclSecondaryRadiusServer.find(item => item.isActive)}
                                itemList={form.macAclSecondaryRadiusServer}
                                onClick={item => changeValue('macAclSecondaryRadiusServer', item)}
                              />
                            </div>
                          </>
                        )
                      }
                    </>
                  )
                }
                {/* Broadcast SSID */}
                <div className='form-title'>
                  Broadcast SSID
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id='broad-cast-enable'
                    name='broadCastEnable'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.broadcast}
                    onChange={() => changeValue('broadcast', true)}
                  />
                  <RadioButton
                    id='broad-cast-disable'
                    name='broadCastDisable'
                    label='Disable'
                    checked={!form.broadcast}
                    onChange={() => changeValue('broadcast', false)}
                  />
                </div>
                {/* Band selection */}
                <div className='form-title'>
                  Band selection
                </div>
                <div className='form-field form-field--horizontal'>
                  <Checkbox
                    id='band-24ghz'
                    htmlFor='band-24ghz'
                    type='checkbox'
                    label='2.4 GHz'
                    checked={form.f24g}
                    onChange={() => changeValue('f24g', !form.f24g)}
                  />
                  <Checkbox
                    id='band-5ghz'
                    htmlFor='band-5ghz'
                    type='checkbox'
                    label='5 GHz'
                    checked={form.f5g}
                    onChange={() => changeValue('f24g', !form.f5g)}
                  />
                  {
                    form.f24g && form.f5g && (
                      <Checkbox
                        id='band-steering'
                        htmlFor='band-steering'
                        type='checkbox'
                        label='Band Steering'
                        checked={form.bandSelection}
                        onChange={() => changeValue('bandSelection', !form.bandSelection)}
                      />
                    )
                  }
                </div>
                {/* Guest access mode */}
                <div className='form-title'>
                  Guest access mode
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id='guest-access-mode-enable'
                    name='guestAccessModeEnable'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.guestAccessMode}
                    onChange={() => changeGuestMode(true)}
                  />
                  <RadioButton
                    id='guest-access-mode-disable'
                    name='guestAccessModeDisable'
                    label='Disable'
                    checked={!form.guestAccessMode}
                    onChange={() => changeGuestMode(false)}
                  />
                </div>
                {/* Station isolation */}
                <div className='form-title'>
                  Station isolation
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id='station-isolation-enable'
                    name='stationIsolationEnable'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.stationIsolation}
                    onChange={() => changeStationIsolation(true)}
                  />
                  <RadioButton
                    id='station-isolation-disable'
                    name='stationIsolationDisable'
                    label='Disable'
                    checked={!form.stationIsolation}
                    onChange={() => changeStationIsolation(false)}
                  />
                </div>
                {/* NAS IP address */}
                <div className='form-title'>
                  NAS IP address(optional)
                  <TooltipDialog
                    className='ms-1 me-1'
                    placement='bottom'
                    hasScroll={true}
                    title='NAS-IP-address (Network access server IP address) is used to notify the RADIUS access request source, which enables the RADIUS server to choose a policy for that request.'
                  />
                </div>
                <div className='form-field'>
                  <Input
                    type='text'
                    value={form.nasIpAddress}
                    isMiddleSize={true}
                    placeholder='e.g. 10.2.1.1'
                    onChange={e => changeValue('nasIpAddress', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </div>
                {/* Bridged to interface */}
                <div className='form-title'>
                  Bridged to interface
                </div>
                <div className='form-field form-field--dropdown-middle-width'>
                  <DropdownWithItem
                    type='normal'
                    isMiddleSize={true}
                    selectedItem={form.bridgedInterface.find(item => item.isActive)}
                    itemList={form.bridgedInterface}
                    onClick={item => changeValue('bridgedInterface', item)}
                  />
                </div>
                {
                  selectedAuthMethod.value === 'RADIUS' && (
                    <>
                      {/* Dynamic VLAN IDs */}
                      <div className='form-title'>
                        Dynamic VLAN IDs(optional)
                        <TooltipDialog
                          className='ms-1 me-1'
                          placement='bottom'
                          hasScroll={true}
                          title='A list of the allowed dynamic VLAN IDs, separated by commas. The VLAN ID of the associated client is assigned by the RADIUS server. Only when the assigned VLAN ID is in this list will be allowed access to the network.'
                        />
                      </div>
                      <div className='form-field'>
                        <Input
                          type='text'
                          value={form.dynamicVlanId}
                          isMiddleSize={true}
                          placeholder='e.g. 100,200,300'
                          onChange={e => changeValue('dynamicVlanId', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </div>
                    </>
                  )
                }
                {/* Schedule policy */}
                <div className='form-title'>
                  Schedule policy
                </div>
                <div className='form-field form-field--dropdown-middle-width form-field--horizontal'>
                  <DropdownWithItem
                    type='normal'
                    isMiddleSize={true}
                    selectedItem={form.schedulePolicy.find(item => item.isActive)}
                    itemList={form.schedulePolicy}
                    onClick={item => changeValue('schedulePolicy', item)}
                  />
                  <div>
                    <Button
                      label='Add Schedule policy'
                      className='btn-grey-blue'
                      onClick={addSchedulePolicy}
                    />
                  </div>
                  <div>
                    <Link to='/cloud/configure/schedule-policies' className='text-decoration-underline'>Schedule policy</Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* MAX clients */}
                <div className='form-title required'>
                  MAX clients
                </div>
                <div className='form-field'>
                  <Input
                    type='number'
                    value={form.maxClients}
                    isMiddleSize={true}
                    placeholder='1-64'
                    onChange={e => changeValue('maxClients', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </div>
                {/* MAX allowed clients retries */}
                <div className='form-title required'>
                  MAX allowed clients retries
                  <TooltipDialog
                    className='ms-1 me-1'
                    placement='bottom'
                    hasScroll={true}
                    title='Setting this to 0 prevents clients from connecting to this SSID at all when the number of connected clients on this SSID is already at the maximum'
                  />
                </div>
                <div className='form-field'>
                  <Input
                    type='number'
                    value={form.maxAllowedClientsRetries}
                    isMiddleSize={true}
                    placeholder='0-10'
                    onChange={e => changeValue('maxAllowedClientsRetries', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </div>
                {/* MAX upstream */}
                <div className='form-title required'>
                  MAX upstream
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type='number'
                    value={form.maxUpstream}
                    isMiddleSize={true}
                    placeholder='0-900000'
                    onChange={e => changeValue('maxUpstream', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>Kbps</div>
                </div>
                {/* MAX downstream */}
                <div className='form-title required'>
                  MAX downstream
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type='number'
                    value={form.maxDownstream}
                    isMiddleSize={true}
                    placeholder='0-900000'
                    onChange={e => changeValue('maxDownstream', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>Kbps</div>
                </div>
                {/* MAX client upstream */}
                <div className='form-title required'>
                  MAX client upstream
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type='number'
                    value={form.maxClientUpstream}
                    isMiddleSize={true}
                    placeholder='0-900000'
                    onChange={e => changeValue('maxClientUpstream', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>Kbps</div>
                </div>
                {/* MAX client downstream */}
                <div className='form-title required'>
                  MAX client downstream
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type='number'
                    value={form.maxClientDownstream}
                    isMiddleSize={true}
                    placeholder='0-900000'
                    onChange={e => changeValue('maxClientDownstream', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>Kbps</div>
                </div>
                {/* Forward Bonjour pkts */}
                <div className='form-title'>
                  Forward Bonjour pkts
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id='forward-bonjour-pkts-enable'
                    name='forwardBonjourPaksEnable'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.forwardBonjourPkts}
                    onChange={() => changeValue('forwardBonjourPkts', true)}
                  />
                  <RadioButton
                    id='forward-bonjour-pkts-disable'
                    name='forwardBonjourPktsDisable'
                    label='Disable'
                    checked={!form.forwardBonjourPkts}
                    onChange={() => changeValue('forwardBonjourPkts', false)}
                  />
                </div>
                {/* IGMP snooping */}
                <div className='form-title'>
                  IGMP snooping
                  <TooltipDialog
                    className='ms-1 me-1'
                    placement='bottom'
                    hasScroll={true}
                    title='Enable IGMP snooping to convert multicast packets to the unicast packets to the multicast subscriber wireless clients associated with this SSID.'
                  />
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id='igmp-snooping-enable'
                    name='igmpSnoopingEnable'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.igmpSnooping}
                    onChange={() => changeValue('igmpSnooping', true)}
                  />
                  <RadioButton
                    id='igmp-snooping-disable'
                    name='igmpSnoopingDisable'
                    label='Disable'
                    checked={!form.igmpSnooping}
                    onChange={() => changeValue('igmpSnooping', false)}
                  />
                </div>
                {/* MAX multicast ingress */}
                <div className='form-title required'>
                  MAX multicast ingress
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type='number'
                    value={form.maxMulticastIngress}
                    isMiddleSize={true}
                    placeholder='0-900000'
                    onChange={e => changeValue('maxMulticastIngress', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>Kbps</div>
                </div>
                {/* RTS threshold */}
                <div className='form-title required'>
                  RTS threshold
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type='number'
                    value={form.rtsThreshold}
                    isMiddleSize={true}
                    placeholder='256-2357'
                    onChange={e => changeValue('rtsThreshold', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>Kbps</div>
                </div>
                {/* Fragmentation threshold */}
                <div className='form-title required'>
                  Fragmentation threshold
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type='number'
                    value={form.fragmentationThreshold}
                    isMiddleSize={true}
                    placeholder='257-2346'
                    onChange={e => changeValue('fragmentationThreshold', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>Kbps</div>
                </div>
                {/* Force roaming */}
                <div className='form-title'>
                  Force roaming
                  <TooltipDialog
                    className='ms-1 me-1'
                    placement='bottom'
                    hasScroll={true}
                    title='Force client to roam when signal strength is lower than threshold. If weak signal exception is enabled, will allow client to connect but only after the specified number of retries.'
                  />
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id='force-roaming-enable'
                    name='forceFoamingEnable'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.forceRoaming}
                    onChange={() => changeValue('forceRoaming', true)}
                  />
                  <RadioButton
                    id='force-roaming-disable'
                    name='forceFoamingDisable'
                    label='Disable'
                    checked={!form.forceRoaming}
                    onChange={() => changeValue('forceRoaming', false)}
                  />
                </div>
                {
                  form.forceRoaming && (
                    <>
                      {/* Signal strength threshold */}
                      <div className='form-title form-title--indent required'>
                        Signal strength threshold
                      </div>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='number'
                          value={form.fragmentationThreshold}
                          isMiddleSize={true}
                          placeholder='-100-0'
                          onChange={e => changeValue('signalStrengthThreshold', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                        <div>dBm</div>
                      </div>
                      {/* Enable weak signal exception */}
                      <div className='form-title form-title--indent'>
                        Enable weak signal exception
                      </div>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='enable-weak-signal-exception-enable'
                          name='enableWeakSignalExceptionEnable'
                          label='Enable'
                          hasRightMargin={true}
                          checked={form.enableWeakSignalException}
                          onChange={() => changeValue('enableWeakSignalException', true)}
                        />
                        <RadioButton
                          id='enable-weak-signal-exception-disable'
                          name='enableWeakSignalExceptionDisable'
                          label='Disable'
                          checked={!form.enableWeakSignalException}
                          onChange={() => changeValue('enableWeakSignalException', false)}
                        />
                      </div>
                      {/* Allow weak RSSI client associations after */}
                      {
                        form.enableWeakSignalException && (
                          <>
                            <div className='form-title form-title--indent required'>
                              Allow weak RSSI client associations after
                            </div>
                            <div className='form-field form-field--horizontal'>
                              <Input
                                type='number'
                                value={form.allowWeakRssiClientAssociationsAfter}
                                isMiddleSize={true}
                                placeholder='1-10'
                                onChange={e => changeValue('allowWeakRssiClientAssociationsAfter', e.target.value)}
                                onFocus={() => { }}
                                onBlur={() => { }}
                              />
                              <div>dBm</div>
                            </div>
                          </>
                        )
                      }

                    </>
                  )
                }
              </>
            )
          }
        </div>
      </div>
      <div className='footer justify-content-between'>
        <div>
          <Button
            label='Cancel'
            className='btn-cancel'
            onClick={() => changeModalStatus(modalStatus.editSsid.self, false)}
          />
        </div>
        <div>
          {
            stage === 1 ? (
              <Button
                label='Next'
                className='btn-submit'
                onClick={() => setStage(2)}
              />
            ) : (
              <>
                <Button
                  label='Previous'
                  className='btn-cancel space'
                  onClick={() => setStage(1)}
                />
                <Button
                  label='Save'
                  className='btn-submit'
                  onClick={() => changeModalStatus(modalStatus.editSsid.self, false)}
                />
              </>

            )
          }
        </div>
      </div>
    </ModalContainer>
  );
};

export default EditSsidModal;
