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

import { getEditServerMode } from 'dummy/data/gateway/data/vpn/pptp-l2tp/server-mode';

const EditModal = ({
  modalStatus,
  changeModalStatus,
  selectedServerMode,
  selectedDeviceModelName
}) => {
  const [serverMode, setServerMode] = useState(null);

  const changeValue = ({
    key,
    value
  }) => {
    const clonedServerMode = cloneDeep(serverMode);
    clonedServerMode[key] = value;
    setServerMode(clonedServerMode);
  }

  const changeDropdownCheckbox = ({
    item,
    listKey
  }) => {
    const clonedServerMode = cloneDeep(serverMode);
    if(item.value === 'all'){
      clonedServerMode[listKey].forEach(tmpItem => {
        tmpItem.checked = !item.checked;
      });
    }else{
      clonedServerMode[listKey].forEach(tmpItem => {
        if(tmpItem.value === item.value){
          tmpItem.checked = !item.checked;
        }
      });

      const isUnCheckedItemExist = clonedServerMode[listKey].filter(tmpItem => !tmpItem.checked && tmpItem.value !== 'all').length > 0;
      clonedServerMode[listKey][0].checked = !isUnCheckedItemExist;

    }

    setServerMode(clonedServerMode);
  }

  const changeDropdown = ({
    item,
    listKey,
    selectedKey
  }) => {
    const clonedServerMode = cloneDeep(serverMode);
    clonedServerMode[listKey].forEach(tmpItem => {
      tmpItem.isActive = tmpItem.value === item.value;
      if(tmpItem.isActive) clonedServerMode[selectedKey] = tmpItem;
    });

    setServerMode(clonedServerMode);
  }

  useEffect(() => {
    const tmpServeMode = getEditServerMode(selectedServerMode);
    setServerMode(tmpServeMode);
  }, [modalStatus.editServerMode.status])

  if(!serverMode) return <></>
  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editServerMode.status}
      closeModal={() => changeModalStatus('editServerMode', false)}
    >
      <div className='header'>
        <div className='title'>Edit PPTP/L2TP server</div>
      </div>
      <div className='body'>

        {
          serverMode.isNext === 0 &&
          <>
            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Server type</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={serverMode.selectedServerType}
                  itemList={serverMode.serverTypeList}
                  onClick={item =>
                    changeDropdown({
                      item,
                      listKey: 'serverTypeList',
                      selectedKey: 'selectedServerType'
                    })
                  }
                />
              </Col>
              <Col sm={6}>
                <div className='modal-form-title required'>Name</div>
                <Input
                  type='text'
                  value={serverMode.name}
                  isInvalid={serverMode.name === ''}
                  placeholder='1-64 characters'
                  onChange={e => changeValue({ key: 'name', value: e.target.value })}
                />
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Routing mode</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={serverMode.selectedRoutingMode}
                  itemList={serverMode.routingModeList}
                  onClick={item =>
                    changeDropdown({
                      item,
                      listKey: 'routingModeList',
                      selectedKey: 'selectedRoutingMode'
                    })
                  }
                />
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title required'>Starting IP address</div>
                <Input
                  type='text'
                  isInvalid={serverMode.startIpAddress === ''}
                  value={serverMode.startIpAddress}
                  placeholder='e.g. 10.0.0.2'
                  onChange={e => changeValue({ key: 'startIpAddress', value: e.target.value })}
                />
              </Col>
              <Col sm={6}>
                <div className='modal-form-title required'>Ending IP address</div>
                <Input
                  type='text'
                  isInvalid={serverMode.endIpAddress === ''}
                  value={serverMode.endIpAddress}
                  placeholder='e.g. 10.0.0.102'
                  onChange={e => changeValue({ key: 'endIpAddress', value: e.target.value })}
                />
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Authentication server</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={serverMode.selectedAuthenticationServerType}
                  itemList={serverMode.authenticationServerTypeList}
                  onClick={item =>
                    changeDropdown({
                      item,
                      listKey: 'authenticationServerTypeList',
                      selectedKey: 'selectedAuthenticationServerType'
                    })
                  }
                />
              </Col>

              {
                serverMode.selectedAuthenticationServerType.value === 'localAuth' &&
                <Col sm={6}>
                  <div className='modal-form-title'>Local authentication</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={serverMode.selectedLocalAuthentication}
                    itemList={serverMode.localAuthenticationList}
                    onClick={item =>
                      changeDropdown({
                        item,
                        listKey: 'localAuthenticationList',
                        selectedKey: 'selectedLocalAuthentication'
                      })
                    }
                  />
                </Col>
              }

              {
                serverMode.selectedAuthenticationServerType.value === 'radius' &&
                <Col sm={6}>
                  <div className='modal-form-title'>RADIUS server</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={serverMode.selectedRadiusServer}
                    itemList={serverMode.radiusServerList}
                    onClick={item =>
                      changeDropdown({
                        item,
                        listKey: 'radiusServerList',
                        selectedKey: 'selectedRadiusServer'
                      })
                    }
                  />
                </Col>
              }

            </Row>

            {
              serverMode.selectedAuthenticationServerType.value !== 'noneAuth' &&
              <Row className='mt-3'>
                <Col sm={6}>
                  <div className='modal-form-title'>Authentication protocol</div>
                  <DropdownWithCheckbox
                    id='authentication-protocol-list'
                    label='2 Selected'
                    type='checkbox'
                    itemList={serverMode.authenticationProtocolList}
                    onChange={item =>
                      changeDropdownCheckbox({
                        item,
                        listKey: 'authenticationProtocolList'
                      })
                    }
                  />
                </Col>
                <Col sm={6}>
                  <div className='modal-form-title'>Encryption</div>
                  <DropdownWithCheckbox
                    id='encryption-list'
                    label='0 Selected'
                    type='checkbox'
                    itemList={serverMode.encryptionList}
                    onChange={item =>
                      changeDropdownCheckbox({
                        item,
                        listKey: 'encryptionList'
                      })
                    }
                  />
                </Col>
              </Row>
            }

            {
              serverMode.selectedServerType.value === 'L2TP' &&
              <Row className='mt-4'>
                <Col sm={6}>
                  <div className='modal-form-title'>Enable secret key</div>
                  <div className='d-flex'>
                    <RadioButton
                      id={`enable-secret-key-enable`}
                      name={`enable-secret-key-enable`}
                      label='Enable'
                      hasRightMargin={true}
                      checked={serverMode.enableSecretKey}
                      onChange={() => changeValue({ key: 'enableSecretKey', value: true})}
                    />
                    <RadioButton
                      id={`enable-secret-key-disable`}
                      name={`enable-secret-key-disable`}
                      label='Disable'
                      checked={!serverMode.enableSecretKey}
                      onChange={() => changeValue({ key: 'enableSecretKey', value: false})}
                    />
                  </div>
                </Col>
                {
                  serverMode.enableSecretKey &&
                  <Col sm={6}>
                    <div className='modal-form-title required'>Secret key</div>
                    <InputWithIcon
                      type={serverMode.secretKeyShow ? 'text' : 'password'}
                      isInvalid={serverMode.secretKey === ''}
                      value={serverMode.secretKey}
                      placeholder='8-63 characters'
                      iconTitle={serverMode.secretKeyShow ? 'Hide password' : 'Show password'}
                      iconClassName={serverMode.secretKeyShow ? 'icon-close-eye' : 'icon-open-eye'}
                      iconOnClick={() => changeValue({ key: 'secretKeyShow', value: !serverMode.secretKeyShow })}
                      onChange={e => changeValue({ key: 'secretKey', value: e.target.value })}
                    />
                  </Col>
                }
              </Row>
            }


            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title required'>Idle timeout (seconds)s</div>
                <Input
                  type='text'
                  isInvalid={serverMode.idleTimeout === ''}
                  value={serverMode.idleTimeout}
                  placeholder='300 - 1800'
                  onChange={e => changeValue({ key: 'idleTimeout', value: e.target.value })}
                />
              </Col>
            </Row>

            {
              serverMode.selectedServerType.value === 'PPTP' &&
              <Row className='mt-4'>
                <Col sm={6}>
                  <div className='modal-form-title'>Netbios</div>
                  <div className='d-flex'>
                    <RadioButton
                      id={`net-bios-enable`}
                      name={`net-bios-enable`}
                      label='Enable'
                      hasRightMargin={true}
                      checked={serverMode.netBios}
                      onChange={() => changeValue({ key: 'netBios', value: true})}
                    />
                    <RadioButton
                      id={`net-bios-disable`}
                      name={`net-bios-disable`}
                      label='Disable'
                      checked={!serverMode.netBios}
                      onChange={() => changeValue({ key: 'netBios', value: false})}
                    />
                  </div>
                </Col>

                {
                  serverMode.netBios &&
                  <Col sm={6}>
                    <div className='modal-form-title'>WINS server</div>
                    <Input
                      type='text'
                      isInvalid={serverMode.winsServer === ''}
                      value={serverMode.winsServer}
                      placeholder='e.g. 192.168.10.1'
                      onChange={e => changeValue({ key: 'winsServer', value: e.target.value })}
                    />
                  </Col>
                }

              </Row>
            }

            {
              serverMode.selectedServerType.value === 'L2TP' &&
              <Row className='mt-4'>
                <Col sm={6}>
                  <div className='modal-form-title'>L2TP Over IPsec</div>
                  <div className='d-flex'>
                    <RadioButton
                      id={`l2tp-over-ipsec-enable`}
                      name={`l2tp-over-ipsec-enable`}
                      label='Enable'
                      hasRightMargin={true}
                      checked={serverMode.l2tpOverIpSec}
                      onChange={() => changeValue({ key: 'l2tpOverIpSec', value: true})}
                    />
                    <RadioButton
                      id={`l2tp-over-ipsec-disable`}
                      name={`l2tp-over-ipsec-disable`}
                      label='Disable'
                      checked={!serverMode.l2tpOverIpSec}
                      onChange={() => changeValue({ key: 'l2tpOverIpSec', value: false})}
                    />
                  </div>
                </Col>
              </Row>
            }

          </>
        }

        {
          serverMode.isNext === 1 &&

          <>
            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>IKE version</div>
                <div className='d-flex'>
                  <RadioButton
                    id={`server-mode-ike-version-enable`}
                    name={`server-mode-ike-version-enable`}
                    label='IKEv1'
                    hasRightMargin={true}
                    checked={serverMode.ikeVersion === 'IKEv1'}
                    onChange={() => changeValue({ key: 'ikeVersion', value: 'IKEv1'})}
                  />
                  <RadioButton
                    id={`server-mode-ike-version-disable`}
                    name={`server-mode-ike-version-disable`}
                    label='IKEv2'
                    checked={serverMode.ikeVersion === 'IKEv2'}
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
                  selectedItem={serverMode.selectedExchangeMode}
                  itemList={serverMode.exchangeModeList}
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
                  selectedItem={serverMode.selectedLocalIdentifierType}
                  itemList={serverMode.localIdentifierTypeList}
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
                (serverMode.selectedLocalIdentifierType.value === 'fqdn' || serverMode.selectedLocalIdentifierType.value === 'userFqdn') &&
                <Col sm={6}>
                  <div className='modal-form-title required'>Local identifier</div>
                  <Input
                    type='text'
                    isInvalid={serverMode.localIdentifier === ''}
                    value={serverMode.localIdentifier}
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
                  selectedItem={serverMode.selectedRemoteIdentifierType}
                  itemList={serverMode.remoteIdentifierTypeList}
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
                (serverMode.selectedRemoteIdentifierType.value === 'fqdn' || serverMode.selectedRemoteIdentifierType.value === 'userFqdn') &&
                <Col sm={6}>
                  <div className='modal-form-title required'>Remote identifier</div>
                  <Input
                    type='text'
                    isInvalid={serverMode.remoteIdentifier === ''}
                    value={serverMode.remoteIdentifier}
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
                  selectedItem={serverMode.selectedDHGroup}
                  itemList={serverMode.dhGroupListList}
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
                  itemList={serverMode.phase1EncryptionAlgorithmList}
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
                  itemList={serverMode.phase1AuthenticationAlgorithmList}
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
                  isInvalid={serverMode.lifetime === ''}
                  value={serverMode.lifetime}
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
                  type={serverMode.pskKeyShow ? 'text' : 'password'}
                  isInvalid={serverMode.pskKey === ''}
                  value={serverMode.pskKey}
                  placeholder='8-63 characters'
                  iconTitle={serverMode.pskKeyShow ? 'Hide password' : 'Show password'}
                  iconClassName={serverMode.pskKeyShow ? 'icon-close-eye' : 'icon-open-eye'}
                  iconOnClick={e => changeValue({ key: 'pskKeyShow', value: !serverMode.pskKeyShow })}
                  onChange={e => changeValue({ key: 'pskKey', value: e.target.value })}
                />
              </Col>
            </Row>

            <Row className='mt-4'>
              <Col sm={6}>
                <div className='modal-form-title'>Extended authentication</div>
                <div className='d-flex'>
                  <RadioButton
                    id={`server-mode-extended-auth-enable`}
                    name={`server-mode-extended-auth-enable`}
                    label='Enable'
                    hasRightMargin={true}
                    checked={serverMode.extendedAuth}
                    onChange={() => changeValue({ key: 'extendedAuth', value: true})}
                  />
                  <RadioButton
                    id={`server-mode-extended-auth-disable`}
                    name={`server-mode-extended-auth-disable`}
                    label='Disable'
                    checked={!serverMode.extendedAuth}
                    onChange={() => changeValue({ key: 'extendedAuth', value: false})}
                  />
                </div>
              </Col>
            </Row>


            {
              serverMode.extendedAuth &&
              <>
                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title'>Extended authentication type</div>
                    <DropdownWithItem
                      type='normal'
                      selectedItem={serverMode.selectedPhase1ExtendedAuthType}
                      itemList={serverMode.phase1AuthTypeList}
                      onClick={item =>
                        changeDropdown({
                          item,
                          listKey: 'phase1AuthTypeList',
                          selectedKey: 'selectedPhase1ExtendedAuthType'
                        })
                      }
                    />
                  </Col>

                  {
                    serverMode.selectedPhase1ExtendedAuthType.value === 'localAuth' &&
                    <Col sm={6}>
                      <div className='modal-form-title'>Local authentication</div>
                      <DropdownWithItem
                        type='normal'
                        selectedItem={serverMode.selectedPhase1LocalAuthentication}
                        itemList={serverMode.phase1LocalAuthenticationList}
                        onClick={item =>
                          changeDropdown({
                            item,
                            listKey: 'phase1LocalAuthenticationList',
                            selectedKey: 'selectedPhase1LocalAuthentication'
                          })
                        }
                      />
                    </Col>
                  }

                </Row>

                {
                  serverMode.selectedPhase1ExtendedAuthType.value === 'authServer' &&
                  <>
                    <Row className='mt-3'>
                      <Col sm={6}>
                        <div className='modal-form-title'>Authentication server</div>
                        <DropdownWithItem
                          type='normal'
                          selectedItem={serverMode.selectedPhase1AuthenticationServer}
                          itemList={serverMode.phase1AuthenticationServerList}
                          onClick={item =>
                            changeDropdown({
                              item,
                              listKey: 'phase1AuthenticationServerList',
                              selectedKey: 'selectedPhase1AuthenticationServer'
                            })
                          }
                        />
                      </Col>
                      <Col sm={6}>
                        <div className='modal-form-title'>RADIUS server</div>
                        <DropdownWithItem
                          type='normal'
                          selectedItem={serverMode.selectedPhase1RadiusServer}
                          itemList={serverMode.phase1RadiusServerList}
                          onClick={item =>
                            changeDropdown({
                              item,
                              listKey: 'phase1RadiusServerList',
                              selectedKey: 'selectedPhase1RadiusServer'
                            })
                          }
                        />
                      </Col>
                    </Row>
                    <Row className='mt-3'>
                      <Col sm={6}>
                        <div className='modal-form-title'>Authentication method</div>
                        <DropdownWithItem
                          type='normal'
                          selectedItem={serverMode.selectedPhase1AuthenticationMethod}
                          itemList={serverMode.phase1AuthenticationMethodList}
                          onClick={item =>
                            changeDropdown({
                              item,
                              listKey: 'phase1AuthenticationMethodList',
                              selectedKey: 'selectedPhase1AuthenticationMethod'
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </>
                }

              </>
            }

          </>
        }

        {
          serverMode.isNext === 2 &&
          <>
            <div className='mt-4 modal-subtitle'>IKE phase-2 settings</div>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Protocol selection</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={serverMode.selectedProtocolSelection}
                  itemList={serverMode.protocolSelectionList}
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
                  itemList={serverMode.phase2EncryptionAlgorithmList}
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
                  itemList={serverMode.phase2AuthenticationAlgorithmList}
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
                  isInvalid={serverMode.nextLifetime === ''}
                  value={serverMode.nextLifetime}
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
                    id={`server-mode-perfect-forward-secrecy-enable`}
                    name={`server-mode-perfect-forward-secrecy-enable`}
                    label='Enable'
                    hasRightMargin={true}
                    checked={serverMode.forwardSecrecy}
                    onChange={() => changeValue({ key: 'forwardSecrecy', value: true})}
                  />
                  <RadioButton
                    id={`server-mode-perfect-forward-secrecy-disable`}
                    name={`server-mode-perfect-forward-secrecy-disable`}
                    label='Disable'
                    checked={!serverMode.forwardSecrecy}
                    onChange={() => changeValue({ key: 'forwardSecrecy', value: false})}
                  />
                </div>
              </Col>

              {
                serverMode.forwardSecrecy &&
                <Col sm={6}>
                  <div className='modal-form-title'>DH group</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={serverMode.selectedPhase2DHGroup}
                    itemList={serverMode.phase2DHGroupList}
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
          (serverMode.selectedServerType.value === 'PPTP' || (serverMode.selectedServerType.value === 'L2TP' && !serverMode.l2tpOverIpSec)) &&
          <>
            <Button
              label='Cancel'
              className='btn-cancel'
              onClick={() => {
                changeModalStatus('editServerMode', false);
                changeValue({ key: 'isNext', value: 0});
              }}
            />
            <Button
              label='Save'
              className='btn-submit'
              onClick={() => {
                changeModalStatus('editServerMode', false);
                changeValue({ key: 'isNext', value: 0});
              }}
            />
          </>
        }

        {
          serverMode.selectedServerType.value === 'L2TP' && serverMode.l2tpOverIpSec &&
          <>
            <Button
              label='Cancel'
              className='me-auto btn-cancel'
              onClick={() => {
                changeModalStatus('editServerMode', false);
                changeValue({ key: 'isNext', value: 0});
              }}
            />

            {
              serverMode.isNext > 0 &&
              <Button
                label='Previous'
                className='btn-cancel'
                onClick={() => changeValue({ key: 'isNext', value: serverMode.isNext - 1})}
              />
            }

            {
              serverMode.isNext < 2 &&
              <Button
                label='Next'
                className='btn-submit'
                style={{marginLeft: '10px'}}
                onClick={() => changeValue({ key: 'isNext', value: serverMode.isNext + 1})}
              />
            }

            {
              serverMode.isNext === 2 &&
              <Button
                label='Save'
                className='btn-submit'
                onClick={() => {
                  changeModalStatus('editServerMode', false);
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

export default EditModal;
