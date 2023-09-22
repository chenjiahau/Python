import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  DropdownWithItem,
  Button,
  Input,
  InputWithIcon,
  RadioButton,
  InputWithUploadButton,
  ConfirmationModalContainer
} from 'components';

import Func from '../../../../../Func';

// Context
import { openVpnAction, OpenVpnContext } from '../../Context';

const defaultModalStatus = {
  deleteProfile: {
    status: false,
    disabled: false,
  },
};

const OpenVpnSettings = () => {
  const {
    state: {
      selectedDeviceModelName,
      openVpnUIDisplaying,
      openVpnSettings
    },
    dispatch: openVpnDispatch
  } = useContext(OpenVpnContext);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  const changeModalStatus = (type, value) => {
    setModalStatus({ ...modalStatus, [type]: { ...modalStatus[type], status: value } });
  }

  const filteredOpenVpnModeList = useMemo(() => openVpnSettings.openVpnModeList.filter(item => item.availableDeviceModel.includes(selectedDeviceModelName)), [openVpnSettings]);

  const changeValue = ({
    key,
    value
  }) => {
    if (key === 'userBasedAuth' && !value) {
      changeModalStatus('deleteProfile', true);
    } else {
      const clonedOpenVpn = cloneDeep(openVpnSettings);
      clonedOpenVpn[key] = value;

      openVpnDispatch({
        type: openVpnAction.setOpenVpnSettings,
        payload: clonedOpenVpn
      });
    }
  }

  const changeDropdown = ({
    item,
    listKey,
    selectedKey,
    valueKey
  }) => {
    const clonedOpenVpn = cloneDeep(openVpnSettings);
    clonedOpenVpn[listKey].forEach(tmpItem => {
      tmpItem.isActive = tmpItem.value === item.value;
      if (tmpItem.isActive) {
        clonedOpenVpn[selectedKey] = tmpItem;
      }

      if (valueKey) {
        clonedOpenVpn[valueKey] = item.value;
      }
    });

    openVpnDispatch({
      type: openVpnAction.setOpenVpnSettings,
      payload: clonedOpenVpn
    });
  }

  if (!openVpnSettings.openvpnEnable) {
    return (
      <div className='form-group'>
        <div className='form-title' style={{ minWidth: '93px' }}>OpenVPN</div>
        <div className='form-field d-flex'>
          <RadioButton
            id={`open-vpn-enable`}
            name={`open-vpn-enable`}
            label='Enable'
            hasRightMargin={true}
            checked={openVpnSettings.openvpnEnable}
            onChange={() => changeValue({ key: 'openvpnEnable', value: true })}
          />
          <RadioButton
            id={`open-vpn-disable`}
            name={`open-vpn-disable`}
            label='Disable'
            checked={!openVpnSettings.openvpnEnable}
            onChange={() => changeValue({ key: 'openvpnEnable', value: false })}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='form-group'>
        <div className='form-title' style={{ minWidth: '93px' }}>OpenVPN</div>
        <div className='form-field d-flex'>
          <RadioButton
            id={`open-vpn-enable`}
            name={`open-vpn-enable`}
            label='Enable'
            hasRightMargin={true}
            checked={openVpnSettings.openvpnEnable}
            onChange={() => changeValue({ key: 'openvpnEnable', value: true })}
          />
          <RadioButton
            id={`open-vpn-disable`}
            name={`open-vpn-disable`}
            label='Disable'
            checked={!openVpnSettings.openvpnEnable}
            onChange={() => changeValue({ key: 'openvpnEnable', value: false })}
          />
        </div>
      </div>

      <div className='form-group'>
        <div className='form-title'>OpenVPN daemon mode</div>
      </div>
      <div className='form-group my-2'>
        <div className='form-title form-title--indent me-4'>Mode</div>
        <div className='form-field'>
          <div className='d-flex'>
            <DropdownWithItem
              type='normal'
              style={{ width: 'auto', minWidth: '150px' }}
              selectedItem={openVpnSettings.selectedOpenVpnMode}
              itemList={filteredOpenVpnModeList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'openVpnModeList',
                  selectedKey: 'selectedOpenVpnMode',
                  valueKey: 'openvpnMode'
                })
              }
            />
          </div>
        </div>
      </div>

      <div className='form-group'>
        <div className='form-title'>VPN setting</div>
      </div>

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].vpnNetworkIP &&
        <div className='d-flex form-group'>
          <div className='form-title form-title--indent me-4'>VPN network</div>
          <div className='form-field'>
            <div className='d-flex'>
              <Input
                type='text'
                style={{ width: '150px' }}
                isInvalid={!openVpnSettings.tunNetworkIP}
                value={openVpnSettings.tunNetworkIP}
                placeholder='e.g. 10.7.0.0'
                onChange={e => changeValue({ key: 'tunNetworkIP', value: e.target.value })}
              />
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].vpnNetmask &&
        <div className='d-flex form-group'>
          <div className='form-title form-title--indent me-4'>VPN netmask</div>
          <div className='form-field'>
            <div className='d-flex'>
              <Input
                type='text'
                style={{ width: '150px' }}
                isInvalid={!openVpnSettings.tunNetmask}
                value={openVpnSettings.tunNetmask}
                placeholder='e.g. 255.255.255.0'
                onChange={e => changeValue({ key: 'tunNetmask', value: e.target.value })}
              />
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].serverIP &&
        <div className='d-flex form-group'>
          <div className='form-title form-title--indent me-4'>Server IP</div>
          <div className='form-field'>
            <div className='d-flex gap-1'>
              <DropdownWithItem
                type='normal'
                style={{ width: '150px' }}
                selectedItem={openVpnSettings.selectedServerType}
                itemList={openVpnSettings.serverTypeList}
                onClick={item =>
                  changeDropdown({
                    item,
                    listKey: 'serverTypeList',
                    selectedKey: 'selectedServerType',
                    valueKey: 'serverType'
                  })
                }
              />
              <Input
                type='text'
                style={{ width: '150px' }}
                isInvalid={!openVpnSettings.serverAddress}
                value={openVpnSettings.serverAddress}
                placeholder={openVpnSettings.serverType === 'IP_ADDRESS' ? 'e.g. 10.90.90.90' : 'e.g. abc.vpn.com'}
                onChange={e => changeValue({ key: 'serverAddress', value: e.target.value })}
              />
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].failoverServerIp &&
        <div className='d-flex form-group'>
          <div className='form-title form-title--indent me-4'>Failover server IP ( optional )</div>
          <div className='form-field'>
            <div className='d-flex gap-1'>
              <DropdownWithItem
                type='normal'
                style={{ width: '150px' }}
                selectedItem={openVpnSettings.selectedFailoverServerType}
                itemList={openVpnSettings.failoverServerTypeList}
                onClick={item =>
                  changeDropdown({
                    item,
                    listKey: 'failoverServerTypeList',
                    selectedKey: 'selectedFailoverServerType',
                    valueKey: 'failoverServerType'
                  })
                }
              />
              <Input
                type='text'
                style={{ width: '150px' }}
                value={openVpnSettings.failoverServerAddress}
                placeholder={openVpnSettings.failoverServerType === 'IP_ADDRESS' ? 'e.g. 10.90.90.91' : 'e.g. abc.vpn.com'}
                onChange={e => changeValue({ key: 'failoverServerAddress', value: e.target.value })}
              />
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].duplicateCN &&
        <div className='form-group'>
          <div className='form-title form-title--indent me-4'>Duplicate CN</div>
          <div className='form-field d-flex'>
            <RadioButton
              id={`duplicated-cn-enable`}
              name={`duplicated-cn-enable`}
              label='Enable'
              hasRightMargin={true}
              checked={openVpnSettings.duplicateCN}
              onChange={() => changeValue({ key: 'duplicateCN', value: true })}
            />
            <RadioButton
              id={`duplicated-cn-disable`}
              name={`duplicated-cn-disable`}
              label='Disable'
              checked={!openVpnSettings.duplicateCN}
              onChange={() => changeValue({ key: 'duplicateCN', value: false })}
            />
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].port &&
        <div className='d-flex form-group'>
          <div className='form-title form-title--indent me-4'>Port</div>
          <div className='form-field'>
            <div className='d-flex'>
              <Input
                type='text'
                style={{ width: '150px' }}
                isInvalid={!openVpnSettings.openvpnPort}
                value={openVpnSettings.openvpnPort}
                placeholder='1024 - 65535'
                onChange={e => changeValue({ key: 'openvpnPort', value: e.target.value })}
              />
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].tunnelProtocol &&
        <div className='d-flex form-group'>
          <div className='form-title form-title--indent me-4'>Tunnel protocol</div>
          <div className='form-field'>
            <div className='d-flex'>
              <DropdownWithItem
                type='normal'
                style={{ width: '150px' }}
                selectedItem={openVpnSettings.selectedTunnelProtocol}
                itemList={openVpnSettings.tunnelProtocolList}
                onClick={item =>
                  changeDropdown({
                    item,
                    listKey: 'tunnelProtocolList',
                    selectedKey: 'selectedTunnelProtocol',
                    valueKey: 'tunnelProtocol'
                  })
                }
              />
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].encryptionAlgorithm &&
        <div className='d-flex form-group'>
          <div className='form-title form-title--indent me-4'>Encryption algorithm</div>
          <div className='form-field'>
            <div className='d-flex'>
              <DropdownWithItem
                type='normal'
                style={{ width: '150px' }}
                selectedItem={openVpnSettings.selectedEncryptionAlgorithm}
                itemList={openVpnSettings.encryptionAlgorithmList}
                onClick={item =>
                  changeDropdown({
                    item,
                    listKey: 'encryptionAlgorithmList',
                    selectedKey: 'selectedEncryptionAlgorithm',
                    valueKey: 'encryptionAlgo'
                  })
                }
              />
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].hashAlgorithm &&
        <div className='d-flex form-group'>
          <div className='form-title form-title--indent me-4'>Hash algorithm</div>
          <div className='form-field'>
            <div className='d-flex'>
              <DropdownWithItem
                type='normal'
                style={{ width: '150px' }}
                selectedItem={openVpnSettings.selectedHashAlgorithm}
                itemList={openVpnSettings.hashAlgorithmList}
                onClick={item =>
                  changeDropdown({
                    item,
                    listKey: 'hashAlgorithmList',
                    selectedKey: 'selectedHashAlgorithm',
                    valueKey: 'encryptionAlgo'
                  })
                }
              />
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].tunnelType &&
        <div className='d-flex form-group'>
          <div className='form-title form-title--indent me-4'>Tunnel type</div>
          <div className='form-field'>
            <div className='d-flex'>
              <DropdownWithItem
                type='normal'
                style={{ width: '150px' }}
                selectedItem={openVpnSettings.selectedTunnelType}
                itemList={openVpnSettings.tunnelTypeList}
                onClick={item =>
                  changeDropdown({
                    item,
                    listKey: 'tunnelTypeList',
                    selectedKey: 'selectedTunnelType',
                    valueKey: 'tunnelType'
                  })
                }
              />
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].clientToClient && openVpnSettings.tunnelType === 'SPLIT_TUNNEL' &&
        <div className='form-group'>
          <div className='form-title form-title--indent ms-4'>Client to client</div>
          <div className='form-field d-flex'>
            <RadioButton
              id={`client-to-client-enable`}
              name={`client-to-client-enable`}
              label='Enable'
              hasRightMargin={true}
              checked={openVpnSettings.clientToClientCommunication}
              onChange={() => changeValue({ key: 'clientToClientCommunication', value: true })}
            />
            <RadioButton
              id={`client-to-client-disable`}
              name={`client-to-client-disable`}
              label='Disable'
              checked={!openVpnSettings.clientToClientCommunication}
              onChange={() => changeValue({ key: 'clientToClientCommunication', value: false })}
            />
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].userBasedAuth &&
        <div className='form-group'>
          <div className='form-title form-title--indent me-4'>User based authentication</div>
          <div className='form-field d-flex'>
            <RadioButton
              id={`user-based-authentication-enable`}
              name={`user-based-authentication-enable`}
              label='Enable'
              hasRightMargin={true}
              checked={openVpnSettings.userBasedAuth}
              onChange={() => changeValue({ key: 'userBasedAuth', value: true })}
            />
            <RadioButton
              id={`user-based-authentication-disable`}
              name={`user-based-authentication-disable`}
              label='Disable'
              checked={!openVpnSettings.userBasedAuth}
              onChange={() => changeValue({ key: 'userBasedAuth', value: false })}
            />
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].localAuthentication && openVpnSettings.userBasedAuth &&
        <div className='form-group'>
          <div className='form-title form-title--indent ms-4'>Local authentication</div>
          <div className='form-field'>
            <div className='d-flex align-items-center gap-2'>
              <DropdownWithItem
                type='normal'
                style={{ width: '150px' }}
                selectedItem={openVpnSettings.selectedLocalAuthentication}
                itemList={openVpnSettings.localAuthenticationList}
                onClick={item =>
                  changeDropdown({
                    item,
                    listKey: 'localAuthenticationList',
                    selectedKey: 'selectedLocalAuthentication',
                    valueKey: 'localDBName'
                  })
                }
              />
              <Link className='text-decoration-underline fw-normal' to='/cloud/configure/authentication/local-authentication-list'>
                Local authentication list
              </Link>
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].username && openVpnSettings.userBasedAuth &&
        <div className='d-flex form-group'>
          <div className='form-title form-title--indent ms-4'>Username</div>
          <div className='form-field'>
            <div className='d-flex'>
              <Input
                type='text'
                style={{ width: '150px' }}
                isInvalid={!openVpnSettings.username}
                value={openVpnSettings.username}
                placeholder='1-64 Characters'
                onChange={e => changeValue({ key: 'username', value: e.target.value })}
              />
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].password && openVpnSettings.userBasedAuth &&
        <div className='d-flex form-group'>
          <div className='form-title form-title--indent ms-4'>Password</div>
          <div className='form-field'>
            <div className='d-flex'>
              <InputWithIcon
                type={openVpnSettings.passwordShow ? 'text' : 'password'}
                style={{ width: '150px' }}
                isInvalid={!openVpnSettings.password}
                value={openVpnSettings.password}
                placeholder='1-128 characters'
                iconTitle={openVpnSettings.passwordShow ? 'Hide password' : 'Show password'}
                iconClassName={openVpnSettings.passwordShow ? 'icon-close-eye' : 'icon-open-eye'}
                iconOnClick={() => changeValue({ key: 'passwordShow', value: !openVpnSettings.passwordShow })}
                onChange={e => changeValue({ key: 'password', value: e.target.value })}
              />
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].certificateVerification &&
        <div className='form-group'>
          <div className='form-title form-title--indent me-4'>Certificate verification</div>
          <div className='form-field d-flex'>
            <RadioButton
              id={`certificate-verification-enable`}
              name={`certificate-verification-enable`}
              label='Enable'
              hasRightMargin={true}
              checked={openVpnSettings.certificateVerification}
              onChange={() => changeValue({ key: 'certificateVerification', value: true })}
            />
            <RadioButton
              id={`certificate-verification-disable`}
              name={`certificate-verification-disable`}
              label='Disable'
              checked={!openVpnSettings.certificateVerification}
              onChange={() => changeValue({ key: 'certificateVerification', value: false })}
            />
          </div>
        </div>
      }


      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].certificate &&
        <div className='d-flex form-group'>
          <div className='form-title form-title--indent me-4'>Certificate</div>
          <div className='form-field'>
            <div className='d-flex align-items-center gap-2'>
              <DropdownWithItem
                type='normal'
                style={{ width: '236px' }}
                selectedItem={openVpnSettings.selectedCertificate}
                itemList={openVpnSettings.certificateList}
                onClick={item =>
                  changeDropdown({
                    item,
                    listKey: 'certificateList',
                    selectedKey: 'selectedCertificate',
                    valueKey: 'certProfileName'
                  })
                }
              />
              <Link className='text-decoration-underline fw-normal' to='/cloud/settings/certificate-management'>
                Certificate list
              </Link>
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].caTable &&
        <Table responsive striped hover className='table-container non-first-indent-table-container my-3'>
          <thead>
            <tr>
              <th>CA subject name</th>
              <th>Server cert subject name</th>
            </tr>
          </thead>
          <tbody>
            {
              openVpnSettings.caList.map((item, index) => {
                return (
                  <tr key={'open-vpn-settings-ca-list-tr-' + index}>
                    <td>{item.caSubjectName}</td>
                    <td>{item.certSubjectName}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].tlsAuthenticationKey &&
        <div className='form-group'>
          <div className='form-title form-title--indent me-4'>TLS authentication key</div>
          <div className='form-field d-flex'>
            <RadioButton
              id={`tls-authentication-key-enable`}
              name={`tls-authentication-key-enable`}
              label='Enable'
              hasRightMargin={true}
              checked={openVpnSettings.tlsKeyEnable}
              onChange={() => changeValue({ key: 'tlsKeyEnable', value: true })}
            />
            <RadioButton
              id={`tls-authentication-key-disable`}
              name={`tls-authentication-key-disable`}
              label='Disable'
              checked={!openVpnSettings.tlsKeyEnable}
              onChange={() => changeValue({ key: 'tlsKeyEnable', value: false })}
            />
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].tlsKey && openVpnSettings.tlsKeyEnable &&
        <div className='form-group'>
          <div className='form-title form-title--indent ms-4'>TLS key</div>
          <div className='form-field d-flex'>
            <div className='d-flex align-items-center gap-2'>
              <DropdownWithItem
                type='normal'
                style={{ width: '150px' }}
                selectedItem={openVpnSettings.selectedTlsKey}
                itemList={openVpnSettings.tlsKeyList}
                onClick={item =>
                  changeDropdown({
                    item,
                    listKey: 'tlsKeyList',
                    selectedKey: 'selectedTlsKey',
                    valueKey: 'tlsKeyProfileName'
                  })
                }
              />
              <Link className='text-decoration-underline fw-normal' to='/cloud/settings/certificate-management'>
                Certificate list
              </Link>
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].dhKey &&
        <div className='form-group'>
          <div className='form-title form-title--indent me-4'>DH Key</div>
          <div className='form-field d-flex'>
            <div className='d-flex align-items-center gap-2'>
              <DropdownWithItem
                type='normal'
                style={{ width: '150px' }}
                selectedItem={openVpnSettings.selectedDhKey}
                itemList={openVpnSettings.dhKeyList}
                onClick={item =>
                  changeDropdown({
                    item,
                    listKey: 'dhKeyList',
                    selectedKey: 'selectedDhKey',
                    valueKey: 'dhKeyProfileName'
                  })
                }
              />
              <Link className='text-decoration-underline fw-normal' to='/cloud/settings/certificate-management'>
                Certificate list
              </Link>
            </div>
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].crlCertificate &&
        <div className='form-group mb-2'>
          <div className='form-title form-title--indent me-4 mt-2'>CRL certificate</div>
          <div className='form-field d-flex'>
            <RadioButton
              id={`crl-certificate-enable`}
              name={`crl-certificate-enable`}
              label='Enable'
              hasRightMargin={true}
              checked={openVpnSettings.crlCertificateEnable}
              onChange={() => changeValue({ key: 'crlCertificateEnable', value: true })}
            />
            <RadioButton
              id={`crl-certificate-disable`}
              name={`crl-certificate-disable`}
              label='Disable'
              checked={!openVpnSettings.crlCertificateEnable}
              onChange={() => changeValue({ key: 'crlCertificateEnable', value: false })}
            />
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].crlCertificate && openVpnSettings.crlCertificateEnable &&
        <div className='form-group mb-2'>
          <div className='form-title form-title--indent ms-4'>Certificate revocation list</div>
          <div className='form-field'>
            <Button
              style={{ width: '100px' }}
              label='Upload'
              className='btn-grey-blue'
              onClick={() => { }}
            />
          </div>
        </div>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].uploadAccessServerClient &&
        <>
          <div className='form-group mb-2'>
            <div className='form-title form-title--indent'>Upload access server client</div>
          </div>

          <div className='form-group mb-2'>
            <div className='form-title form-title--indent ms-4'>Username</div>
            <div className='form-field d-flex'>
              dlink
            </div>
          </div>

          <div className='form-group mb-2'>
            <div className='form-title form-title--indent ms-4'>Server address</div>
            <div className='form-field d-flex'>
              192.168.100.101
            </div>
          </div>

          <div className='form-group mb-2'>
            <div className='form-title form-title--indent ms-4'>Port(s)</div>
            <div className='form-field d-flex'>
              8081(UDP),8080(TCP)
            </div>
          </div>

          <div className='form-group mb-2'>
            <div className='form-title form-title--indent ms-4'>File</div>
            <div className='form-field d-flex'>
              <InputWithUploadButton
                style={{ maxWidth: '410px', width: '90%' }}
                value={'dlink.ovpn'}
                onClick={e => { }}
                onChange={e => { }}
              />
            </div>
          </div>
        </>
      }

      {
        openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].advancedSettings &&
        <div className='form-group mt-1 me-4'>
          <div className='form-title form-title--indent'>Advanced settings</div>
        </div>
      }

      {/* user based authentication modal */}
      <ConfirmationModalContainer
        modalWidthType='modal-500px'
        title='Delete profiles'
        description='Disable User based authentication will clean up all Local authentication scope server policies. Would you like to disable User based authentication?'
        openModal={modalStatus.deleteProfile.status}
        closeModal={() => {
          changeModalStatus('deleteProfile', false);
        }}
        onConfirm={() => {
          changeModalStatus('deleteProfile', false);

          const clonedOpenVpn = cloneDeep(openVpnSettings);
          clonedOpenVpn.userBasedAuth = false;

          openVpnDispatch({
            type: openVpnAction.setOpenVpnSettings,
            payload: clonedOpenVpn
          });
        }}
      />

    </>
  )
}

export default OpenVpnSettings;