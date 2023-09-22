import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input, TooltipDialog } from 'components/';

// Dummy data & util
import { getPortForwardingConfig } from 'dummy/data/gateway/data/security/firewall/port-forwarding';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const AddModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    modeDefinition,
    protocolDefinition,
    wans,
    vlans
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

    const portForwardingConfig = getPortForwardingConfig();

    // Mode
    const modeDropdown = [];
    modeDefinition.forEach(item => {
      modeDropdown.push({
        title: item,
        value: item,
        isActive: false
      });
    });
    modeDropdown[0].isActive = true;

    // Protocol
    const protocolDropdown = [];
    protocolDefinition.forEach(item => {
      protocolDropdown.push({
        title: item,
        value: item,
        isActive: false
      });
    });
    protocolDropdown[0].isActive = true;

    // Interface
    const interfaceDropdown = [];
    wans.forEach(item => {
      if (!item.v4) {
        return;
      }

      interfaceDropdown.push({
        title: item.interface,
        value: item.interface,
        isActive: false
      });
    });

    vlans.forEach(item => {
      interfaceDropdown.push({
        title: item.interface,
        value: item.interface,
        isActive: false
      });
    });
    interfaceDropdown.unshift({
      title: 'Any',
      value: 'Any',
      isActive: true
    });

    portForwardingConfig.mode = modeDropdown;
    portForwardingConfig.protocol = protocolDropdown;
    portForwardingConfig.interface = interfaceDropdown;

    setForm(portForwardingConfig);
  }, [modalStatus.addConfig.status]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addConfig.status}
      closeModal={() => changeModalStatus(modalStatus.addConfig.self, false)}
    >
      <div className='header'>
        <div className='title'>Add port forwarding</div>
      </div>
      <div className='body'>
        {/* Name, Mode*/}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>
              Name
            </div>
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
            <div className='modal-form-title'>
              Mode
              <TooltipDialog
                className='ms-1 me-1'
                title={ReactDOMServer.renderToString(
                  <div>
                    • Forwarding: forward traffic destined for the WAN IP of the gateway on a specific port to any IP address within a local network or VLAN.<br />
                    • Translation: can be used to modify the source or destination port of an traffic policy.
                  </div>
                )}
              />
            </div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.mode.find(item => item.isActive)}
              itemList={form.mode}
              onClick={item => changeValue('mode', item)}
            />
          </Col>
        </Row>
        {/* Interface, Protocol */}
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
            <div className='modal-form-title'>Protocol</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.protocol.find(item => item.isActive)}
              itemList={form.protocol}
              onClick={item => changeValue('protocol', item)}
            />
          </Col>
        </Row>
        {/* Public port */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>
              Public port
              <TooltipDialog
                className='ms-1 me-1'
                title={ReactDOMServer.renderToString(
                  <div>
                    • Ports number must be integers.<br />
                    • A single port number (Range: 1-65535).<br />
                    • A port range can be entered (e.g. 6881-6889).
                  </div>
                )}
              />
            </div>
            <Input
              type='text'
              value={form.publicPort}
              placeholder='1-65535'
              onChange={e => changeValue('publicPort', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
        {/* Local IP, Local port */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Local IP</div>
            <Input
              type='text'
              value={form.localIp}
              placeholder='e.g. 192.168.200.101'
              onChange={e => changeValue('localIp', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          {
            form.mode.find(item => item.isActive).value === 'Translation' && (
              <>
                <Col sm={6}>
                  <div className='modal-form-title required'>
                    Local port
                    <TooltipDialog
                      className='ms-1 me-1'
                      title={ReactDOMServer.renderToString(
                        <div>
                          • Ports number must be integers.<br />
                          • Single port number (Range: 1-65535).<br />
                          • A port range can be entered (e.g. 6881-6889).<br />
                          <i>Mapping a range of public ports to a range of local ports, the ranges must be the same length. (e.g. 6881-6889 public ports must be mapped to 6881-6889 local ports). </i>
                        </div>
                      )}
                    />
                  </div>
                  <Input
                    type='text'
                    value={form.localPort}
                    placeholder='e.g. 192.168.200.101'
                    onChange={e => changeValue('localIp', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
              </>
            )
          }
        </Row>
        {/* Allowed remote IPs */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>
              Allowed remote IPs
              <TooltipDialog
                className='ms-1 me-1'
                title={ReactDOMServer.renderToString(
                  <div>
                    • A single IPv4 address.<br />
                    • Multiple IPv4s can be entered in the field separated by a comma (“,”)(e.g. 192.168.200.101, 192.168.200.200).<br />
                    • IPv4 range can be entered (e.g.192.168.200.101-192.168.200.120).<br />
                    • IPv4 netmask can be entered (e.g.192.168.200.0/24).<br />
                    • Any for all IPv4 addresses.
                  </div>
                )}
              />
            </div>
            <Input
              type='text'
              value={form.allowedRemoteIp}
              placeholder='e.g. Any'
              onChange={e => changeValue('allowedRemoteIp', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
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

export default AddModal;
