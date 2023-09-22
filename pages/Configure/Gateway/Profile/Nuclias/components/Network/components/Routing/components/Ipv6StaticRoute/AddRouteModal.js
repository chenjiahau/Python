import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input, RadioButton } from 'components/';

// Dummy data & util
import { getIpv6StaticRouteConfig } from 'dummy/data/gateway/data/network/routing/ipv6-static-route';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const AddRouteModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    interfaceList,
  } = props;

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    if (!modalStatus.addRoute.status) {
      return;
    }

    const routeConfig = getIpv6StaticRouteConfig();

    // Interface
    const interfaceDropdown = [];
    interfaceList.forEach(iface => {
      if (iface.type === 'WAN' && !iface.v6) {
        return;
      }

      interfaceDropdown.push({
        title: iface.interface,
        value: iface.interface,
        isActive: false
      });
    });
    interfaceDropdown[0].isActive = true;

    routeConfig.interface = interfaceDropdown;
    setForm(routeConfig);
  }, [modalStatus.addRoute.status]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addRoute.status}
      closeModal={() => changeModalStatus(modalStatus.addRoute.self, false)}
    >
      <div className='header'>
        <div className='title'>Add IPv6 static route</div>
      </div>
      <div className='body'>
        {/* Name, Destination IP address */}
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
            <div className='modal-form-title required'>Destination IP address</div>
            <Input
              type='text'
              value={form.destinationIpAddress}
              placeholder='e.g. 2001:db8:abcd:64::2/64'
              onChange={e => changeValue('destinationIpAddress', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
        {/* Gateway IPv6 gateway, Interface */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Gateway IPv6 gateway</div>
            <Input
              type='text'
              value={form.ipv6Gateway}
              placeholder='e.g. 2001:db8:abcd:64::1'
              onChange={e => changeValue('ipv6Gateway', e.target.value)}
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
        {/* Metric */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Metric</div>
            <Input
              type='number'
              value={form.metric}
              placeholder='2-15'
              onChange={e => changeValue('metric', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
        {/* Private */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>Private</div>
            <div className='form-field--horizontal'>
              <RadioButton
                id='private-enable'
                name='privateEnable'
                label='Enable'
                hasRightMargin={true}
                checked={form.private}
                onChange={() => changeValue('private', true)}
              />
              <RadioButton
                id='private-disable'
                name='privateDisable'
                label='Disable'
                checked={!form.private}
                onChange={() => changeValue('private', false)}
              />
            </div>
          </Col>
        </Row>
      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.addRoute.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.addRoute.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default AddRouteModal;
