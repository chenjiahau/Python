import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input, TooltipDialog } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const EditModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    protocolDefinition,
    wans,
    selectedConfig,
  } = props;

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    if (!modalStatus.editConfig.status) {
      return;
    }

    const oneCOneNatConfig = cloneDeep(selectedConfig.config);

    // Protocol
    const protocolDropdown = [];
    protocolDefinition.forEach(item => {
      protocolDropdown.push({
        title: item,
        value: item,
        isActive: selectedConfig.config.protocol === item
      });
    });
    protocolDropdown[0].isActive = true;

    // Interface
    const interfaceDropdown = [];
    wans.forEach(item => {
      interfaceDropdown.push({
        title: item.interface,
        value: item.interface,
        isActive: selectedConfig.config.interface === item.interface
      });
    });

    oneCOneNatConfig.interface = interfaceDropdown;
    oneCOneNatConfig.protocol = protocolDropdown;

    setForm(oneCOneNatConfig);
  }, [modalStatus.editConfig.status]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editConfig.status}
      closeModal={() => changeModalStatus(modalStatus.editConfig.self, false)}
    >
      <div className='header'>
        <div className='title'>Edit 1:1 NAT rule</div>
      </div>
      <div className='body'>
        {/* Name, Interface */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Name</div>
            <Input
              type='text'
              value={form.name}
              placeholder='1-64 character'
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
        {/* WAN IP, Local IP */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>
              WAN IP
              <TooltipDialog
                className='ms-1 me-1'
                title={ReactDOMServer.renderToString(
                  <div>
                    • A single address.
                  </div>
                )}
              />
            </div>
            <Input
              type='text'
              value={form.wanIp}
              placeholder='e.g. 10.90.90.10'
              onChange={e => changeValue('wanIp', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
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
        </Row>

        <div className='sub-title mt-4 mb-4'>Allowed inbound connection</div>
        {/* Protocol, Port */}
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
            <div className='modal-form-title required'>
              Port
              <TooltipDialog
                className='ms-1 me-1'
                title={ReactDOMServer.renderToString(
                  <div>
                    The service Port field supports<br />
                    • A single port number (Range: 1-65535)<br />
                    • A Port range can be entered (e.g. 6881-6889)<br />
                    • Any for all port numbers
                  </div>
                )}
              />
            </div>
            <Input
              type='text'
              value={form.port}
              placeholder='1-65535'
              onChange={e => changeValue('port', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
        {/* Allowed Remote IPs */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>
              Allowed Remote IPs
              <TooltipDialog
                className='ms-1 me-1'
                title={ReactDOMServer.renderToString(
                  <div>
                    • A single IPv4 address. <br />
                    • Multiple IPv4s can be entered in the field separated by a comma (“,”) (e.g. 192.168.200.101, 192.168.200.200). <br />
                    • IPv4 range can be entered (e.g. 192.168.200.101-192.168.200.120). <br />
                    • IPv4 netmask can be entered (e.g. 192.168.200.0/24). <br />
                    • Any for all IPv4 addresses.
                  </div>
                )}
              />
            </div>
            <Input
              type='text'
              value={form.allowedRemoteIps}
              placeholder='e.g. Any'
              onChange={e => changeValue('allowedRemoteIps', e.target.value)}
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
          onClick={() => changeModalStatus(modalStatus.editConfig.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.editConfig.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default EditModal;
