import mainStyle from '../../../ssid.module.scss';

import { useState, useEffect, useContext } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  Button, Input, InputWithIcon, Checkbox, RadioButton, DropdownWithItem,
  TooltipDialog, EditableNameBox
} from 'components/';

// Context
import DataContext from '../../../../../DataContext';

// Dummy data & util
import { getRadiusList } from 'dummy/data/radius';
import { getDhcpSeverList } from 'dummy/data/dhcp';
import { getChangeValueFn } from 'dummy/utils/changeValue';

const Basic = (props) => {
  const {
    modalStatus,
    changeModalStatus,
    selectedSsid
  } = props;

  const ctx = useContext(DataContext);

  // Faker API data
  const radiusList = getRadiusList();
  const dhcpServerList = getDhcpSeverList();

  // State
  const [form, setForm] = useState();

  // Method
  const changeValue = getChangeValueFn(form, setForm);

  const changeName = (updatedForm, field, value) => {
    updatedForm[field].value = value;
    (value.length !== 0) && (updatedForm.name.isValid = true);
    (value.length === 0) && (updatedForm.name.isValid = false);
  }

  const changeSecurity = (updatedForm, field, value) => {
    for (const item of updatedForm[field].list) {
      if (item.title !== value.title) {
        item.isActive = false;
      } else {
        item.isActive = true;
        updatedForm[field].selected = item;
      }
    }

    updatedForm.authMethod.list.forEach(authMethod => authMethod.isActive = false);
    updatedForm.authMethod.list[0].isActive = true;
    updatedForm.authMethod.selected = updatedForm.authMethod.list[0];

    updatedForm.encryption.list.forEach(encryption => encryption.isActive = false);
    updatedForm.encryption.list[0].isActive = true;
    updatedForm.encryption.selected = updatedForm.encryption.list[0];

    updatedForm.authMethod.isShow = false;
    updatedForm.encryption.isShow = false;
    updatedForm.encryption.isEnabled = false;
    updatedForm.passphrase.isShow = false;
    updatedForm.gkuInterval.isShow = false;
    updatedForm.primaryRadius.isShow = false;
    updatedForm.secondaryRadius.isShow = false;

    if (['Enhanced Open', 'Enhanced Open + Open'].includes(updatedForm.security.selected.title)) {
      updatedForm.encryption.isShow = true;
      updatedForm.encryption.isEnabled = false;
    }

    if (['WPA2', 'WPA/WPA2', 'WPA3', 'WPA2/WPA3'].includes(updatedForm.security.selected.title)) {
      updatedForm.authMethod.isShow = true;
      updatedForm.encryption.isShow = true;
      updatedForm.encryption.isEnabled = true;
      updatedForm.passphrase.isShow = true;
      updatedForm.passphrase.passphrase = true;
      updatedForm.gkuInterval.isShow = true;
    }
  }

  const changeAuthMethod = (updatedForm, field, value) => {
    for (const item of updatedForm[field].list) {
      if (item.title !== value.title) {
        item.isActive = false;
      } else {
        item.isActive = true;
        updatedForm.authMethod.selected = item;
      }
    }

    updatedForm.primaryRadius.isShow = false;
    updatedForm.secondaryRadius.isShow = false;

    if (value.title === 'Radius') {
      updatedForm.primaryRadius.isShow = true;
      updatedForm.secondaryRadius.isShow = true;
      updatedForm.primaryRadius.list[0].isActive = true
      updatedForm.primaryRadius.selected = updatedForm.primaryRadius.list[0];
    }
  }

  const changeSpeed = (updatedForm, field, value) => {
    updatedForm[field].value = value;

    if (!updatedForm['speed24Ghz'].value || !updatedForm['speed5Ghz'].value) {
      updatedForm['speedBandSteering'].value = false;
    }
  }

  const changeGuestMode = (updatedForm, field, value) => {
    updatedForm[field].value = value;

    if (value) {
      !updatedForm.natMode.value && (updatedForm.natMode.value = true);
      updatedForm.vlan.value = false;
      updatedForm.stationIsolation.value = true;
    }
  }

  // Side effect
  useEffect(() => {
    const data = {
      name: {
        value: selectedSsid.name,
        isValid: true,
      },
      security: {
        selected: selectedSsid.securityList.filter(security => security.isActive)[0],
        list: selectedSsid.securityList
      },
      authMethod: {
        selected: selectedSsid.authMethodList.filter(authMethod => authMethod.isActive)[0],
        list: selectedSsid.authMethodList,
        isShow: false
      },
      encryption: {
        selected: selectedSsid.encryptionList.filter(encryption => encryption.isActive)[0],
        list: selectedSsid.encryptionList,
        isShow: false,
        isEnabled: false
      },
      passphrase: {
        value: selectedSsid.passphrase,
        isShow: false,
        isPassword: true
      },
      gkuInterval: {
        value: selectedSsid.gkuInterval,
        isShow: false
      },
      primaryRadius: {
        selected: null,
        list: cloneDeep(radiusList),
        isShow: false
      },
      secondaryRadius: {
        selected: { title: 'Select', isActive: true },
        list: [
          { title: 'Select', isActive: true },
          ...cloneDeep(radiusList)
        ],
        isShow: false
      },
      broadcast: {
        value: selectedSsid.broadcast
      },
      speed24Ghz: {
        value: selectedSsid.speed24Ghz
      },
      speed5Ghz: {
        value: selectedSsid.speed5Ghz
      },
      speedBandSteering: {
        value: selectedSsid.speedBandSteering
      },
      guestMode: {
        value: selectedSsid.guestMode
      },
      natMode: {
        value: selectedSsid.natMode
      },
      dhcp24Ghz: {
        selected: null,
        list: cloneDeep(dhcpServerList)
      },
      dhcp5Ghz: {
        selected: null,
        list: cloneDeep(dhcpServerList)
      },
      vlan: {
        value: selectedSsid.vlan
      },
      vlanMode: {
        value: selectedSsid.vlanMode
      },
      vlanTag: {
        value: selectedSsid.vlanTag
      },
      stationIsolation: {
        value: selectedSsid.stationIsolation
      },
      nasId: {
        value: selectedSsid.nasId
      }
    };

    data.primaryRadius.isShow = false;
    data.secondaryRadius.isShow = false;
    if (['Enhanced Open', 'Enhanced Open + Open'].includes(data.security.selected.title)) {
      data.encryption.isShow = true;
      data.encryption.isEnabled = false;
    }

    if (['WPA2', 'WPA/WPA2', 'WPA3', 'WPA2/WPA3'].includes(data.security.selected.title)) {
      data.authMethod.isShow = true;
      data.encryption.isShow = true;
      data.encryption.isEnabled = true;
      data.passphrase.isShow = true;
      data.gkuInterval.isShow = true;
    }

    data.dhcp24Ghz.list[0].isActive = true;
    data.dhcp24Ghz.selected = data.dhcp24Ghz.list[0];
    data.dhcp5Ghz.list[0].isActive = true;
    data.dhcp5Ghz.selected = data.dhcp5Ghz.list[0];

    setForm(data);
    ctx.updateSsidBasic(data);
    ctx.updateChangedSsidBasic(data);
  }, [selectedSsid]);

  useEffect(() => {
    ctx.updateChangedSsidBasic(form);
  }, [form]);

  if (!form) {
    return;
  }

  return (
    <>
      <div className="tab-container-border">
        <div className="form-groups">
          {/* Name */}
          <div className='form-title required'>
            SSID name
          </div>
          <div className='form-field'>
            <EditableNameBox
              isMiddleSize={true}
              isInvalid={!form.name.isValid}
              onClickCancelIcon={() => changeValue('name', selectedSsid.name)}
              inputFieldOnKeyDown={(e) => { }}
              inputFieldOnChange={e => changeValue('name', e.target.value, changeName)}
              value={form.name.value}
            />
          </div>

          {/* Security */}
          <div className='form-title'>
            Security
            <TooltipDialog
              className="ms-1 me-1"
              placement="right"
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
              type="normal"
              isMiddleSize={true}
              selectedItem={form.security.selected}
              itemList={form.security.list}
              onClick={security => changeValue('security', security, changeSecurity)}
            />
            {/* <div className='text-warning' style={{ marginTop: '8px' }}>
                  No available SSID. SSIDs using the Enhanced Open + Open security mode will use up 2 SSIDs per enabled wireless band.
                </div> */}
          </div>

          {/* Auth method */}
          {
            form.authMethod.isShow && (
              <>
                <div className='form-title form-title--indent'>
                  Auth mothod
                </div>
                <div className='form-field form-field--dropdown-middle-width'>
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.authMethod.selected}
                    itemList={form.authMethod.list}
                    onClick={authMethod => changeValue('authMethod', authMethod, changeAuthMethod)}
                  />
                </div>
              </>
            )
          }

          {/* Encryption */}
          {
            form.encryption.isShow && (
              <>
                <div className='form-title form-title--indent'>
                  Encryption
                </div>
                <div className='form-field form-field--dropdown-middle-width'>
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.encryption.selected}
                    itemList={form.encryption.list}
                    disabled={!form.encryption.isEnabled}
                    onClick={authMethod => changeValue('encryption', authMethod)}
                  />
                </div>
              </>
            )
          }

          {/* Passphrase */}
          {
            form.passphrase.isShow && (
              <>
                <div className='form-title form-title--indent required'>
                  Passphrase
                </div>
                <div className='form-field'>
                  <InputWithIcon
                    type={form.passphrase.isPassword ? 'password' : 'text'}
                    isMiddleSize={true}
                    placeholder="8-63 characters"
                    autoComplete="new-password"
                    value={form.passphrase.value}
                    onChange={(e) => changeValue('passphrase', e.target.value)}
                    iconTitle={form.passphrase.isPassword ? 'Show password' : 'Hide password'}
                    iconClassName={`${form.passphrase.isPassword ? 'icon-open-eye' : 'icon-close-eye'}`}
                    iconOnClick={() => {
                      const updatedForm = cloneDeep(form);
                      updatedForm.passphrase.isPassword = !updatedForm.passphrase.isPassword;
                      setForm(updatedForm);
                    }}
                  />
                </div>
              </>
            )
          }

          {/* Group key update interval */}
          {
            form.gkuInterval.isShow && (
              <>
                <div className='form-title form-title--indent required'>
                  Group key update interval
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type="number"
                    isMiddleSize={true}
                    placeholder="3600-86400"
                    autoComplete="new-email"
                    value={form.gkuInterval.value}
                    onChange={(e) => changeValue('gkuInterval', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>sec.</div>
                </div>
              </>
            )
          }

          {/* Primary radius */}
          {
            form.primaryRadius.isShow && (
              <>
                <div className='form-title form-title--indent required'>
                  Primary RADIUS server
                </div>
                <div className='form-field form-field--horizontal'>
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.primaryRadius.selected}
                    itemList={form.primaryRadius.list}
                    onClick={authMethod => changeValue('primaryRadius', authMethod)}
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
              </>
            )
          }

          {/* Secondary radius */}
          {
            form.secondaryRadius.isShow && (
              <>
                <div className='form-title form-title--indent'>
                  Secondary RADIUS server
                </div>
                <div className='form-field'>
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.secondaryRadius.selected}
                    itemList={form.secondaryRadius.list}
                    onClick={authMethod => changeValue('secondaryRadius', authMethod)}
                  />
                </div>
              </>
            )
          }

          {/* Broadcast */}
          <div className='form-title'>
            Broadcast SSID
          </div>
          <div className='form-field form-field--horizontal'>
            <RadioButton
              id="broadcast-enable"
              name="broadcastEnable"
              label="Enable"
              hasRightMargin={true}
              checked={form.broadcast.value}
              onChange={() => changeValue('broadcast', true)}
            />
            <RadioButton
              id="broadcast-disable"
              name="broadcastDisable"
              label="Disable"
              checked={!form.broadcast.value}
              onChange={() => changeValue('broadcast', false)}
            />
          </div>

          {/* Band selection */}
          <div className='form-title'>
            Band selection
          </div>
          <div className='form-field form-field--horizontal'>
            <Checkbox
              id="band-24ghz"
              htmlFor="band-24ghz"
              type="checkbox"
              label="2.4 GHz"
              checked={form.speed24Ghz.value}
              onChange={() => changeValue('speed24Ghz', !form.speed24Ghz.value, changeSpeed)}
            />
            <Checkbox
              id="band-5ghz"
              htmlFor="band-5ghz"
              type="checkbox"
              label="5 GHz"
              checked={form.speed5Ghz.value}
              onChange={() => changeValue('speed5Ghz', !form.speed5Ghz.value, changeSpeed)}
            />
            {
              form.speed24Ghz.value && form.speed5Ghz.value && (
                <Checkbox
                  id="band-steering"
                  htmlFor="band-steering"
                  type="checkbox"
                  label="Band Steering"
                  checked={form.speedBandSteering.value}
                  onChange={() => changeValue('speedBandSteering', !form.speedBandSteering.value, changeSpeed)}
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
              id="guest-access-mode-enable"
              name="guessAccessModeEnable"
              label="Enable"
              hasRightMargin={true}
              checked={form.guestMode.value}
              onChange={() => changeValue('guestMode', true, changeGuestMode)}
            />
            <RadioButton
              id="guest-access-mode-disable"
              name="guessAccessModeDisable"
              label="Disable"
              checked={!form.guestMode.value}
              onChange={() => changeValue('guestMode', false, changeGuestMode)}
            />
          </div>

          {/* NAT mode */}
          <div className='form-title'>
            NAT mode
            <TooltipDialog
              className="ms-1 me-1"
              placement="right"
              title="When NAT mode is enabled, the VLAN settings will follow the Management VLAN settings."
            />
          </div>
          <div className='form-field form-field--horizontal'>
            <RadioButton
              id="nat-mode-enable"
              name="natModeEnable"
              label="Enable"
              hasRightMargin={true}
              checked={form.natMode.value}
              onChange={() => changeValue('natMode', true)}
            />
            <RadioButton
              id="nat-mode-disable"
              name="natModeDisable"
              label="Disable"
              checked={!form.natMode.value}
              onChange={() => changeValue('natMode', false)}
            />
          </div>

          {/* DHCP 2.4 GHz */}
          {
            form.natMode.value && form.speed24Ghz.value && (
              <>
                <div className='form-title form-title--indent'>
                  DHCP 2.4 GHz
                </div>
                <div className='form-field form-field--horizontal'>
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.dhcp24Ghz.selected}
                    itemList={form.dhcp24Ghz.list}
                    onClick={dhcp24Ghz => changeValue('dhcp24Ghz', dhcp24Ghz)}
                  />
                  <div>
                    <Button
                      label="Add a DHCP pool"
                      className='btn-grey-blue'
                      onClick={() => changeModalStatus(modalStatus.addDhcpServer.self, true)}
                    />
                  </div>
                  <div>
                    <Button
                      label="DHCP pool list"
                      className='btn-grey-blue'
                      onClick={() => changeModalStatus(modalStatus.dhcpServerPool.self, true)}
                    />
                  </div>
                </div>
              </>
            )
          }
          {/* DHCP 5 GHz */}
          {
            form.natMode.value && form.speed5Ghz.value && (
              <>
                <div className='form-title form-title--indent'>
                  DHCP 5 GHz
                </div>
                <div className='form-field form-field--dropdown-middle-width'>
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.dhcp5Ghz.selected}
                    itemList={form.dhcp5Ghz.list}
                    onClick={dhcp5Ghz => changeValue('dhcp5Ghz', dhcp5Ghz)}
                  />
                </div>
              </>
            )
          }

          {/* VLAN */}
          {
            !form.guestMode.value &&
            !form.natMode.value && (
              <>
                <div className='form-title'>
                  VLAN
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id="vlan-enable"
                    name="vlanEnable"
                    label="Enable"
                    hasRightMargin={true}
                    checked={form.vlan.value}
                    onChange={() => changeValue('vlan', true)}
                  />
                  <RadioButton
                    id="vlan-disable"
                    name="vlanDisable"
                    label="Disable"
                    checked={!form.vlan.value}
                    onChange={() => changeValue('vlan', false)}
                  />
                </div>
              </>
            )
          }

          {/* VLAN mode */}
          {
            !form.guestMode.value &&
            !form.natMode.value &&
            form.vlan.value && (
              <>
                <div className='form-title form-title--indent'>
                  VLAN mode
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id="vlan-mode-tagged"
                    name="vlanModeTagged"
                    label="Tagged"
                    hasRightMargin={true}
                    checked={form.vlanMode.value}
                    onChange={() => changeValue('vlanMode', true)}
                  />
                  <RadioButton
                    id="vlan-mode-untagged"
                    name="vlanModeUntagged"
                    label="Untagged"
                    checked={!form.vlanMode.value}
                    onChange={() => changeValue('vlanMode', false)}
                  />
                </div>
              </>
            )
          }

          {/* VLAN tag */}
          {
            !form.guestMode.value &&
            !form.natMode.value &&
            form.vlan.value && (
              <>
                <div className='form-title form-title--indent required'>
                  VLAN tag
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type="number"
                    isMiddleSize={true}
                    placeholder="1-4090"
                    autoComplete="new-email"
                    value={form.vlanTag.value}
                    onChange={e => changeValue('vlanTag', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </div>
              </>
            )
          }

          {/* Station isolation */}
          <div className='form-title'>
            Station isolation
          </div>
          <div className='form-field form-field--horizontal'>
            <RadioButton
              id="station-isolation-enable"
              name="stationIsolationEnable"
              label="Enable"
              hasRightMargin={true}
              checked={form.stationIsolation.value}
              onChange={() => changeValue('stationIsolation', true)}
            />
            <RadioButton
              id="station-isolation-disable"
              name="stationIsolationDisable"
              label="Disable"
              checked={!form.stationIsolation.value}
              onChange={() => changeValue('stationIsolation', false)}
            />
          </div>

          {/* NAS-ID  */}
          <div className='form-title'>
            NAS-ID
            <TooltipDialog
              className="ms-1 me-1"
              placement="right"
              title="NAS-IP-address (Network access server IP address) is used to notify the RADIUS access request source, which enables the RADIUS server to choose a policy for that request."
            />
          </div>
          <div className='form-field form-field--horizontal'>
            <Input
              isMiddleSize={true}
              type="text"
              placeholder="3-48 characters"
              autoComplete="new-email"
              value={form.nasId.value}
              onChange={e => changeValue('nasId', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
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
      </div >
    </>
  );
}

export default Basic;