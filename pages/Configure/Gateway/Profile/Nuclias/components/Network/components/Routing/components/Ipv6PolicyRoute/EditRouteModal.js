import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input, TooltipDialog } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const EditRouteModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    interfaceList,
    protocolDefinition,
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
        isActive: false
      });
    });

    // Protocol
    const protocolDropdown = [];
    protocolDefinition.forEach(protocol => {
      protocolDropdown.push({
        title: protocol.title,
        value: protocol.value,
        isActive: false
      });
    });

    routeConfig.sourceInterface = cloneDeep(interfaceDropdown);
    for (const item of routeConfig.sourceInterface) {
      if (item.value === selectedRoute.config.sourceInterface) {
        item.isActive = true;
      }
    }

    routeConfig.destinationInterface = cloneDeep(interfaceDropdown);
    for (const item of routeConfig.destinationInterface) {
      if (item.value === selectedRoute.config.destinationInterface) {
        item.isActive = true;
      }
    }

    routeConfig.protocol = cloneDeep(protocolDropdown);
    for (const item of routeConfig.protocol) {
      if (item.value === selectedRoute.config.protocol) {
        item.isActive = true;
      }
    }

    setForm(routeConfig);
  }, [modalStatus.editRoute.status]);

  if (!form) {
    return;
  }

  const selectedProtocol = form.protocol.find(item => item.isActive);

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editRoute.status}
      closeModal={() => changeModalStatus(modalStatus.editRoute.self, false)}
    >
      <div className='header'>
        <div className='title'>Edit IPv6 policy route</div>
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
                          • A single IPv6 address.<br />
                          • IPv6 range can be entered (e.g.2001:db8:abcd:64::1234-2001:db8:abcd:64::5678).<br />
                          • Multiple IPv6s can be entered in the field separated by a comma (“,”)(e.g. 2001:db8:abcd:64::1234, 2001:db8:abcd:64::5678).<br />
                          • IPv6 prefix can be entered (e.g.2001:db8:abcd:64::/64).<br />
                          • Any for all IPv6 addresses.
                        </div>
                      )}
                    />
                  </div>
                  <Input
                    type='text'
                    value={form.sourceNetwork}
                    placeholder='e.g. 2001:db8:abcd:64::1'
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
                          • A single IPv6 address.<br />
                          • IPv6 range can be entered (e.g.2001:db8:abcd:64::1234-2001:db8:abcd:64::5678).<br />
                          • Multiple IPv6s can be entered in the field separated by a comma (“,”)(e.g. 2001:db8:abcd:64::1234, 2001:db8:abcd:64::5678).<br />
                          • IPv6 prefix can be entered (e.g.2001:db8:abcd:64::/64).<br />
                          • Any for all IPv6 addresses.
                        </div>
                      )}
                    />
                  </div>
                  <Input
                    type='text'
                    value={form.destinationNetwork}
                    placeholder='e.g. 2001:db8:abcd:64::2/64'
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
                          • A single IPv6 address.<br />
                          • IPv6 range can be entered (e.g.2001:db8:abcd:64::1234-2001:db8:abcd:64::5678).<br />
                          • Multiple IPv6s can be entered in the field separated by a comma (“,”)(e.g. 2001:db8:abcd:64::1234, 2001:db8:abcd:64::5678).<br />
                          • IPv6 prefix can be entered (e.g.2001:db8:abcd:64::/64).<br />
                          • Any for all IPv6 addresses.
                        </div>
                      )}
                    />
                  </div>
                  <Input
                    type='text'
                    value={form.sourceNetwork}
                    placeholder='e.g. 2001:db8:abcd:64::1'
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
                          • A single IPv6 address.<br />
                          • IPv6 range can be entered (e.g.2001:db8:abcd:64::1234-2001:db8:abcd:64::5678).<br />
                          • Multiple IPv6s can be entered in the field separated by a comma (“,”)(e.g. 2001:db8:abcd:64::1234, 2001:db8:abcd:64::5678).<br />
                          • IPv6 prefix can be entered (e.g.2001:db8:abcd:64::/64).<br />
                          • Any for all IPv6 addresses.
                        </div>
                      )}
                    />
                  </div>
                  <Input
                    type='text'
                    value={form.destinationNetwork}
                    placeholder='e.g. 2001:db8:abcd:64::2/64'
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
