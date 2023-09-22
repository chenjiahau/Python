import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  DropdownWithItem,
  Button,
  ModalContainer,
  Input
} from 'components';

import { getAddGreTunnel } from 'dummy/data/gateway/data/vpn/gre-tunnel/gre-tunnel-configuration';

const AddModal = ({
  modalStatus,
  changeModalStatus,
  selectedDeviceModelName
}) => {
  const [greTunnel, setGreTunnel] = useState(null);

  const changeValue = ({
    key,
    value
  }) => {
    const clonedGreTunnel = cloneDeep(greTunnel);
    clonedGreTunnel[key] = value;
    setGreTunnel(clonedGreTunnel);
  }

  const changeDropdown = ({
    item,
    listKey,
    selectedKey
  }) => {
    const clonedGreTunnel = cloneDeep(greTunnel);
    clonedGreTunnel[listKey].forEach(tmpItem => {
      tmpItem.isActive = tmpItem.value === item.value;
      if(tmpItem.isActive) clonedGreTunnel[selectedKey] = tmpItem;
    });

    setGreTunnel(clonedGreTunnel);
  }

  useEffect(() => {
    const tmpGreTunnel = getAddGreTunnel();
    setGreTunnel(tmpGreTunnel);
  }, [modalStatus.addGreTunnel.status])

  if(!greTunnel) return <></>
  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addGreTunnel.status}
      closeModal={() => changeModalStatus('addGreTunnel', false)}
    >
      <div className='header'>
        <div className='title'>Add GRE tunnel</div>
      </div>
      <div className='body'>

        <Row className='mt-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>GRE tunnel name</div>
            <Input
              type='text'
              value={greTunnel.name}
              isInvalid={greTunnel.name === ''}
              placeholder='1-32 characters'
              onChange={e => changeValue({ key: 'name', value: e.target.value })}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>Interface</div>
            <DropdownWithItem
              type='normal'
              selectedItem={greTunnel.selectedInterface}
              itemList={greTunnel.interfaceList}
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
            <div className='modal-form-title'>IP address type</div>
            <DropdownWithItem
              type='normal'
              selectedItem={greTunnel.selectedIpAddressType}
              itemList={greTunnel.ipAddressTypeList}
              onClick={item =>
                changeDropdown({
                  item,
                  listKey: 'ipAddressTypeList',
                  selectedKey: 'selectedIpAddressType'
                })
              }
            />
          </Col>
        </Row>

        <Row className='mt-3'>

          <Col sm={6}>
            <div className='modal-form-title required'>GRE tunnel IP</div>
            <Input
              type='text'
              value={greTunnel.greTunnelIp}
              isInvalid={greTunnel.greTunnelIp === ''}
              placeholder={greTunnel.selectedIpAddressType.value === 'ipv4' ? 'e.g. 192.168.200.101' : 'e.g. 2001:db8:1234::1/64'}
              onChange={e => changeValue({ key: 'greTunnelIp', value: e.target.value })}
            />
          </Col>

          {
            greTunnel.selectedIpAddressType.value === 'ipv4' &&
            <Col sm={6}>
              <div className='modal-form-title required'>Subnet mask</div>
              <Input
                type='text'
                value={greTunnel.subnetMask}
                isInvalid={greTunnel.subnetMask === ''}
                placeholder='e.g. 255.255.255.0'
                onChange={e => changeValue({ key: 'subnetMask', value: e.target.value })}
              />
            </Col>
          }

          <Col sm={6}>
            <div className={`modal-form-title required ${greTunnel.selectedIpAddressType.value === 'ipv4' ? 'mt-3' : ''}`}>Remote IP</div>
            <Input
              type='text'
              value={greTunnel.remoteIp}
              isInvalid={greTunnel.remoteIp === ''}
              placeholder={greTunnel.selectedIpAddressType.value === 'ipv4' ? 'e.g. 10.90.90.90' : 'e.g. 2001::90'}
              onChange={e => changeValue({ key: 'remoteIp', value: e.target.value })}
            />
          </Col>

        </Row>

        <div className='mt-4 modal-subtitle'>Static route configuration</div>

        <Row className='mt-3'>

          <Col sm={6}>
            <div className='modal-form-title required'>IP address</div>
            <Input
              type='text'
              value={greTunnel.staticIp}
              isInvalid={greTunnel.staticIp === ''}
              placeholder={greTunnel.selectedIpAddressType.value === 'ipv4' ? 'e.g. 192.168.10.0' : 'e.g. 2001:db8:abcd::1/64'}
              onChange={e => changeValue({ key: 'staticIp', value: e.target.value })}
            />
          </Col>

          {
            greTunnel.selectedIpAddressType.value === 'ipv4' &&
            <Col sm={6}>
              <div className='modal-form-title required'>Subnet mask</div>
              <Input
                type='text'
                value={greTunnel.staticSubnetMask}
                isInvalid={greTunnel.staticSubnetMask === ''}
                placeholder='e.g. 255.255.255.0'
                onChange={e => changeValue({ key: 'staticSubnetMask', value: e.target.value })}
              />
            </Col>
          }

          <Col sm={6}>
            <div className={`modal-form-title required ${greTunnel.selectedIpAddressType.value === 'ipv4' ? 'mt-3' : ''}`}>Gateway IP address</div>
            <Input
              type='text'
              value={greTunnel.staticGatewayIp}
              isInvalid={greTunnel.staticGatewayIp === ''}
              placeholder={greTunnel.selectedIpAddressType.value === 'ipv4' ? 'e.g. 192.168.200.100' : 'e.g. 2001:db8:1234::2'}
              onChange={e => changeValue({ key: 'staticGatewayIp', value: e.target.value })}
            />
          </Col>

        </Row>

      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus('addGreTunnel', false)}
        />

        <Button
          label='Save'
          className='btn-submit'
          style={{marginLeft: '10px'}}
          onClick={() => changeModalStatus('addGreTunnel', false)}
        />

      </div>

    </ModalContainer >
  );
};

export default AddModal;
