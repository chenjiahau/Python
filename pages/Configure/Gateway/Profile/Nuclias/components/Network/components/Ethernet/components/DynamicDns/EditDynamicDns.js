import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  DropdownWithItem, Button, ModalContainer, Input, InputWithIcon,
  RadioButton
} from 'components/';

// Dummy data & util
import { getDDnsConfig } from 'dummy/data/gateway/data/network/ethernet/dynamic-dns';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const EditDynamicDnsModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    interfaces,
    serviceProviderDefinition,
    ipAddressTypeDefinition,
    selectedDDns,
  } = props;

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);
  const [passwordEye, setPasswordEye] = useState(true);

  // Side effect
  useEffect(() => {
    if (!modalStatus.editDDns.status) {
      return;
    }

    const { config } = selectedDDns;
    const updatedForm = { ...config };

    const serverProviderDropdown = [];
    for (const item of serviceProviderDefinition) {
      serverProviderDropdown.push({
        title: item.title,
        value: item.value,
        isActive: config.serviceProvider === item.value ? true : false,
      });
    }
    updatedForm.serviceProvider = serverProviderDropdown;

    const interfaceDropdown = [];
    for (const iface of interfaces) {
      interfaceDropdown.push({
        title: iface.interface,
        value: iface.interface,
        v4: iface.v4,
        v6: iface.v6,
        isActive: config.interface === iface.interface ? true : false,
      });
    }
    interfaceDropdown[0].isActive = true;
    updatedForm.interface = interfaceDropdown;

    const ipAddressTypeDropdown = [];
    for (const key in ipAddressTypeDefinition) {
      ipAddressTypeDropdown.push({
        title: ipAddressTypeDefinition[key],
        value: key,
        isActive: config.ipAddressType === key ? true : false,
      });
    }
    updatedForm.ipAddressType = ipAddressTypeDropdown;

    setForm(updatedForm);
  }, [modalStatus.editDDns.status]);

  if (!form) {
    return;
  }

  const selectedServiceProvider = form.serviceProvider.find(item => item.isActive);

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editDDns.status}
      closeModal={() => changeModalStatus(modalStatus.editDDns.self, false)}
    >
      <div className='header'>
        <div className='title'>Edit DDNS</div>
      </div>
      <div className='body'>
        {/* Service provider */}
        <Row>
          <Col sm={6}>
            <div>
              <div className='modal-form-title'>Service provider</div>
              <DropdownWithItem
                type='normal'
                selectedItem={form.serviceProvider.find(item => item.isActive)}
                itemList={form.serviceProvider}
                onClick={item => changeValue('serviceProvider', item)}
              />
            </div>
          </Col>
        </Row>
        {
          selectedServiceProvider.value !== 'nuclias' && (
            <>
              {/* WAN interface, IP address type */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div>
                    <div className='modal-form-title'>WAN interface</div>
                    <DropdownWithItem
                      type='normal'
                      selectedItem={form.interface.find(item => item.isActive)}
                      itemList={form.interface}
                      onClick={item => changeValue('interface', item)}
                    />
                  </div>
                </Col>
                <Col sm={6}>
                  <div>
                    <div className='modal-form-title'>IP address type</div>
                    <DropdownWithItem
                      type='normal'
                      selectedItem={form.ipAddressType.find(item => item.isActive)}
                      itemList={form.ipAddressType}
                      onClick={item => changeValue('ipAddressType', item)}
                    />
                  </div>
                </Col>
              </Row>
              {/* Username, Password */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div>
                    <div className='modal-form-title required'>Username</div>
                    <Input
                      type='text'
                      value={form.username}
                      placeholder='1-64 characters'
                      onChange={e => changeValue('username', e.target.value)}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                  </div>
                </Col>
                <Col sm={6}>
                  <div>
                    <div className='modal-form-title required'>Password</div>
                    <InputWithIcon
                      type={`${passwordEye ? 'password' : 'text'}`}
                      placeholder='0-255 characters'
                      autoComplete='new-password'
                      value={form.password}
                      onChange={e => changeValue('password', e.target.value)}
                      onFocus={() => { }}
                      onBlur={() => { }}
                      iconTitle={`${passwordEye ? 'Hide password' : 'Show password'}`}
                      iconClassName={`${!passwordEye ? 'icon-close-eye' : 'icon-open-eye'}`}
                      iconOnClick={() => setPasswordEye(!passwordEye)}
                    />
                  </div>
                </Col>
              </Row>
              {/* Hostname */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div>
                    <div className='modal-form-title required'>Hostname</div>
                    <Input
                      type='text'
                      value={form.hostname}
                      placeholder='1-253 characters'
                      onChange={e => changeValue('hostname', e.target.value)}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                  </div>
                </Col>
              </Row>
              {/* Use public IP */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div>
                    <div className='modal-form-title'>Use public IP</div>
                    <div className='form-field--horizontal'>
                      <RadioButton
                        id='use-public-ip-enable'
                        name='usePublicIpEnable'
                        label='Enable'
                        hasRightMargin={true}
                        checked={form.usePublicIp}
                        onChange={() => changeValue('usePublicIp', true)}
                      />
                      <RadioButton
                        id='use-public-ip-disable'
                        name='usePublicIpDisable'
                        label='Disable'
                        checked={!form.usePublicIp}
                        onChange={() => changeValue('usePublicIp', false)}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              {/* Force update interval */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div>
                    <div className='modal-form-title'>Force update interval</div>
                    <Input
                      type='number'
                      value={form.forceUpdateInterval}
                      placeholder='1-30'
                      onChange={e => changeValue('forceUpdateInterval', e.target.value)}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                  </div>
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
          onClick={() => changeModalStatus(modalStatus.editDDns.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.editDDns.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default EditDynamicDnsModal;
