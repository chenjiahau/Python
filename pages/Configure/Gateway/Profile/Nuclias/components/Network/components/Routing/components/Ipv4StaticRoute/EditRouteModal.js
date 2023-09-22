import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input, RadioButton } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const EditRouteModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    interfaceList,
    selectedRoute,
  } = props;

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    if (!modalStatus.editRoute.status) {
      return;
    }

    const routeConfig = cloneDeep(selectedRoute.config);

    // Interface
    const interfaceDropdown = [];
    interfaceList.forEach(iface => {
      if (iface.type === 'WAN' && !iface.v4) {
        return;
      }

      interfaceDropdown.push({
        title: iface.interface,
        value: iface.interface,
        isActive: routeConfig.interface === iface.interface
      });
    });

    routeConfig.interface = interfaceDropdown;
    setForm(routeConfig);
  }, [modalStatus.editRoute.status]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editRoute.status}
      closeModal={() => changeModalStatus(modalStatus.editRoute.self, false)}
    >
      <div className='header'>
        <div className='title'>Edit IPv4 static route</div>
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
              placeholder='e.g. 10.90.90.90'
              onChange={e => changeValue('destinationIpAddress', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
        {/* Subnet mask, Gateway IP address */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Subnet mask</div>
            <Input
              type='text'
              value={form.subnetMask}
              placeholder='e.g. 255.255.255.0'
              onChange={e => changeValue('subnetMask', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title required'>Gateway IP address</div>
            <Input
              type='text'
              value={form.gatewayIpAddress}
              placeholder='e.g. 192.168.200.1'
              onChange={e => changeValue('gatewayIpAddress', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
        {/* interface, Metric */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>Interface</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.interface.find(item => item.isActive)}
              itemList={form.interface}
              onClick={item => changeValue('interface', item)}
            />
          </Col>
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
          onClick={() => changeModalStatus(modalStatus.editRoute.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.editRoute.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default EditRouteModal;
