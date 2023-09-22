import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  DropdownWithItem,
  Button,
  ModalContainer,
  Input,
  RadioButton,
  TooltipDialog
} from 'components';

import { getAddServerPolicies } from 'dummy/data/gateway/data/vpn/open-vpn/server-policies';

const AddModal = ({
  modalStatus,
  changeModalStatus,
  selectedDeviceModelName
}) => {
  const [serverPolicies, setServerPolicies] = useState(null);

  const changeValue = ({
    key,
    value
  }) => {
    const clonedServerPolicies = cloneDeep(serverPolicies);
    clonedServerPolicies[key] = value;
    setServerPolicies(clonedServerPolicies);
  }

  const changeDropdown = ({
    item,
    listKey,
    selectedKey
  }) => {
    const clonedServerPolicies = cloneDeep(serverPolicies);
    clonedServerPolicies[listKey].forEach(tmpItem => {
      tmpItem.isActive = tmpItem.value === item.value;
      if(tmpItem.isActive) clonedServerPolicies[selectedKey] = tmpItem;
    });

    setServerPolicies(clonedServerPolicies);
  }

  useEffect(() => {
    const tmpServerPolicies = getAddServerPolicies();
    setServerPolicies(tmpServerPolicies);
  }, [modalStatus.addServerPolicies.status])

  if(!serverPolicies) return <></>
  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addServerPolicies.status}
      closeModal={() => changeModalStatus('addServerPolicies', false)}
    >
      <div className='header'>
        <div className='title'>Add OpenVPN server policy</div>
      </div>
      <div className='body'>
        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>Policy name</div>
            <Input
              type='text'
              value={serverPolicies.policyName}
              isInvalid={serverPolicies.policyName === ''}
              placeholder='1-64 characters'
              onChange={e => changeValue({ key: 'policyName', value: e.target.value })}
            />
          </Col>

          <Col sm={6}>
            <div className='modal-form-title'>Policy</div>
            <DropdownWithItem
              type='normal'
              selectedItem={serverPolicies.selectedPermission}
              itemList={serverPolicies.permissionList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'permissionList',
                  selectedKey: 'selectedPermission'
                })
              }
            />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title'>Scope</div>
            <DropdownWithItem
              type='normal'
              selectedItem={serverPolicies.selectedSelectedPolicyType}
              itemList={serverPolicies.policyTypeList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'policyTypeList',
                  selectedKey: 'selectedSelectedPolicyType'
                })
              }
            />
          </Col>

          {
            serverPolicies.selectedSelectedPolicyType.value === 'USER' &&
            <Col sm={6}>
              <div className='modal-form-title required'>Username</div>
              <Input
                type='text'
                value={serverPolicies.username}
                isInvalid={serverPolicies.username === ''}
                placeholder='1-64 characters'
                onChange={e => changeValue({ key: 'username', value: e.target.value })}
              />
            </Col>
          }
        </Row>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title'>Apply policy to</div>
            <DropdownWithItem
              type='normal'
              selectedItem={serverPolicies.selectedPolicyNetworkType}
              itemList={serverPolicies.policyNetworkTypeList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'policyNetworkTypeList',
                  selectedKey: 'selectedPolicyNetworkType'
                })
              }
            />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>IP network</div>
            <Input
              type='text'
              value={serverPolicies.ipAddress}
              isInvalid={serverPolicies.ipAddress === ''}
              placeholder='e.g. 192.168.200.101'
              onChange={e => changeValue({ key: 'ipAddress', value: e.target.value })}
            />
          </Col>

          {
            serverPolicies.selectedPolicyNetworkType.value === 'IP_NETWORK' &&
            <Col sm={6}>
              <div className='modal-form-title required'>Subnet mask</div>
              <Input
                type='text'
                value={serverPolicies.ipAddress}
                isInvalid={serverPolicies.ipAddress === ''}
                placeholder='e.g. 255.255.255.0'
                onChange={e => changeValue({ key: 'ipAddress', value: e.target.value })}
              />
            </Col>
          }

        </Row>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='d-flex'>
              <div className='modal-form-title required'>Port</div>
              <TooltipDialog
                className='ms-1 me-1'
                placement='right'
                title={
                  `• Ports number must be integers.<br> • A single port number (Range: 1-65535).<br>• A port range cannot be entered comma-separared (e.g. 6881-6889).`
                }
              />
            </div>
            <Input
              type='text'
              value={serverPolicies.port}
              isInvalid={serverPolicies.port === ''}
              placeholder='1-65535'
              onChange={e => changeValue({ key: 'port', value: e.target.value })}
            />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title'>ICMP</div>
            <div className='d-flex'>
              <RadioButton
                id={`icmp-enable`}
                name={`icmp-enable`}
                label='Enable'
                hasRightMargin={true}
                checked={serverPolicies.icmpEnable}
                onChange={() => changeValue({ key: 'icmpEnable', value: true})}
              />
              <RadioButton
                id={`icmp-disable`}
                name={`icmp-disable`}
                label='Disable'
                checked={!serverPolicies.icmpEnable}
                onChange={() => changeValue({ key: 'icmpEnable', value: false})}
              />
            </div>
          </Col>
        </Row>

      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus('addServerPolicies', false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus('addServerPolicies', false)}
        />
      </div>

    </ModalContainer >
  );
};

export default AddModal;
