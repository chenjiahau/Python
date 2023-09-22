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

import { getEditIkeProfiles } from 'dummy/data/gateway/data/vpn/client-to-site-vpn/ike-profiles';

const EditModal = ({
  modalStatus,
  changeModalStatus,
  selectedIke,
  selectedDeviceModelName
}) => {
  const [ikeProfile, setIkeProfile] = useState(null);

  const changeValue = ({
    key,
    value
  }) => {
    const clonedIkeProfile = cloneDeep(ikeProfile);
    clonedIkeProfile[key] = value;
    setIkeProfile(clonedIkeProfile);
  }

  const changeDropdownCheckbox = ({
    item,
    listKey
  }) => {
    const clonedIkeProfile = cloneDeep(ikeProfile);
    if(item.value === 'all'){
      clonedIkeProfile[listKey].forEach(tmpItem => {
        tmpItem.checked = !item.checked;
      });
    }else{
      clonedIkeProfile[listKey].forEach(tmpItem => {
        if(tmpItem.value === item.value){
          tmpItem.checked = !item.checked;
        }
      });

      const isUnCheckedItemExist = clonedIkeProfile[listKey].filter(tmpItem => !tmpItem.checked && tmpItem.value !== 'all').length > 0;
      clonedIkeProfile[listKey][0].checked = !isUnCheckedItemExist;

    }

    setIkeProfile(clonedIkeProfile);
  }

  const changeDropdown = ({
    item,
    listKey,
    selectedKey
  }) => {
    const clonedIkeProfile = cloneDeep(ikeProfile);
    clonedIkeProfile[listKey].forEach(tmpItem => {
      tmpItem.isActive = tmpItem.value === item.value;
      if(tmpItem.isActive) clonedIkeProfile[selectedKey] = tmpItem;
    });

    setIkeProfile(clonedIkeProfile);
  }

  useEffect(() => {
    const tmpIke = getEditIkeProfiles(selectedIke);
    setIkeProfile(tmpIke);
  }, [modalStatus.editIke.status])

  if(!ikeProfile) return <></>
  return (
    <ModalContainer
      modalWidthType='modal-750px'
      openModal={modalStatus.editIke.status}
      closeModal={() => changeModalStatus('editIke', false)}
    >
      <div className='header'>
        <div className='title'>Edit IKE profile</div>
      </div>
      <div className='body'>

        {
          !ikeProfile.isNext &&

          <>
            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title required'>Profile name</div>
                <Input
                  type='text'
                  isInvalid={ikeProfile.name === ''}
                  value={ikeProfile.name}
                  placeholder='1-64 characters'
                  onChange={e => changeValue({ key: 'name', value: e.target.value })}
                />
              </Col>
              <Col sm={6}>
                <div className='modal-form-title'>IKE version</div>
                <div className='d-flex'>
                  <RadioButton
                    id={`ike-profiles-ike-version-enable`}
                    name={`ike-profiles-ike-version-enable`}
                    label='IKEv1'
                    hasRightMargin={true}
                    checked={ikeProfile.ikeVersion === 'IKEv1'}
                    onChange={() => changeValue({ key: 'ikeVersion', value: 'IKEv1'})}
                  />
                  <RadioButton
                    id={`ike-profiles-ike-version-disable`}
                    name={`ike-profiles-ike-version-disable`}
                    label='IKEv2'
                    checked={ikeProfile.ikeVersion === 'IKEv2'}
                    onChange={() => changeValue({ key: 'ikeVersion', value: 'IKEv2'})}
                  />
                </div>
              </Col>
            </Row>

            <div className='mt-4 modal-subtitle'>IKE phase-1 settings</div>

            {
              ikeProfile.ikeVersion === 'IKEv1' &&
              <Row className='mt-3'>
                <Col sm={6}>
                  <div className='modal-form-title'>Exchange mode</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={ikeProfile.selectedExchangeMode}
                    itemList={ikeProfile.exchangeModeList}
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
            }

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Local identifier type</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={ikeProfile.selectedLocalIdentifierType}
                  itemList={ikeProfile.localIdentifierTypeList}
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
                (ikeProfile.selectedLocalIdentifierType.value === 'fqdn' || ikeProfile.selectedLocalIdentifierType.value === 'userFqdn') &&
                <Col sm={6}>
                  <div className='modal-form-title required'>Local identifier</div>
                  <Input
                    type='text'
                    isInvalid={ikeProfile.localIdentifier === ''}
                    value={ikeProfile.localIdentifier}
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
                  selectedItem={ikeProfile.selectedRemoteIdentifierType}
                  itemList={ikeProfile.remoteIdentifierTypeList}
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
                (ikeProfile.selectedRemoteIdentifierType.value === 'fqdn' || ikeProfile.selectedRemoteIdentifierType.value === 'userFqdn') &&
                <Col sm={6}>
                  <div className='modal-form-title required'>Remote identifier</div>
                  <Input
                    type='text'
                    isInvalid={ikeProfile.remoteIdentifier === ''}
                    value={ikeProfile.remoteIdentifier}
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
                  selectedItem={ikeProfile.selectedDHGroup}
                  itemList={ikeProfile.dhGroupListList}
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
                  itemList={ikeProfile.encryptionAlgorithmList}
                  onChange={item =>
                    changeDropdownCheckbox({
                      item,
                      listKey: 'encryptionAlgorithmList'
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
                  itemList={ikeProfile.authenticationAlgorithmList}
                  onChange={item =>
                    changeDropdownCheckbox({
                      item,
                      listKey: 'authenticationAlgorithmList'
                    })
                  }
                />
              </Col>
              <Col sm={6}>
                <div className='modal-form-title required'>SA lifetime (sec.)</div>
                <Input
                  type='text'
                  isInvalid={ikeProfile.lifetime === ''}
                  value={ikeProfile.lifetime}
                  placeholder='300-604800'
                  onChange={e => changeValue({ key: 'lifetime', value: e.target.value })}
                />
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Authentication method</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={ikeProfile.selectedAuthenticationMethod}
                  itemList={ikeProfile.authenticationMethodList}
                  onClick={item =>
                    changeDropdown({
                      item,
                      listKey: 'authenticationMethodList',
                      selectedKey: 'selectedAuthenticationMethod'
                    })
                  }
                />
              </Col>
            </Row>

            {
              ikeProfile.selectedAuthenticationMethod.value === 'psk' &&
              <Row className='mt-3'>
                <Col sm={12}>
                  <div className='modal-form-title required'>Pre-shared key</div>
                  <InputWithIcon
                    type='password'
                    isInvalid={ikeProfile.pskKey === ''}
                    value={ikeProfile.pskKey}
                    placeholder='8-63 characters'
                    iconTitle="Show password"
                    iconClassName="icon-open-eye"
                    iconOnClick={() => {
                      console.log('click on icon');
                    }}
                    onChange={e => changeValue({ key: 'pskKey', value: e.target.value })}
                  />
                </Col>
              </Row>
            }

            {
              ikeProfile.selectedAuthenticationMethod.value === 'rsa' &&
              <Row className='mt-3'>
                <Col sm={12}>
                  <div className='modal-form-title'>Certificate</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={ikeProfile.selectedCertificate}
                    itemList={ikeProfile.certificateList}
                    onClick={item =>
                      changeDropdown({
                        item,
                        listKey: 'certificateList',
                        selectedKey: 'selectedCertificate'
                      })
                    }
                  />
                </Col>
              </Row>
            }

            <Row className='mt-4'>
              <Col sm={6}>
                <div className='modal-form-title'>Extended authentication</div>
                <div className='d-flex'>
                  <RadioButton
                    id={`ike-profiles-extended-auth-enable`}
                    name={`ike-profiles-extended-auth-enable`}
                    label='Enable'
                    hasRightMargin={true}
                    checked={ikeProfile.extendedAuth}
                    onChange={() => changeValue({ key: 'extendedAuth', value: true})}
                  />
                  <RadioButton
                    id={`ike-profiles-extended-auth-disable`}
                    name={`ike-profiles-extended-auth-disable`}
                    label='Disable'
                    checked={!ikeProfile.extendedAuth}
                    onChange={() => changeValue({ key: 'extendedAuth', value: false})}
                  />
                </div>
              </Col>
            </Row>


            {
              ikeProfile.extendedAuth &&
              <>
                <Row className='mt-3'>
                  <Col sm={6}>
                    <div className='modal-form-title'>Extended authentication type</div>
                    <DropdownWithItem
                      type='normal'
                      selectedItem={ikeProfile.selectedExtendedAuthType}
                      itemList={ikeProfile.extendedAuthTypeList}
                      onClick={item =>
                        changeDropdown({
                          item,
                          listKey: 'extendedAuthTypeList',
                          selectedKey: 'selectedExtendedAuthType'
                        })
                      }
                    />
                  </Col>

                  {
                    ikeProfile.selectedExtendedAuthType.value === 'localAuth' &&
                    <Col sm={6}>
                      <div className='modal-form-title'>Local authentication</div>
                      <DropdownWithItem
                        type='normal'
                        selectedItem={ikeProfile.selectedLocalAuthenticationList}
                        itemList={ikeProfile.localAuthenticationListList}
                        onClick={item =>
                          changeDropdown({
                            item,
                            listKey: 'localAuthenticationListList',
                            selectedKey: 'selectedLocalAuthenticationList'
                          })
                        }
                      />
                    </Col>
                  }

                </Row>

                {
                  ikeProfile.selectedExtendedAuthType.value === 'ipSec' &&
                  <Row className='mt-3'>
                    <Col sm={6}>
                      <div className='modal-form-title required'>Username</div>
                      <Input
                        type='text'
                        isInvalid={ikeProfile.ipsecUserName === ''}
                        value={ikeProfile.ipsecUserName}
                        placeholder='1-64 characters'
                        onChange={e => changeValue({ key: 'ipsecUserName', value: e.target.value })}
                      />
                    </Col>
                    <Col sm={6}>
                      <div className='modal-form-title required'>Password</div>
                      <Input
                        type='text'
                        isInvalid={ikeProfile.ipsecPassword === ''}
                        value={ikeProfile.ipsecPassword}
                        placeholder='1-64 characters'
                        onChange={e => changeValue({ key: 'ipsecPassword', value: e.target.value })}
                      />
                    </Col>
                  </Row>
                }


                {
                  ikeProfile.selectedExtendedAuthType.value === 'authServer' &&
                  <>
                    <Row className='mt-3'>
                      <Col sm={6}>
                        <div className='modal-form-title'>Authentication server</div>
                        <DropdownWithItem
                          type='normal'
                          selectedItem={ikeProfile.selectedAuthenticationServer}
                          itemList={ikeProfile.authenticationServerList}
                          onClick={item =>
                            changeDropdown({
                              item,
                              listKey: 'authenticationServerList',
                              selectedKey: 'selectedAuthenticationServer'
                            })
                          }
                        />
                      </Col>
                      <Col sm={6}>
                        <div className='modal-form-title'>RADIUS server</div>
                        <DropdownWithItem
                          type='normal'
                          selectedItem={ikeProfile.selectedRadiusServer}
                          itemList={ikeProfile.radiusServerList}
                          onClick={item =>
                            changeDropdown({
                              item,
                              listKey: 'radiusServerList',
                              selectedKey: 'selectedRadiusServer'
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
                          selectedItem={ikeProfile.selectedExtendedAuthenticationMethod}
                          itemList={ikeProfile.extendedAuthenticationMethodList}
                          onClick={item =>
                            changeDropdown({
                              item,
                              listKey: 'extendedAuthenticationMethodList',
                              selectedKey: 'selectedExtendedAuthenticationMethod'
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
          ikeProfile.isNext &&
          <>
            <div className='mt-4 modal-subtitle'>IKE phase-2 settings</div>

            <Row className='mt-2'>
              <Col sm={6}>
                <div className='modal-form-title'>Protocol selection</div>
                <DropdownWithItem
                  type='normal'
                  selectedItem={ikeProfile.selectedProtocolSelection}
                  itemList={ikeProfile.protocolSelectionList}
                  onClick={item =>
                    changeDropdown({
                      item,
                      listKey: 'protocolSelectionList',
                      selectedKey: 'selectedProtocolSelection'
                    })
                  }
                />
              </Col>
              {
                ikeProfile.selectedProtocolSelection.value === 'ESP' &&
                <Col sm={6}>
                  <div className='modal-form-title'>Encryption algorithm</div>
                  <DropdownWithCheckbox
                    id='next-encryption-algorithm-list'
                    label='298eeaf32a'
                    type='checkbox'
                    itemList={ikeProfile.nextEncryptionAlgorithmList}
                    onChange={item =>
                      changeDropdownCheckbox({
                        item,
                        listKey: 'nextEncryptionAlgorithmList'
                      })
                    }
                  />
                </Col>
              }
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Authentication algorithm</div>
                <DropdownWithCheckbox
                  id='next-authentication-algorithm-list'
                  label='298eeaf32a'
                  type='checkbox'
                  itemList={ikeProfile.nextAuthenticationMethodList}
                  onChange={item =>
                    changeDropdownCheckbox({
                      item,
                      listKey: 'nextAuthenticationMethodList'
                    })
                  }
                />
              </Col>
              <Col sm={6}>
                <div className='modal-form-title required'>SA lifetime (sec.)</div>
                <Input
                  type='text'
                  isInvalid={ikeProfile.nextLifetime === ''}
                  value={ikeProfile.nextLifetime}
                  placeholder='300-604800'
                  onChange={e => changeValue({ key: 'nextLifetime', value: e.target.value })}
                />
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col sm={6}>
                <div className='modal-form-title'>Perfect forward secrecy</div>
                <div className='d-flex'>
                  <RadioButton
                    id={`ike-profiles-ike-version-enable`}
                    name={`ike-profiles-ike-version-enable`}
                    label='Enable'
                    hasRightMargin={true}
                    checked={ikeProfile.forwardSecrecy}
                    onChange={() => changeValue({ key: 'forwardSecrecy', value: true})}
                  />
                  <RadioButton
                    id={`ike-profiles-ike-version-disable`}
                    name={`ike-profiles-ike-version-disable`}
                    label='Disable'
                    checked={!ikeProfile.forwardSecrecy}
                    onChange={() => changeValue({ key: 'forwardSecrecy', value: false})}
                  />
                </div>
              </Col>

              {
                ikeProfile.forwardSecrecy &&
                <Col sm={6}>
                  <div className='modal-form-title'>DH group</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={ikeProfile.selectedNextDHGroup}
                    itemList={ikeProfile.nextDHGroupList}
                    onClick={item =>
                      changeDropdown({
                        item,
                        listKey: 'nextDHGroupList',
                        selectedKey: 'selectedNextDHGroup'
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
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus('editIke', false)}
        />

        <div className='ms-auto'>

          {
            !ikeProfile.isNext &&
            <Button
              label='Next'
              className='btn-submit'
              onClick={() => changeValue({ key: 'isNext', value: true})}
            />
          }

          {
            ikeProfile.isNext &&
            <>
              <Button
                label='Previous'
                className='btn-cancel'
                onClick={() => changeValue({ key: 'isNext', value: false})}
              />
              <Button
                label='Save'
                className='btn-submit'
                style={{marginLeft: '10px'}}
                onClick={() => changeModalStatus('editIke', false)}
              />
            </>
          }

        </div>

      </div>

    </ModalContainer >
  );
};

export default EditModal;
