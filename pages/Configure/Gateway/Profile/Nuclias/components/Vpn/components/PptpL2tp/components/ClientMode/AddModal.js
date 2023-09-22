import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  DropdownWithItem,
  DropdownWithCheckbox,
  Button,
  ModalContainer,
  Input,
  InputWithIcon,
  RadioButton
} from 'components';

import { getAddClientMode } from 'dummy/data/gateway/data/vpn/pptp-l2tp/client-mode';

const AddModal = ({
  modalStatus,
  changeModalStatus,
  selectedDeviceModelName
}) => {
  const [clientMode, setClientMode] = useState(null);

  const changeValue = ({
    key,
    value
  }) => {
    const clonedClientMode = cloneDeep(clientMode);
    clonedClientMode[key] = value;
    setClientMode(clonedClientMode);
  }

  const changeDropdownCheckbox = ({
    item,
    listKey
  }) => {
    const clonedClientMode = cloneDeep(clientMode);
    if(item.value === 'all'){
      clonedClientMode[listKey].forEach(tmpItem => {
        tmpItem.checked = !item.checked;
      });
    }else{
      clonedClientMode[listKey].forEach(tmpItem => {
        if(tmpItem.value === item.value){
          tmpItem.checked = !item.checked;
        }
      });

      const isUnCheckedItemExist = clonedClientMode[listKey].filter(tmpItem => !tmpItem.checked && tmpItem.value !== 'all').length > 0;
      clonedClientMode[listKey][0].checked = !isUnCheckedItemExist;

    }

    setClientMode(clonedClientMode);
  }

  const changeDropdown = ({
    item,
    listKey,
    selectedKey
  }) => {
    const clonedClientMode = cloneDeep(clientMode);
    clonedClientMode[listKey].forEach(tmpItem => {
      tmpItem.isActive = tmpItem.value === item.value;
      if(tmpItem.isActive) clonedClientMode[selectedKey] = tmpItem;
    });

    setClientMode(clonedClientMode);
  }

  useEffect(() => {
    const tmpClientMode = getAddClientMode();
    setClientMode(tmpClientMode);
  }, [modalStatus.addClientMode.status])

  if(!clientMode) return <></>
  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addClientMode.status}
      closeModal={() => changeModalStatus('addClientMode', false)}
    >
      <div className='header'>
        <div className='title'>Add PPTP/L2TP client</div>
      </div>
      <div className='body'>

        {
          clientMode.isNext === 0 &&
          <>
            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Client type</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={clientMode.selectedClientType}
                  itemList={clientMode.clientTypeList}
                  onClick={item =>
                    changeDropdown({
                      item,
                      listKey: 'clientTypeList',
                      selectedKey: 'selectedClientType'
                    })
                  }
                />
              </Col>

              {
                clientMode.selectedClientType.value !== 'L2TPv3' &&
                <Col sm={6}>
                  <div className='modal-form-title required'>Name</div>
                  <Input
                    type='text'
                    value={clientMode.name}
                    isInvalid={clientMode.name === ''}
                    placeholder='1-64 characters'
                    onChange={e => changeValue({ key: 'name', value: e.target.value })}
                  />
                </Col>
              }
            </Row>

            {
              clientMode.selectedClientType.value === 'L2TPv3' &&
              <>
                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title required'>Name</div>
                    <Input
                      type='text'
                      value={clientMode.name}
                      isInvalid={clientMode.name === ''}
                      placeholder='1-64 characters'
                      onChange={e => changeValue({ key: 'name', value: e.target.value })}
                    />
                  </Col>
                  <Col sm={6}>
                    <div className='modal-form-title'>Interface</div>
                    <DropdownWithItem
                      type='normal'
                      selectedItem={clientMode.selectedInterface}
                      itemList={clientMode.interfaceList}
                      onClick={item =>
                        changeDropdown({
                          item,
                          listKey: 'interfaceList',
                          selectedKey: 'selectedInterface'
                        })
                      }
                    />
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title'>Pseudowire class</div>
                    <DropdownWithItem
                      type='normal'
                      selectedItem={clientMode.selectedPseudowire}
                      itemList={clientMode.pseudowireList}
                      onClick={item =>
                        changeDropdown({
                          item,
                          listKey: 'pseudowireList',
                          selectedKey: 'selectedPseudowire'
                        })
                      }
                    />
                  </Col>

                  {
                    clientMode.selectedPseudowire.value === 'dynamicTunnel' &&
                    <Col sm={6}>
                      <div className='modal-form-title required'>LNS address</div>
                      <Input
                        type='text'
                        value={clientMode.remoteIp}
                        isInvalid={clientMode.remoteIp === ''}
                        placeholder='e.g.192.168.200.1'
                        onChange={e => changeValue({ key: 'remoteIp', value: e.target.value })}
                      />
                    </Col>
                  }

                </Row>

                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title required'>Hostname</div>
                      <Input
                        type='text'
                        value={clientMode.hostName}
                        isInvalid={clientMode.hostName === ''}
                        placeholder='e.g. dlink.com or 192.168.200.1'
                        onChange={e => changeValue({ key: 'hostName', value: e.target.value })}
                      />
                  </Col>

                  <Col sm={6}>
                    <div className='modal-form-title required'>Remote end ID</div>
                    <Input
                      type='text'
                      value={clientMode.remoteEndId}
                      isInvalid={clientMode.remoteEndId === ''}
                      placeholder='1-32 characters'
                      onChange={e => changeValue({ key: 'remoteEndId', value: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title required'>Local router ID</div>
                      <Input
                        type='text'
                        value={clientMode.localRouterId}
                        isInvalid={clientMode.localRouterId === ''}
                        placeholder='e.g. 192.168.200.1'
                        onChange={e => changeValue({ key: 'localRouterId', value: e.target.value })}
                      />
                  </Col>

                  <Col sm={6}>
                    <div className='modal-form-title required'>Remote router ID</div>
                    <Input
                      type='text'
                      value={clientMode.remoteRouterId}
                      isInvalid={clientMode.remoteRouterId === ''}
                      placeholder='e.g. 192.168.200.1'
                      onChange={e => changeValue({ key: 'remoteRouterId', value: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title'>Autodial</div>
                    <div className='d-flex'>
                      <RadioButton
                        id={`auto-dial-enable`}
                        name={`auto-dial-enable`}
                        label='Enable'
                        hasRightMargin={true}
                        checked={clientMode.autodial}
                        onChange={() => changeValue({ key: 'autodial', value: true})}
                      />
                      <RadioButton
                        id={`auto-dial-disable`}
                        name={`auto-dial-disable`}
                        label='Disable'
                        checked={!clientMode.autodial}
                        onChange={() => changeValue({ key: 'autodial', value: false})}
                      />
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className='modal-form-title'>Redial</div>
                    <div className='d-flex'>
                      <RadioButton
                        id={`redial-enable`}
                        name={`redial-enable`}
                        label='Enable'
                        hasRightMargin={true}
                        checked={clientMode.redial}
                        onChange={() => changeValue({ key: 'redial', value: true})}
                      />
                      <RadioButton
                        id={`redial-disable`}
                        name={`redial-disable`}
                        label='Disable'
                        checked={!clientMode.redial}
                        onChange={() => changeValue({ key: 'redial', value: false})}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title required'>Redial timeout (seconds)</div>
                      <Input
                        type='text'
                        value={clientMode.redialTimeout}
                        isInvalid={clientMode.redialTimeout === ''}
                        placeholder='1 - 3600'
                        onChange={e => changeValue({ key: 'redialTimeout', value: e.target.value })}
                      />
                  </Col>

                  <Col sm={6}>
                    <div className='modal-form-title required'>Maximum redials (seconds)</div>
                    <Input
                      type='text'
                      value={clientMode.maximumRedials}
                      isInvalid={clientMode.maximumRedials === ''}
                      placeholder='1 - 86400'
                      onChange={e => changeValue({ key: 'maximumRedials', value: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title' style={{marginTop: '20px'}}>Pseudowire interface IP (optional)</div>
                      <Input
                        type='text'
                        value={clientMode.pseudowireInterfaceIp}
                        isInvalid={clientMode.pseudowireInterfaceIp === ''}
                        placeholder='e.g. 192.168.1.10'
                        onChange={e => changeValue({ key: 'pseudowireInterfaceIp', value: e.target.value })}
                      />
                  </Col>

                  <Col sm={6}>
                    <div className='modal-form-title' style={{height: 'auto'}}>Pseudowire interface subnet mask (optional)</div>
                    <Input
                      type='text'
                      value={clientMode.pseudowireInterfaceSubnetMask}
                      isInvalid={clientMode.pseudowireInterfaceSubnetMask === ''}
                      placeholder='e.g. 255.255.255.0'
                      onChange={e => changeValue({ key: 'pseudowireInterfaceSubnetMask', value: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className='mt-3'>
                  <div className='modal-form-title'>Peer Pseudowire interface IP (optional)</div>
                  <Col sm={6}>
                    <Input
                      type='text'
                      value={clientMode.peerPseudowireInterfaceIp}
                      isInvalid={clientMode.peerPseudowireInterfaceIp === ''}
                      placeholder='e.g. 192.168.1.10'
                      onChange={e => changeValue({ key: 'peerPseudowireInterfaceIp', value: e.target.value })}
                    />
                  </Col>
                </Row>

              </>
            }

            {
              clientMode.selectedClientType.value !== 'L2TPv3' &&
              <>
                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title required'>VPN server</div>
                    <Input
                      type='text'
                      isInvalid={clientMode.serverIp === ''}
                      value={clientMode.serverIp}
                      placeholder='e.g. 10.90.90.90 or abc.vpn.com'
                      onChange={e => changeValue({ key: 'serverIp', value: e.target.value })}
                    />
                  </Col>
                  <Col sm={6}>
                    <div className='modal-form-title required'>Tunnel type</div>
                    <DropdownWithItem
                      type='normal'
                      selectedItem={clientMode.selectedTunnelType}
                      itemList={clientMode.tunnelTypeList}
                      onClick={item =>
                        changeDropdown({
                          item,
                          listKey: 'tunnelTypeList',
                          selectedKey: 'selectedTunnelType'
                        })
                      }
                    />
                  </Col>
                </Row>

                {
                  clientMode.selectedTunnelType.value === 'splitTunnel' &&
                  <Row className='mt-3'>
                    <Col sm={6}>
                      <div className='modal-form-title required'>Remote network</div>
                      <Input
                        type='text'
                        isInvalid={clientMode.remoteNetwork === ''}
                        value={clientMode.remoteNetwork}
                        placeholder='e.g. 192.168.200.0'
                        onChange={e => changeValue({ key: 'remoteNetwork', value: e.target.value })}
                      />
                    </Col>
                    <Col sm={6}>
                      <div className='modal-form-title required'>Remote netmask</div>
                      <Input
                        type='text'
                        isInvalid={clientMode.remoteNetmask === ''}
                        value={clientMode.remoteNetmask}
                        placeholder='e.g. 255.255.255.0'
                        onChange={e => changeValue({ key: 'remoteNetmask', value: e.target.value })}
                      />
                    </Col>
                  </Row>
                }

                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title'>Username (optional)</div>
                    <Input
                      type='text'
                      isInvalid={clientMode.userName === ''}
                      value={clientMode.userName}
                      placeholder='1-64 characters'
                      onChange={e => changeValue({ key: 'userName', value: e.target.value })}
                    />
                  </Col>
                  <Col sm={6}>
                    <div className='modal-form-title'>Password (optional)</div>
                    <Input
                      type='text'
                      isInvalid={clientMode.password === ''}
                      value={clientMode.password}
                      placeholder='8-63 characters'
                      onChange={e => changeValue({ key: 'password', value: e.target.value })}
                    />
                  </Col>
                </Row>

              </>
            }

            {
              clientMode.selectedClientType.value === 'L2TP' &&
              <Row className='mt-4'>
                <Col sm={6}>
                  <div className='modal-form-title'>Enable secret key</div>
                  <div className='d-flex'>
                    <RadioButton
                      id={`enable-secret-key-enable`}
                      name={`enable-secret-key-enable`}
                      label='Enable'
                      hasRightMargin={true}
                      checked={clientMode.enableSecretKey}
                      onChange={() => changeValue({ key: 'enableSecretKey', value: true})}
                    />
                    <RadioButton
                      id={`enable-secret-key-disable`}
                      name={`enable-secret-key-disable`}
                      label='Disable'
                      checked={!clientMode.enableSecretKey}
                      onChange={() => changeValue({ key: 'enableSecretKey', value: false})}
                    />
                  </div>
                </Col>
                {
                  clientMode.enableSecretKey &&
                  <Col sm={6}>
                    <div className='modal-form-title required'>Secret key</div>
                    <InputWithIcon
                      type={clientMode.secretKeyShow ? 'text' : 'password'}
                      isInvalid={clientMode.secretKey === ''}
                      value={clientMode.secretKey}
                      placeholder='8-63 characters'
                      iconTitle={clientMode.secretKeyShow ? 'Hide password' : 'Show password'}
                      iconClassName={clientMode.secretKeyShow ? 'icon-close-eye' : 'icon-open-eye'}
                      iconOnClick={() => changeValue({ key: 'secretKeyShow', value: !clientMode.secretKeyShow })}
                      onChange={e => changeValue({ key: 'secretKey', value: e.target.value })}
                    />
                  </Col>
                }
              </Row>
            }

            {
              clientMode.selectedClientType.value !== 'L2TPv3' &&
              <Row className='mt-3'>
                <Col sm={6}>
                  <div className='modal-form-title'>MPPE</div>
                  <div className='d-flex'>
                    <RadioButton
                      id={`mppe-enable`}
                      name={`mppe-enable`}
                      label='Enable'
                      hasRightMargin={true}
                      checked={clientMode.mppe}
                      onChange={() => changeValue({ key: 'mppe', value: true})}
                    />
                    <RadioButton
                      id={`mppe-disable`}
                      name={`mppe-disable`}
                      label='Disable'
                      checked={!clientMode.mppe}
                      onChange={() => changeValue({ key: 'mppe', value: false})}
                    />
                  </div>
                </Col>

                {
                  clientMode.selectedClientType.value === 'PPTP' &&
                  <Col sm={6}>
                    <div className='modal-form-title required'>Idle timeout (seconds)s</div>
                    <Input
                      type='text'
                      isInvalid={clientMode.idleTimeout === ''}
                      value={clientMode.idleTimeout}
                      placeholder='300 - 1800'
                      onChange={e => changeValue({ key: 'idleTimeout', value: e.target.value })}
                    />
                  </Col>
                }

              </Row>
            }

            {
              clientMode.selectedClientType.value === 'L2TP' &&
              <Row className='mt-3'>
                <Col sm={6}>
                  <div className='modal-form-title'>Reconnect mode</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={clientMode.selectedReconnectMode}
                    itemList={clientMode.reconnectModeList}
                    onClick={item =>
                      changeDropdown({
                        item,
                        listKey: 'reconnectModeList',
                        selectedKey: 'selectedReconnectMode'
                      })
                    }
                  />
                </Col>

                {
                  clientMode.selectedReconnectMode.value === 'onDemand' &&
                  <Col sm={6}>
                    <div className='modal-form-title required'>Maximum idle time (seconds)</div>
                    <Input
                      type='text'
                      isInvalid={clientMode.maxIdleTimeout === ''}
                      value={clientMode.maxIdleTimeout}
                      placeholder='300 - 1800'
                      onChange={e => changeValue({ key: 'maxIdleTimeout', value: e.target.value })}
                    />
                  </Col>
                }

              </Row>
            }

            {
              (clientMode.selectedClientType.value === 'L2TP' || clientMode.selectedClientType.value === 'L2TPv3') &&
              <Row className='mt-4'>
                <Col sm={6}>
                  <div className='modal-form-title'>L2TP Over IPsec</div>
                  <div className='d-flex'>
                    <RadioButton
                      id={`l2tp-over-ipsec-enable`}
                      name={`l2tp-over-ipsec-enable`}
                      label='Enable'
                      hasRightMargin={true}
                      checked={clientMode.l2tpOverIpSec}
                      onChange={() => changeValue({ key: 'l2tpOverIpSec', value: true})}
                    />
                    <RadioButton
                      id={`l2tp-over-ipsec-disable`}
                      name={`l2tp-over-ipsec-disable`}
                      label='Disable'
                      checked={!clientMode.l2tpOverIpSec}
                      onChange={() => changeValue({ key: 'l2tpOverIpSec', value: false})}
                    />
                  </div>
                </Col>
              </Row>
            }

            {
              clientMode.selectedClientType.value !== 'PPTP' && clientMode.l2tpOverIpSec &&
              <Row className='mt-4'>
                <Col sm={6}>
                  <div className='modal-form-title'>Dead peer detection</div>
                  <div className='d-flex'>
                    <RadioButton
                      id={`dead-peer-detection-enable`}
                      name={`dead-peer-detection-enable`}
                      label='Enable'
                      hasRightMargin={true}
                      checked={clientMode.deadPeerDetection}
                      onChange={() => changeValue({ key: 'deadPeerDetection', value: true})}
                    />
                    <RadioButton
                      id={`dead-peer-detection-disable`}
                      name={`dead-peer-detection-disable`}
                      label='Disable'
                      checked={!clientMode.deadPeerDetection}
                      onChange={() => changeValue({ key: 'deadPeerDetection', value: false})}
                    />
                  </div>
                </Col>
              </Row>
            }

            {
              clientMode.selectedClientType.value !== 'PPTP' && clientMode.l2tpOverIpSec && clientMode.deadPeerDetection &&
              <>
                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title required'>Detection interval (seconds)</div>
                    <Input
                      type='text'
                      isInvalid={clientMode.detectionInterval === ''}
                      value={clientMode.detectionInterval}
                      placeholder='10 - 999'
                      onChange={e => changeValue({ key: 'detectionInterval', value: e.target.value })}
                    />
                  </Col>
                  <Col sm={6}>
                    <div className='modal-form-title required'>Reconnect after failure</div>
                    <Input
                      type='text'
                      isInvalid={clientMode.reconnectAfterFailure === ''}
                      value={clientMode.reconnectAfterFailure}
                      placeholder='3 - 99'
                      onChange={e => changeValue({ key: 'reconnectAfterFailure', value: e.target.value })}
                    />
                  </Col>
                </Row>
              </>
            }

          </>
        }

        {
          clientMode.isNext === 1 &&

          <>
            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>IKE version</div>
                <div className='d-flex'>
                  <RadioButton
                    id={`client-mode-ike-version-enable`}
                    name={`client-mode-ike-version-enable`}
                    label='IKEv1'
                    hasRightMargin={true}
                    checked={clientMode.ikeVersion === 'IKEv1'}
                    onChange={() => changeValue({ key: 'ikeVersion', value: 'IKEv1'})}
                  />
                  <RadioButton
                    id={`client-mode-ike-version-disable`}
                    name={`client-mode-ike-version-disable`}
                    label='IKEv2'
                    checked={clientMode.ikeVersion === 'IKEv2'}
                    onChange={() => changeValue({ key: 'ikeVersion', value: 'IKEv2'})}
                  />
                </div>
              </Col>
            </Row>

            <div className='mt-4 modal-subtitle'>IKE phase-1 settings</div>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Exchange mode</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={clientMode.selectedExchangeMode}
                  itemList={clientMode.exchangeModeList}
                  onClick={item =>
                    changeDropdown({
                      item,
                      listKey: 'exchangeModeList',
                      selectedKey: 'selectedExchangeMode'
                    })
                  }
                />
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Local identifier type</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={clientMode.selectedLocalIdentifierType}
                  itemList={clientMode.localIdentifierTypeList}
                  onClick={item =>
                    changeDropdown({
                      item,
                      listKey: 'localIdentifierTypeList',
                      selectedKey: 'selectedLocalIdentifierType'
                    })
                  }
                />
              </Col>
              {
                (clientMode.selectedLocalIdentifierType.value === 'fqdn' || clientMode.selectedLocalIdentifierType.value === 'userFqdn') &&
                <Col sm={6}>
                  <div className='modal-form-title required'>Local identifier</div>
                  <Input
                    type='text'
                    isInvalid={clientMode.localIdentifier === ''}
                    value={clientMode.localIdentifier}
                    placeholder='e.g. dlink.com'
                    onChange={e => changeValue({ key: 'localIdentifier', value: e.target.value })}
                  />
                </Col>
              }
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Remote identifier type</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={clientMode.selectedRemoteIdentifierType}
                  itemList={clientMode.remoteIdentifierTypeList}
                  onClick={item =>
                    changeDropdown({
                      item,
                      listKey: 'remoteIdentifierTypeList',
                      selectedKey: 'selectedRemoteIdentifierType'
                    })
                  }
                />
              </Col>
              {
                (clientMode.selectedRemoteIdentifierType.value === 'fqdn' || clientMode.selectedRemoteIdentifierType.value === 'userFqdn') &&
                <Col sm={6}>
                  <div className='modal-form-title required'>Remote identifier</div>
                  <Input
                    type='text'
                    isInvalid={clientMode.remoteIdentifier === ''}
                    value={clientMode.remoteIdentifier}
                    placeholder='e.g. dlink.com'
                    onChange={e => changeValue({ key: 'remoteIdentifier', value: e.target.value })}
                  />
                </Col>
              }
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>DH group</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={clientMode.selectedDHGroup}
                  itemList={clientMode.dhGroupListList}
                  onClick={item =>
                    changeDropdown({
                      item,
                      listKey: 'dhGroupListList',
                      selectedKey: 'selectedDHGroup'
                    })
                  }
                />
              </Col>
              <Col sm={6}>
                <div className='modal-form-title'>Encryption algorithm</div>
                <DropdownWithCheckbox
                  id='encryption-algorithm-list'
                  label='298eeaf32a'
                  type='checkbox'
                  itemList={clientMode.phase1EncryptionAlgorithmList}
                  onChange={item =>
                    changeDropdownCheckbox({
                      item,
                      listKey: 'phase1EncryptionAlgorithmList'
                    })
                  }
                />
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Authentication algorithm</div>
                <DropdownWithCheckbox
                  id='authentication-algorithm-list'
                  label='298eeaf32a'
                  type='checkbox'
                  itemList={clientMode.phase1AuthenticationAlgorithmList}
                  onChange={item =>
                    changeDropdownCheckbox({
                      item,
                      listKey: 'phase1AuthenticationAlgorithmList'
                    })
                  }
                />
              </Col>
              <Col sm={6}>
                <div className='modal-form-title required'>SA lifetime (sec.)</div>
                <Input
                  type='text'
                  isInvalid={clientMode.lifetime === ''}
                  value={clientMode.lifetime}
                  placeholder='300-604800'
                  onChange={e => changeValue({ key: 'lifetime', value: e.target.value })}
                />
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Authentication method</div>
                <div
                  className="v2-modal-form-field v2-mb5"
                  style={{color: '#8f8f8f'}}
                >
                  Pre-shared key
                </div>
              </Col>
              <Col sm={6}>
                <div className='modal-form-title required'>Pre-shared key</div>
                <InputWithIcon
                  type={clientMode.pskKeyShow ? 'text' : 'password'}
                  isInvalid={clientMode.pskKey === ''}
                  value={clientMode.pskKey}
                  placeholder='8-63 characters'
                  iconTitle={clientMode.pskKeyShow ? 'Hide password' : 'Show password'}
                  iconClassName={clientMode.pskKeyShow ? 'icon-close-eye' : 'icon-open-eye'}
                  iconOnClick={e => changeValue({ key: 'pskKeyShow', value: !clientMode.pskKeyShow })}
                  onChange={e => changeValue({ key: 'pskKey', value: e.target.value })}
                />
              </Col>
            </Row>

            <Row className='mt-4'>
              <Col sm={6}>
                <div className='modal-form-title'>Extended authentication</div>
                <div className='d-flex'>
                  <RadioButton
                    id={`client-mode-extended-auth-enable`}
                    name={`client-mode-extended-auth-enable`}
                    label='Enable'
                    hasRightMargin={true}
                    checked={clientMode.extendedAuth}
                    onChange={() => changeValue({ key: 'extendedAuth', value: true})}
                  />
                  <RadioButton
                    id={`client-mode-extended-auth-disable`}
                    name={`client-mode-extended-auth-disable`}
                    label='Disable'
                    checked={!clientMode.extendedAuth}
                    onChange={() => changeValue({ key: 'extendedAuth', value: false})}
                  />
                </div>
              </Col>
            </Row>


            {
              clientMode.extendedAuth &&
              <>
                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title'>Extended authentication type</div>
                    <DropdownWithItem
                      type='normal'
                      selectedItem={clientMode.selectedPhase1ExtendedAuthType}
                      itemList={clientMode.phase1AuthTypeList}
                      onClick={item =>
                        changeDropdown({
                          item,
                          listKey: 'phase1AuthTypeList',
                          selectedKey: 'selectedPhase1ExtendedAuthType'
                        })
                      }
                    />
                  </Col>

                </Row>

                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title required'>Username</div>
                    <Input
                      type='text'
                      isInvalid={clientMode.extendedUserName === ''}
                      value={clientMode.extendedUserName}
                      placeholder='1-64 characters'
                      onChange={e => changeValue({ key: 'extendedUserName', value: e.target.value })}
                    />
                  </Col>
                  <Col sm={6}>
                    <div className='modal-form-title required'>Password</div>
                    <InputWithIcon
                      type={clientMode.extendedPasswordShow ? 'text' : 'password'}
                      isInvalid={clientMode.extendedPassword === ''}
                      value={clientMode.extendedPassword}
                      placeholder='8-63 characters'
                      iconTitle={clientMode.extendedPasswordShow ? 'Hide password' : 'Show password'}
                      iconClassName={clientMode.extendedPasswordShow ? 'icon-close-eye' : 'icon-open-eye'}
                      iconOnClick={e => changeValue({ key: 'extendedPasswordShow', value: !clientMode.extendedPasswordShow })}
                      onChange={e => changeValue({ key: 'extendedPassword', value: e.target.value })}
                    />
                  </Col>
                </Row>

              </>
            }

          </>
        }

        {
          clientMode.isNext === 2 &&
          <>
            <div className='mt-4 modal-subtitle'>IKE phase-2 settings</div>

            <Row className='mt-2'>
              <Col sm={6}>
                <div className='modal-form-title'>Protocol selection</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={clientMode.selectedProtocolSelection}
                  itemList={clientMode.protocolSelectionList}
                  onClick={item =>
                    changeDropdown({
                      item,
                      listKey: 'protocolSelectionList',
                      selectedKey: 'selectedProtocolSelection'
                    })
                  }
                />
              </Col>
              <Col sm={6}>
                <div className='modal-form-title'>Encryption algorithm</div>
                <DropdownWithCheckbox
                  id='next-encryption-algorithm-list'
                  label='298eeaf32a'
                  type='checkbox'
                  itemList={clientMode.phase2EncryptionAlgorithmList}
                  onChange={item =>
                    changeDropdownCheckbox({
                      item,
                      listKey: 'phase2EncryptionAlgorithmList'
                    })
                  }
                />
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Authentication algorithm</div>
                <DropdownWithCheckbox
                  id='next-authentication-algorithm-list'
                  label='298eeaf32a'
                  type='checkbox'
                  itemList={clientMode.phase2AuthenticationAlgorithmList}
                  onChange={item =>
                    changeDropdownCheckbox({
                      item,
                      listKey: 'phase2AuthenticationAlgorithmList'
                    })
                  }
                />
              </Col>
              <Col sm={6}>
                <div className='modal-form-title required'>SA lifetime (sec.)</div>
                <Input
                  type='text'
                  isInvalid={clientMode.nextLifetime === ''}
                  value={clientMode.nextLifetime}
                  placeholder='300-3600'
                  onChange={e => changeValue({ key: 'nextLifetime', value: e.target.value })}
                />
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Perfect forward secrecy</div>
                <div className='d-flex'>
                  <RadioButton
                    id={`client-mode-ike-version-enable`}
                    name={`client-mode-ike-version-enable`}
                    label='Enable'
                    hasRightMargin={true}
                    checked={clientMode.forwardSecrecy}
                    onChange={() => changeValue({ key: 'forwardSecrecy', value: true})}
                  />
                  <RadioButton
                    id={`client-mode-ike-version-disable`}
                    name={`client-mode-ike-version-disable`}
                    label='Disable'
                    checked={!clientMode.forwardSecrecy}
                    onChange={() => changeValue({ key: 'forwardSecrecy', value: false})}
                  />
                </div>
              </Col>

              {
                clientMode.forwardSecrecy &&
                <Col sm={6}>
                  <div className='modal-form-title'>DH group</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={clientMode.selectedPhase2DHGroup}
                    itemList={clientMode.phase2DHGroupList}
                    onClick={item =>
                      changeDropdown({
                        item,
                        listKey: 'phase2DHGroupList',
                        selectedKey: 'selectedPhase2DHGroup'
                      })
                    }
                  />
                </Col>
              }
            </Row>

          </>
        }

      </div>

      <div className='footer'>

        {
          (clientMode.selectedClientType.value === 'PPTP' || !clientMode.l2tpOverIpSec) &&
          <>
            <Button
              label='Cancel'
              className='btn-cancel'
              onClick={() => {
                changeModalStatus('addClientMode', false);
                changeValue({ key: 'isNext', value: 0});
              }}
            />
            <Button
              label='Save'
              className='btn-submit'
              onClick={() => {
                changeModalStatus('addClientMode', false);
                changeValue({ key: 'isNext', value: 0});
              }}
            />
          </>
        }

        {
          clientMode.selectedClientType.value !== 'PPTP' && clientMode.l2tpOverIpSec &&
          <>
            <Button
              label='Cancel'
              className='me-auto btn-cancel'
              onClick={() => {
                changeModalStatus('addClientMode', false);
                changeValue({ key: 'isNext', value: 0});
              }}
            />

            {
              clientMode.isNext > 0 &&
              <Button
                label='Previous'
                className='btn-cancel'
                onClick={() => changeValue({ key: 'isNext', value: clientMode.isNext - 1})}
              />
            }

            {
              clientMode.isNext < 2 &&
              <Button
                label='Next'
                className='btn-submit'
                style={{marginLeft: '10px'}}
                onClick={() => changeValue({ key: 'isNext', value: clientMode.isNext + 1})}
              />
            }

            {
              clientMode.isNext === 2 &&
              <Button
                label='Save'
                className='btn-submit'
                onClick={() => {
                  changeModalStatus('addClientMode', false);
                  changeValue({ key: 'isNext', value: 0});
                }}
              />
            }
          </>
        }

      </div>

    </ModalContainer >
  );
};

export default AddModal;
