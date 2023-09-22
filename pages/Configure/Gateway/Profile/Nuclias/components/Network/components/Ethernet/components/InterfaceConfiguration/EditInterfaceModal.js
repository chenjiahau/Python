import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep, orderBy } from 'lodash';

// Component
import {
  DropdownWithItem, Button, ModalContainer, RadioButton, Input
} from 'components/';
import DhcpV4 from './components/DhcpV4';
import DhcpV6 from './components/DhcpV6';
import StaticV4 from './components/StaticV4';
import StaticV6 from './components/StaticV6';
import Pppoe from './components/Pppoe';
import Dslite from './components/Dslite';
import Mape from './components/Mape';

// Dummy data & util
import { getProtocolConfig } from 'dummy/data/gateway/data/network/ethernet/interface-configuration';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const defaultDnsServersDropdown = [
  { title: 'Get dynamic from ISP', value: true, isActive: false },
  { title: 'Use these DNS servers', value: false, isActive: false },
];

const defaultDsliteServiceProvider = [
  { title: 'Internet Multifeed (Transix)', value: 'transix', isActive: false },
  { title: 'Japan Network Enabler (v6 plus-fixed IP)', value: 'v6Plus', isActive: false },
  { title: 'AsahiNet (v6 connect)', value: 'v6Connect', isActive: false },
  { title: 'Customized service', value: 'custom', isActive: false },
];

const defaultMapeServiceProvider = [
  { title: 'Japan Network Enabler (v6 Plus)', value: 'v6Plus', isActive: false },
  { title: 'NTT Com (OCN)', value: 'nttCom', isActive: false }
];

const defaultAftrAddress = [
  { title: 'Get dynamically from ISP', value: true, isActive: false },
  { title: 'Use this AFTR address', value: false, isActive: false },
];

const EditInterfaceModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    protocolDefinition,
    interfaces,
    hasV6Interfaces,
    selectedInterface
  } = props;

  let title = '';
  let protocol = null; // selected protocol
  let isDefaultWan = false;
  let isV4OrV6 = false;

  let interfaceDropdown = [];
  for (const key in interfaces) {
    interfaceDropdown.push({
      title: interfaces[key].interface,
      value: interfaces[key].interface,
      isActive: false
    });
  }
  interfaceDropdown = orderBy(interfaceDropdown, ['title'], ['asc']);

  let hasV6InterfaceDropdown = [];
  for (const key in hasV6Interfaces) {
    hasV6InterfaceDropdown.push({
      title: hasV6Interfaces[key].interface,
      value: hasV6Interfaces[key].interface,
      isActive: false
    });
  }
  hasV6InterfaceDropdown = orderBy(hasV6InterfaceDropdown, ['title'], ['asc']);

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  const changeProtocol = (protocol) => {
    const updatedForm = {
      interface: form.interface,
      protocol: form.protocol,
      vlanTag: true,
      vlanId: ''
    };

    for (const p of updatedForm.protocol) {
      p.isActive = false;
      if (p.value === protocol.value) {
        p.isActive = true;
      }
    }

    const config = getProtocolConfig(updatedForm.protocol.find(item => item.isActive).value);

    if (protocol.value === protocolDefinition.dslite) {
      Object.assign(updatedForm, config.transix);
      // Setting the first item is default for common dropdown
      updatedForm.serviceProvider = cloneDeep(defaultDsliteServiceProvider);
      updatedForm.serviceProvider[0].isActive = true;
      updatedForm.aftrAddress = cloneDeep(defaultAftrAddress);
      updatedForm.aftrAddress[0].isActive = true;
    } else if (protocol.value === protocolDefinition.mape) {
      Object.assign(updatedForm, config.mape);
      // Setting the first item is default for common dropdown
      updatedForm.serviceProvider = cloneDeep(defaultMapeServiceProvider);
      updatedForm.serviceProvider[0].isActive = true;
    } else {
      Object.assign(updatedForm, config);
      // Setting the first item is default for common dropdown
      const updatedDnsServersDropdown = cloneDeep(defaultDnsServersDropdown);
      updatedDnsServersDropdown[0].isActive = true;
      updatedForm.dnsServers = updatedDnsServersDropdown;
    }

    setForm(updatedForm);
  }

  const changeDsliteServiceProvider = (serviceProvider) => {
    const updatedForm = {
      interface: form.interface,
      protocol: form.protocol
    };

    const config = getProtocolConfig('DS-Lite / IPIP');
    updatedForm.serviceProvider = cloneDeep(defaultDsliteServiceProvider);

    if (serviceProvider.value === defaultDsliteServiceProvider[0].value) {
      updatedForm.serviceProvider[0].isActive = true;
      Object.assign(updatedForm, config.transix);
    }

    if (serviceProvider.value === defaultDsliteServiceProvider[1].value) {
      updatedForm.serviceProvider[1].isActive = true;
      Object.assign(updatedForm, config.v6Plus);
    }

    if (serviceProvider.value === defaultDsliteServiceProvider[2].value) {
      updatedForm.serviceProvider[2].isActive = true;
      Object.assign(updatedForm, config.v6Connect);
    }

    if (serviceProvider.value === defaultDsliteServiceProvider[3].value) {
      updatedForm.serviceProvider[3].isActive = true;
      Object.assign(updatedForm, config.custom);
    }

    updatedForm.aftrAddress = cloneDeep(defaultAftrAddress);
    updatedForm.aftrAddress[0].isActive = true;

    setForm(updatedForm);
  }

  const changeMapeServiceProvider = (serviceProvider) => {
    const updatedForm = {
      interface: form.interface,
      protocol: form.protocol
    };

    const config = getProtocolConfig('MAP-E');
    updatedForm.serviceProvider = cloneDeep(defaultMapeServiceProvider);

    if (serviceProvider.value === defaultMapeServiceProvider[0].value) {
      updatedForm.serviceProvider[0].isActive = true;
      Object.assign(updatedForm, config.v6Plus);
    }

    if (serviceProvider.value === defaultMapeServiceProvider[1].value) {
      updatedForm.serviceProvider[1].isActive = true;
      Object.assign(updatedForm, config.nttCom);
    }

    setForm(updatedForm);
  }

  // Side effect
  useEffect(() => {
    if (!selectedInterface) {
      return;
    }

    const { config } = selectedInterface;

    let visibleProtocols = [];
    switch (selectedInterface.protocol) {
      case protocolDefinition.dhcpV4:
      case protocolDefinition.staticV4:
        visibleProtocols = [protocolDefinition.dhcpV4, protocolDefinition.staticV4];
        break;
      case protocolDefinition.dhcpV6:
      case protocolDefinition.staticV6:
        visibleProtocols = [protocolDefinition.dhcpV6, protocolDefinition.staticV6];
        break;
      case protocolDefinition.pppoe:
        visibleProtocols = [protocolDefinition.pppoe];
        break;
      case protocolDefinition.dslite:
        visibleProtocols = [protocolDefinition.dslite];
        break;
      case protocolDefinition.mape:
        visibleProtocols = [protocolDefinition.mape];
        break;
      default:
        return;
    }

    const protocolDropdown = [];
    for (const key in protocolDefinition) {
      if (visibleProtocols.includes(protocolDefinition[key])) {
        protocolDropdown.push({
          title: protocolDefinition[key],
          value: protocolDefinition[key],
          isActive: false
        });
      }
    }

    protocolDropdown.forEach((protocol, index) => {
      if (protocol.value === selectedInterface.protocol) {
        protocol.isActive = true;
      }
    });

    const updatedForm = {
      interface: null,
      protocol: protocolDropdown
    }

    if (
      (selectedInterface.protocol !== protocolDefinition.dslite) &&
      (selectedInterface.protocol !== protocolDefinition.mape)
    ) {
      updatedForm.interface = cloneDeep(interfaceDropdown);
    } else {
      updatedForm.interface = cloneDeep(hasV6InterfaceDropdown);
    }

    updatedForm.interface.forEach((iface, index) => {
      if (iface.value === selectedInterface.interface) {
        iface.isActive = true;
      }
    });

    Object.assign(updatedForm, config);

    // Setting the first item is default for common dropdown
    const updatedDnsServersDropdown = cloneDeep(defaultDnsServersDropdown);
    updatedDnsServersDropdown[0].isActive = true;
    updatedForm.dnsServers = updatedDnsServersDropdown;

    if (selectedInterface.protocol === protocolDefinition.dslite) {
      updatedForm.serviceProvider = cloneDeep(defaultDsliteServiceProvider);
      updatedForm.serviceProvider[0].isActive = true;
      updatedForm.aftrAddress = cloneDeep(defaultAftrAddress);
      updatedForm.aftrAddress[0].isActive = true;
    }

    if (selectedInterface.protocol === protocolDefinition.mape) {
      updatedForm.serviceProvider = cloneDeep(defaultMapeServiceProvider);
      updatedForm.serviceProvider[0].isActive = true;
    }

    setForm(updatedForm);
  }, [selectedInterface]);

  if (!selectedInterface || !form) {
    return;
  }

  title = `Edit WAN ${form.protocol.filter(item => item.isActive)[0].title}`;
  protocol = form.protocol.find(item => item.isActive);
  isDefaultWan = selectedInterface.isDefaultWan;
  isV4OrV6 = (
    selectedInterface.protocol === protocolDefinition.dhcpV4
    || selectedInterface.protocol === protocolDefinition.dhcpV6
    || selectedInterface.protocol === protocolDefinition.staticV4
    || selectedInterface.protocol === protocolDefinition.staticV6
  )

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editInterface.status}
      closeModal={() => changeModalStatus(modalStatus.editInterface.self, false)}
    >
      <div className='header'>
        <div className='title'>{title}</div>
      </div>
      <div className='body'>
        {/* Interface, Protocol */}
        <Row>
          <Col>
            <div>
              <div className='modal-form-title'>Interface</div>
              <DropdownWithItem
                type='normal'
                selectedItem={form.interface.find(item => item.isActive)}
                itemList={form.interface}
                disabled={true}
                onClick={item => changeValue('interface', item)}
              />
            </div>
          </Col>
          <Col>
            <div>
              <div className='modal-form-title'>Protocol</div>
              <DropdownWithItem
                type='normal'
                selectedItem={form.protocol.find(item => item.isActive)}
                itemList={form.protocol}
                disabled={!isV4OrV6}
                onClick={item => {
                  changeValue('protocol', item);
                  changeProtocol(item);
                }}
              />
            </div>
          </Col>
        </Row>
        {/* VLAN tag, VLAN ID */}
        {
          protocol.value !== protocolDefinition.dslite
          && protocol.value !== protocolDefinition.mape && (
            <Row className='mt-2'>
              <Col sm={6}>
                <div>
                  <div className='modal-form-title'>VLAN TAG</div>
                  <div className='form-field--horizontal'>
                    <RadioButton
                      id='vlanTag-enable'
                      name='vlanTagEnable'
                      label='Enable'
                      hasRightMargin={true}
                      labelClassName={protocol.value !== protocolDefinition.pppoe ? 'text-given-disabled' : ''}
                      checked={form.vlanTag}
                      onChange={() => (protocol.value === protocolDefinition.pppoe) && changeValue('vlanTag', true)}
                    />
                    <RadioButton
                      id='vlanTag-disable'
                      name='vlanTagDisable'
                      label='Disable'
                      labelClassName={protocol.value !== protocolDefinition.pppoe ? 'text-given-disabled' : ''}
                      checked={!form.vlanTag}
                      onChange={() => (protocol.value === protocolDefinition.pppoe) && changeValue('vlanTag', false)}
                    />
                  </div>
                </div>
              </Col>
              <Col sm={6}>
                {
                  !isDefaultWan && form.vlanTag && (
                    <div>
                      <div className='modal-form-title required'>VLAN ID</div>
                      <Input
                        type='number'
                        value={form.vlanId}
                        placeholder='1-4094'
                        onChange={e => changeValue('vlanId', e.target.value)}
                        onFocus={() => { }}
                        onBlur={() => { }}
                      />
                    </div>
                  )
                }
              </Col>
            </Row>
          )
        }

        {protocol.value === protocolDefinition.dhcpV4 && <DhcpV4 form={form} setForm={setForm} />}
        {protocol.value === protocolDefinition.dhcpV6 && <DhcpV6 form={form} setForm={setForm} />}
        {protocol.value === protocolDefinition.staticV4 && <StaticV4 form={form} setForm={setForm} />}
        {protocol.value === protocolDefinition.staticV6 && <StaticV6 form={form} setForm={setForm} />}
        {protocol.value === protocolDefinition.pppoe && <Pppoe form={form} setForm={setForm} />}
        {protocol.value === protocolDefinition.dslite && <Dslite form={form} setForm={setForm} changeDsliteServiceProvider={changeDsliteServiceProvider} />}
        {protocol.value === protocolDefinition.mape && <Mape form={form} setForm={setForm} changeMapeServiceProvider={changeMapeServiceProvider} />}

      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.editInterface.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.editInterface.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default EditInterfaceModal;
