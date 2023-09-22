import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input, TooltipDialog } from 'components/';

// Dummy data & util
import { getIpv4PolicyRouteConfig } from 'dummy/data/gateway/data/network/routing/ipv4-policy-route';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const AddRouteModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    interfaceList,
    protocolDefinition
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

    const routeConfig = getIpv4PolicyRouteConfig();

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

    // Protocol
    const protocolDropdown = [];
    protocolDefinition.forEach(protocol => {
      protocolDropdown.push({
        title: protocol.title,
        value: protocol.value,
        isActive: false
      });
    });
    protocolDropdown[0].isActive = true;

    routeConfig.sourceInterface = cloneDeep(interfaceDropdown);
    routeConfig.destinationInterface = cloneDeep(interfaceDropdown);
    routeConfig.protocol = cloneDeep(protocolDropdown);

    setForm(routeConfig);
  }, [modalStatus.addRoute.status]);

  if (!form) {
    return;
  }

  const selectedProtocol = form.protocol.find(item => item.isActive);

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addRoute.status}
      closeModal={() => changeModalStatus(modalStatus.addRoute.self, false)}
    >
      <div className='header'>
        <div className='title'>Add IPv4 policy route</div>
      </div>
      <div className='body'>
        {/* Name, Source interface */}
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
            <div className='modal-form-title'>Source interface</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.sourceInterface.find(item => item.isActive)}
              itemList={form.sourceInterface}
              onClick={item => changeValue('sourceInterface', item)}
            />
          </Col>
        </Row>
        {/* Protocol, Destination interface */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>Protocol</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.protocol.find(item => item.isActive)}
              itemList={form.protocol}
              onClick={item => changeValue('protocol', item)}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>Destination interface</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.destinationInterface.find(item => item.isActive)}
              itemList={form.destinationInterface}
              onClick={item => changeValue('destinationInterface', item)}
            />
          </Col>
        </Row>
        {/* Source network, Destination network */}
        {
          (
            selectedProtocol.value === 'any' ||
            selectedProtocol.value === 'icmp'
          ) ? (
            <>
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title required'>
                    Source network
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
                    value={form.sourceNetwork}
                    placeholder='e.g. 192.168.200.201'
                    onChange={e => changeValue('sourceNetwork', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
                <Col sm={6}>
                  <div className='modal-form-title required'>
                    Destination network
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
                    value={form.destinationNetwork}
                    placeholder='e.g. 10.90.90.90'
                    onChange={e => changeValue('destinationNetwork', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <>
              {/* Source network, Source port */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title required'>
                    Source network
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
                    value={form.sourceNetwork}
                    placeholder='e.g. 192.168.200.201'
                    onChange={e => changeValue('sourceNetwork', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
                <Col sm={6}>
                  <div className='modal-form-title required'>
                    Source port
                    <TooltipDialog
                      className='ms-1 me-1'
                      title={ReactDOMServer.renderToString(
                        <div>
                          • Ports number must be integers.<br />
                          • Single port numbers (Range: 1-65535).<br />
                          • Multiple ports can be entered comma-separated (e.g. 80, 81).<br />
                          • A port range can be entered in the field (e.g. 6881-6889).<br />
                          • Any for all port numbers.
                        </div>
                      )}
                    />
                  </div>
                  <Input
                    type='number'
                    value={form.sourcePort}
                    placeholder='1-65535'
                    onChange={e => changeValue('sourcePort', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
              </Row>
              {/* Destination network, Destination port */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title required'>
                    Destination network
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
                    value={form.destinationNetwork}
                    placeholder='e.g. 10.90.90.90'
                    onChange={e => changeValue('destinationNetwork', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
                <Col sm={6}>
                  <div className='modal-form-title required'>
                    Destination port
                    <TooltipDialog
                      className='ms-1 me-1'
                      title={ReactDOMServer.renderToString(
                        <div>
                          • Ports number must be integers.<br />
                          • Single port numbers (Range: 1-65535).<br />
                          • Multiple ports can be entered comma-separated (e.g. 80, 81).<br />
                          • A port range can be entered in the field (e.g. 6881-6889).<br />
                          • Any for all port numbers.
                        </div>
                      )}
                    />
                  </div>
                  <Input
                    type='number'
                    value={form.sourcePort}
                    placeholder='1-65535'
                    onChange={e => changeValue('sourcePort', e.target.value)}
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
