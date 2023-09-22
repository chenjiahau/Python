import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  DropdownWithItem, Button, ModalContainer, Input, InputWithIcon,
  RadioButton, DropdownWithCheckbox, TooltipDialog
} from 'components/';

// Dummy data & util
import { getIpConfig } from 'dummy/data/gateway/data/network/addressing/ip-management';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const EditIpModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    vlanList,
    selectedIp,
  } = props;

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    if (!modalStatus.editIp.status) {
      return;
    }

    const ipConfig = cloneDeep(selectedIp.config);

    // VLAN
    const vlanDropdown = [];
    vlanList.forEach(vlan => {
      vlanDropdown.push({
        ...vlan,
        isActive: false
      });
    });

    vlanDropdown.forEach(item => {
      if (item.title === ipConfig.interface) {
        item.isActive = true;
      }
    });

    ipConfig.interface = vlanDropdown;
    setForm(ipConfig);
  }, [modalStatus.editIp.status]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editIp.status}
      closeModal={() => changeModalStatus(modalStatus.editIp.self, false)}
    >
      <div className='header'>
        <div className='title'>Edit IP management configuration</div>
      </div>
      <div className='body'>
        {/* Name, Interface */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Name</div>
            <Input
              type='text'
              value={form.name}
              placeholder='1-64 characters'
              onChange={e => changeValue('name', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>Interface</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.interface.find(item => item.isActive)}
              itemList={form.interface}
              onClick={item => changeValue('interface', item)}
            />
          </Col>
        </Row>
        {/* IP address, MAC address */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>IP address</div>
            <Input
              type='text'
              value={form.ipAddress}
              placeholder='e.g. 192.168.200.101'
              onChange={e => changeValue('ipAddress', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title required'>MAC address</div>
            <Input
              type='text'
              value={form.macAddress}
              placeholder='e.g. AB:CD:EF:12:34:56'
              onChange={e => changeValue('macAddress', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
        {/* IPv6 suffix (optional) */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>IPv6 suffix (optional)</div>
            <Input
              type='text'
              value={form.ipv6Suffix}
              placeholder='e.g. ::1'
              onChange={e => changeValue('ipv6Suffix', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
        {/* IP MAC binding, DHCP IP reservation */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>IP MAC binding</div>
            <div className='form-field--horizontal'>
              <RadioButton
                id='ip-mac-binding-enable'
                name='ipMacBindingEnable'
                label='Enable'
                hasRightMargin={true}
                checked={form.ipMacBinding}
                onChange={() => changeValue('ipMacBinding', true)}
              />
              <RadioButton
                id='ip-mac-binding-disable'
                name='ipMacBindingDisable'
                label='Disable'
                checked={!form.ipMacBinding}
                onChange={() => changeValue('ipMacBinding', false)}
              />
            </div>
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>DHCP IP reservation</div>
            <div className='form-field--horizontal'>
              <RadioButton
                id='dhcp-ip-reservation-enable'
                name='dhcpIpReservationEnable'
                label='Enable'
                hasRightMargin={true}
                checked={form.dhcpIpReservation}
                onChange={() => changeValue('dhcpIpReservation', true)}
              />
              <RadioButton
                id='dhcp-ip-reservation-disable'
                name='dhcpIpReservationDisable'
                label='Disable'
                checked={!form.dhcpIpReservation}
                onChange={() => changeValue('dhcpIpReservation', false)}
              />
            </div>
          </Col>
        </Row>
      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.editIp.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.editIp.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default EditIpModal;
