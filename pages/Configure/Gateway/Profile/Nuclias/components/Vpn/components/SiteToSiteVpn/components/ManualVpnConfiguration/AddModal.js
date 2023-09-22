import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  DropdownWithItem,
  Button,
  ModalContainer,
  Input,
  RadioButton
} from 'components';

import { getAddManualVpnConfiguration } from 'dummy/data/gateway/data/vpn/site-to-site-vpn/manual-vpn-configuration';

const defaultPlaceHolder = {
  ipv4: {
    localNetwork: {
      subnet: '192.168.100.0/24',
      singleIp: '192.168.100.101',
      any: ''
    },
    remoteNetwork: {
      subnet: '192.168.200.0/24',
      singleIp: '192.168.200.101',
      any: ''
    },
    sourceIp: '192.168.100.101',
    destinationIp: '192.168.200.101',
    staticIp : '10.90.90.90',
    fqdn: 'e.g. abc.vpn.com'
  },
  ipv6 : {
    localNetwork: {
      subnet: '2001:db8:abcd::/64',
      singleIp: 'e.g. 2001:db8:abcd::1',
      any: ''
    },
    remoteNetwork: {
      subnet: '2001:db8:1234::/64',
      singleIp: 'e.g. 2001:db8:1234::1',
      any: ''
    },
    sourceIp: 'e.g. 2001:db8:abcd::1',
    destinationIp: 'e.g. 2001:db8:1234::1',
    staticIp: '2001::90',
    fqdn: 'e.g. abc.vpn.com'
  }
}

const AddModal = ({
  modalStatus,
  changeModalStatus,
  selectedDeviceModelName
}) => {
  const [config, setConfig] = useState(null);

  const changeValue = ({
    key,
    value
  }) => {
    const clonedConfig = cloneDeep(config);
    clonedConfig[key] = value;
    setConfig(clonedConfig);
  }

  const changeDropdown = ({
    item,
    listKey,
    selectedKey
  }) => {
    const clonedConfig = cloneDeep(config);
    clonedConfig[listKey].forEach(tmpItem => {
      tmpItem.isActive = tmpItem.value === item.value;
      if(tmpItem.isActive) clonedConfig[selectedKey] = tmpItem;
    });

    setConfig(clonedConfig);
  }

  useEffect(() => {
    const tmpConfig = getAddManualVpnConfiguration();
    setConfig(tmpConfig);
  }, [])

  if(!config) return <></>
  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addConfig.status}
      closeModal={() => changeModalStatus('addConfig', false)}
    >
      <div className='header'>
        <div className='title'>Add manual VPN configuration</div>
      </div>
      <div className='body'>

        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Connection name</div>
            <Input
              type='text'
              isInvalid={config.name === ''}
              value={config.name}
              placeholder='1-64 characters'
              onChange={e => changeValue({ key: 'name', value: e.target.value })}
            />
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col sm={6}>
            <div className='modal-form-title'>IKE profile</div>
            <DropdownWithItem
              type='normal'
              selectedItem={config.selectedIkeProfile}
              itemList={config.ikeProfileList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'ikeProfileList',
                  selectedKey: 'selectedIkeProfile'
                })
              }
            />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title'>Site IP address type</div>
            <DropdownWithItem
              type='normal'
              selectedItem={config.selectedSiteIpType}
              itemList={config.siteIpTypeList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'siteIpTypeList',
                  selectedKey: 'selectedSiteIpType'
                })
              }
            />
          </Col>
        </Row>

        <div className='my-3 modal-subtitle'>Local site setup</div>
        <Row>
          <Col sm={6}>
            <div className='modal-form-title'>Local network</div>
            <DropdownWithItem
              type='normal'
              selectedItem={config.selectedLocalNetwork}
              itemList={config.localNetworkList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'localNetworkList',
                  selectedKey: 'selectedLocalNetwork'
                })
              }
            />
          </Col>
          {
            config.selectedLocalNetwork.value !== 'any' &&
            <Col sm={6}>
              <div className='modal-form-title required'>IP address</div>
              <Input
                type='text'
                isInvalid={config.localNetwork === ''}
                value={config.localNetwork}
                placeholder={defaultPlaceHolder[config.selectedSiteIpType.value].localNetwork[config.selectedLocalNetwork.value]}
                onChange={e => changeValue({ key: 'localNetwork', value: e.target.value })}
              />
            </Col>
          }
        </Row>

        <div className='my-3 modal-subtitle'>Remote site setup</div>
        <Row>
          <Col sm={6}>
            <div className='modal-form-title'>Remote network</div>
            <DropdownWithItem
              type='normal'
              selectedItem={config.selectedRemoteNetwork}
              itemList={config.remoteNetworkList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'remoteNetworkList',
                  selectedKey: 'selectedRemoteNetwork'
                })
              }
            />
          </Col>
          {
            config.selectedRemoteNetwork.value !== 'any' &&
            <Col sm={6}>
              <div className='modal-form-title required'>IP address</div>
              <Input
                type='text'
                isInvalid={config.remoteNetwork === ''}
                value={config.remoteNetwork}
                placeholder={defaultPlaceHolder[config.selectedSiteIpType.value].remoteNetwork[config.selectedRemoteNetwork.value]}
                onChange={e => changeValue({ key: 'remoteNetwork', value: e.target.value })}
              />
            </Col>
          }
        </Row>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title'>Outgoing interface</div>
            <DropdownWithItem
              type='normal'
              selectedItem={config.selectedInterface}
              itemList={config.interfaceList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'interfaceList',
                  selectedKey: 'selectedInterface'
                })
              }
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>Remote gateway</div>
            <DropdownWithItem
              type='normal'
              selectedItem={config.selectedGateway}
              itemList={config.gatewayList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'gatewayList',
                  selectedKey: 'selectedGateway'
                })
              }
            />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title'>IP address type</div>
            <DropdownWithItem
              type='normal'
              selectedItem={config.selectedOutIpType}
              itemList={config.outIpTypeList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'outIpTypeList',
                  selectedKey: 'selectedOutIpType'
                })
              }
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title required'>{config.selectedGateway === 'singleIp' ? 'IP address' : 'Hostname'}</div>
            <Input
              type='text'
              isInvalid={config.remoteGateway === ''}
              value={config.remoteGateway}
              placeholder={defaultPlaceHolder[config.selectedOutIpType.value][config.selectedGateway.value]}
              onChange={e => changeValue({ key: 'remoteGateway', value: e.target.value })}
            />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title'>Keep alive</div>
            <div className='d-flex'>
              <RadioButton
                id={`quick-vpn-settings-Keep-alive-enable`}
                name={`quick-vpn-settings-Keep-alive-enable`}
                label='Enable'
                hasRightMargin={true}
                disabled={config.idleTimeout}
                checked={config.keepAlive}
                onChange={() => changeValue({ key: 'keepAlive', value: true})}
              />
              <RadioButton
                id={`quick-vpn-settings-Keep-alive-disable`}
                name={`quick-vpn-settings-Keep-alive-disable`}
                label='Disable'
                disabled={config.idleTimeout}
                checked={!config.keepAlive}
                onChange={() => changeValue({ key: 'keepAlive', value: false})}
              />
            </div>
          </Col>
        </Row>

        {
          config.keepAlive &&
          <>
            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title required'>Source IP address</div>
                <Input
                  type='text'
                  isInvalid={config.sourceIp === ''}
                  value={config.sourceIp}
                  placeholder={defaultPlaceHolder[config.selectedOutIpType.value].sourceIp}
                  onChange={e => changeValue({ key: 'sourceIp', value: e.target.value})}
                />
              </Col>
              <Col sm={6}>
                <div className='modal-form-title required'>Destination IP address</div>
                <Input
                  type='text'
                  isInvalid={config.destinationIp === ''}
                  value={config.destinationIp}
                  placeholder={defaultPlaceHolder[config.selectedOutIpType.value].destinationIp}
                  onChange={e => changeValue({ key: 'destinationIp', value: e.target.value})}
                />
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title required'>Detection period (seconds)</div>
                <Input
                  type='text'
                  isInvalid={config.detectionPeriod === ''}
                  value={config.detectionPeriod}
                  placeholder='10-199'
                  onChange={e => changeValue({ key: 'detectionPeriod', value: e.target.value})}
                />
              </Col>
              <Col sm={6}>
                <div className='modal-form-title required'>Reconnect after failure</div>
                <Input
                  type='text'
                  isInvalid={config.reconnectAfterFailure === ''}
                  value={config.reconnectAfterFailure}
                  placeholder='3-99'
                  onChange={e => changeValue({ key: 'reconnectAfterFailure', value: e.target.value})}
                />
              </Col>
            </Row>
          </>
        }

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title'>Idle timeout</div>
            <div className='d-flex'>
              <RadioButton
                id={`quick-vpn-settings-idle-timeout-enable`}
                name={`quick-vpn-settings-idle-timeout-enable`}
                label='Enable'
                hasRightMargin={true}
                disabled={config.keepAlive || config.backupTunnel}
                checked={config.idleTimeout}
                onChange={() => changeValue({ key: 'idleTimeout', value: true})}
              />
              <RadioButton
                id={`quick-vpn-settings-idle-timeout-disable`}
                name={`quick-vpn-settings-idle-timeout-disable`}
                label='Disable'
                disabled={config.keepAlive || config.backupTunnel}
                checked={!config.idleTimeout}
                onChange={() => changeValue({ key: 'idleTimeout', value: false})}
              />
            </div>
          </Col>
        </Row>

        {
          config.idleTimeout &&
          <Row className='mt-3'>
            <Col sm={6}>
              <div className='modal-form-title required'>Idle timeout (seconds)</div>
              <Input
                type='text'
                isInvalid={config.idleTimeoutSecs === ''}
                value={config.idleTimeoutSecs}
                placeholder='300-604800'
                onChange={e => changeValue({ key: 'idleTimeoutSecs', value: e.target.value})}
              />
            </Col>
          </Row>
        }

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title'>Dead peer detection</div>
            <div className='d-flex'>
              <RadioButton
                id={`quick-vpn-settings-dead-peer-enable`}
                name={`quick-vpn-settings-dead-peer-enable`}
                label='Enable'
                hasRightMargin={true}
                checked={config.deadPeer}
                onChange={() => changeValue({ key: 'deadPeer', value: true})}
              />
              <RadioButton
                id={`quick-vpn-settings-dead-peer-disable`}
                name={`quick-vpn-settings-dead-peer-disable`}
                label='Disable'
                checked={!config.deadPeer}
                onChange={() => changeValue({key: 'deadPeer', value: false})}
              />
            </div>
          </Col>
        </Row>

        {
          config.deadPeer &&
          <Row className='mt-3'>
            <Col sm={6}>
              <div className='modal-form-title required'>Detection interval (seconds)</div>
              <Input
                type='text'
                isInvalid={config.detectionInterval === ''}
                value={config.detectionInterval}
                placeholder='10-999'
                onChange={e => changeValue({ key: 'detectionInterval', value: e.target.value})}
              />
            </Col>
            <Col sm={6}>
              <div className='modal-form-title required'>Disconnect after failure</div>
              <Input
                type='text'
                isInvalid={config.disconnectAfterFailure === ''}
                value={config.disconnectAfterFailure}
                placeholder='3-99'
                onChange={e => changeValue({ key: 'disconnectAfterFailure', value: e.target.value})}
              />
            </Col>
          </Row>
        }

        {
          config.deadPeer &&
          <Row className='mt-3'>
            <Col sm={6}>
              <div className='modal-form-title'>Backup tunnel</div>
              <div className='d-flex'>
                <RadioButton
                  id={`quick-vpn-settings-back-tunnel-enable`}
                  name={`quick-vpn-settings-back-tunnel-enable`}
                  label='Enable'
                  hasRightMargin={true}
                  disabled={config.idleTimeout}
                  checked={config.backupTunnel}
                  onChange={() => changeValue({key: 'backupTunnel', value: true})}
                />
                <RadioButton
                  id={`quick-vpn-settings-back-tunnel-disable`}
                  name={`quick-vpn-settings-back-tunnel-disable`}
                  label='Disable'
                  disabled={config.idleTimeout}
                  checked={!config.backupTunnel}
                  onChange={() => changeValue({key: 'backupTunnel', value: false})}
                />
              </div>
            </Col>
            {
              config.backupTunnel &&
              <Col sm={6}>
                <div className='modal-form-title'>Outgoing backup interface</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={config.selectedBackUpInterface}
                  itemList={config.backUpInterfaceList}
                  onClick={item =>
                    changeDropdown({
                      item,
                      listKey: 'backUpInterfaceList',
                      selectedKey: 'selectedBackUpInterface'
                    })
                  }
                />
              </Col>
            }
          </Row>
        }

        {
          config.deadPeer && config.backupTunnel &&
          <Row className='mt-3'>
            <Col sm={6}>
              <div className='modal-form-title'>Remote backup gateway</div>
              <DropdownWithItem
                type='normal'
                selectedItem={config.selectedBackUpGateway}
                itemList={config.backUpGatewayList}
                onClick={item =>
                  changeDropdown({
                    item,
                    listKey: 'backUpGatewayList',
                    selectedKey: 'selectedBackUpGateway'
                  })
                }
              />
            </Col>
            <Col sm={6}>
              <div className='modal-form-title'>IKE backup profile</div>
              <DropdownWithItem
                type='normal'
                selectedItem={config.selectedBackUpIkeProfile}
                itemList={config.backUpIkeProfileList}
                onClick={item =>
                  changeDropdown({
                    item,
                    listKey: 'backUpIkeProfileList',
                    selectedKey: 'selectedBackUpIkeProfile'
                  })
                }
              />
            </Col>
          </Row>
        }

        {
          config.backupTunnel &&
          <Row className='mt-3'>
            <Col sm={6}>
              <div className='modal-form-title required'>IP address</div>
              <Input
                type='text'
                isInvalid={config.outGoingIpAddress === ''}
                value={config.outGoingIpAddress}
                placeholder={defaultPlaceHolder.ipv4[config.selectedBackUpGateway.value]}
                onChange={e => changeValue({ key: 'outGoingIpAddress', value: e.target.value})}
              />
            </Col>
          </Row>
        }

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title'>NetBIOS broadcast</div>
            <div className='d-flex'>
              <RadioButton
                id={`quick-vpn-settings-net-bios-broadcast-enable`}
                name={`quick-vpn-settings-net-bios-broadcast-enable`}
                label='Enable'
                hasRightMargin={true}
                checked={config.biosBroadcast}
                onChange={() => changeValue({key: 'biosBroadcast', value: true})}
              />
              <RadioButton
                id={`quick-vpn-settings-net-bios-broadcast-disable`}
                name={`quick-vpn-settings-net-bios-broadcast-disable`}
                label='Disable'
                checked={!config.biosBroadcast}
                onChange={() => changeValue({key: 'biosBroadcast', value: false})}
              />
            </div>
          </Col>
        </Row>

      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus('addConfig', false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus('addConfig', false)}
        />
      </div>
    </ModalContainer >
  );
};

export default AddModal;
