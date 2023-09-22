import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input, RadioButton } from 'components/';

// Dummy data & util
import { getRipConfigurationConfig } from 'dummy/data/gateway/data/network/routing/rip-configuration';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const AddConfigModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    interfaceList,
    directionDefinition,
    versionDefinition,
  } = props;

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    if (!modalStatus.addConfig.status) {
      return;
    }

    const ripConfig = getRipConfigurationConfig();

    // Interface
    const interfaceDropdown = [];
    interfaceList.forEach(iface => {
      if (iface.type === 'WAN' && !iface.v4) {
        return;
      }

      interfaceDropdown.push({
        title: iface.interface,
        value: iface.interface,
        isActive: false
      });
    });
    interfaceDropdown[0].isActive = true;

    // Direction
    const directionDropdown = [];
    directionDefinition.forEach(direction => {
      directionDropdown.push({
        title: direction.title,
        value: direction.value,
        isActive: false
      });
    });
    directionDropdown[0].isActive = true;

    // Version
    const versionDropdown = [];
    versionDefinition.forEach(version => {
      versionDropdown.push({
        title: version.title,
        value: version.value,
        isActive: false
      });
    });
    versionDropdown[0].isActive = true;

    ripConfig.interface = interfaceDropdown;
    ripConfig.direction = directionDropdown;
    ripConfig.version = versionDropdown;

    setForm(ripConfig);
  }, [modalStatus.addConfig.status]);

  if (!form) {
    return;
  }

  const selectedVersion = form.version.find(item => item.isActive);

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addConfig.status}
      closeModal={() => changeModalStatus(modalStatus.addConfig.self, false)}
    >
      <div className='header'>
        <div className='title'>Add RIP configuration</div>
      </div>
      <div className='body'>
        {/* Interface, Direction */}
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
            <div className='modal-form-title'>Direction</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.direction.find(item => item.isActive)}
              itemList={form.direction}
              onClick={item => changeValue('direction', item)}
            />
          </Col>
        </Row>
        {/* Version, Authentication */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>Version</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.version.find(item => item.isActive)}
              itemList={form.version}
              onClick={item => changeValue('version', item)}
            />
          </Col>
          {
            selectedVersion.value === versionDefinition[1].value && (
              <>
                <Col sm={6}>
                  <div className='modal-form-title'>Authentication</div>
                  <div className='form-field--horizontal'>
                    <RadioButton
                      id='authentication-enable'
                      name='authenticationEnable'
                      label='Enable'
                      hasRightMargin={true}
                      checked={form.authentication}
                      onChange={() => changeValue('authentication', true)}
                    />
                    <RadioButton
                      id='authentication-disable'
                      name='authenticationDisable'
                      label='Disable'
                      checked={!form.authentication}
                      onChange={() => changeValue('authentication', false)}
                    />
                  </div>
                </Col>
              </>
            )
          }
        </Row>
        {/* MD5 key ID, MD5 authentication key */}
        {
          (
            selectedVersion.value === versionDefinition[1].value
            && form.authentication
          ) && (
            <>
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title required'>MD5 key ID</div>
                  <Input
                    type='number'
                    value={form.md5KeyId}
                    placeholder='1-255'
                    onChange={e => changeValue('md5KeyId', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
                <Col sm={6}>
                  <div className='modal-form-title required'>MD5 authentication key</div>
                  <Input
                    type='text'
                    value={form.md5AuthenticationKey}
                    placeholder='1-16 characters'
                    onChange={e => changeValue('md5AuthenticationKey', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
              </Row>
            </>
          )
        }
      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.addConfig.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.addConfig.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default AddConfigModal;
