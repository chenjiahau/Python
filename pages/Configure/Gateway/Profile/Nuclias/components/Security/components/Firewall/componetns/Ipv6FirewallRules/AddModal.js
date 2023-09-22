import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input, TooltipDialog } from 'components/';

// Dummy data & util
import { getIpv6FirewallRuleConfig } from 'dummy/data/gateway/data/security/firewall/ipv6-firewall-rules';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const AddModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    policyDefinition,
    protocolDefinition,
    wans,
    vlans,
    schedulePolicies
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

    const ipv6FirewallRuleConfig = getIpv6FirewallRuleConfig();

    // Policy
    const policyDropdown = [];
    policyDefinition.forEach(item => {
      policyDropdown.push({
        title: item,
        value: item,
        isActive: false
      });
    });
    policyDropdown[0].isActive = true;

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

    // Source interface
    const sourceInterfaceDropdown = [];
    wans.forEach(item => {
      if (!item.v6) {
        return;
      }

      sourceInterfaceDropdown.push({
        title: item.interface,
        value: item.interface,
        isActive: false
      });
    });

    vlans.forEach(item => {
      sourceInterfaceDropdown.push({
        title: item.interface,
        value: item.interface,
        isActive: false
      });
    });
    sourceInterfaceDropdown.unshift({
      title: 'Any',
      value: 'Any',
      isActive: true
    });

    // Schedule policy
    const schedulePolicyDropdown = [];
    schedulePolicies.forEach(item => {
      schedulePolicyDropdown.push({
        title: item.title,
        value: item.title,
        isActive: false
      });
    });
    schedulePolicyDropdown[0].isActive = true;

    ipv6FirewallRuleConfig.policy = policyDropdown;
    ipv6FirewallRuleConfig.protocol = protocolDropdown;
    ipv6FirewallRuleConfig.sourceInterface = sourceInterfaceDropdown;
    ipv6FirewallRuleConfig.schedule = schedulePolicyDropdown;

    setForm(ipv6FirewallRuleConfig);
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
        <div className='title'>Add IPv6 firewall rules</div>
      </div>
      <div className='body'>
        {/* Priority, Name*/}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>
              Priority
              <TooltipDialog
                className='ms-1 me-1'
                title={ReactDOMServer.renderToString(
                  <div>
                    • Specify Priority ID. A lower ID means higher priority.
                  </div>
                )}
              />
            </div>
            <Input
              type='number'
              value={form.priority}
              placeholder='1-998'
              onChange={e => changeValue('priority', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
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
        </Row>
        {/* Policy, Protocol */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>Policy</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.policy.find(item => item.isActive)}
              itemList={form.policy}
              onClick={item => changeValue('policy', item)}
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
        {/* Source interface */}
        <Row className='mt-2'>
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
        {/* Source, Source port */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>
              Source
              <TooltipDialog
                className='ms-1 me-1'
                title={ReactDOMServer.renderToString(
                  <div>
                    • A single IPv6 address. <br />
                    • Multiple IPv6s can be entered in the field separated by a comma (“,”) (e.g. 2001:db8:abcd:64::1234, 2001:db8:abcd:64::5678). <br />
                    • IPv6 prefix can be entered (e.g. 2001:db8:abcd:64::/64). <br />
                    • Any for all IPv6 addresses.
                  </div>
                )}
              />
            </div>
            <Input
              type='text'
              value={form.source}
              placeholder='e.g. Any'
              onChange={e => changeValue('source', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          {
            (
              form.protocol.find(item => item.isActive).value === 'TCP' ||
              form.protocol.find(item => item.isActive).value === 'UDP' ||
              form.protocol.find(item => item.isActive).value === 'TCP/UDP'
            ) && (
              <>
                <Col sm={6}>
                  <div className='modal-form-title required'>
                    Source port
                    <TooltipDialog
                      className='ms-1 me-1'
                      title={ReactDOMServer.renderToString(
                        <div>
                          • Ports number must be integers <br />
                          • Single port numbers ( Range: 1-65535 )<br />
                          • Multiple ports can be entered comma-separated (e.g. 80, 81)<br />
                          • A Port range can be entered in the field (e.g. 6881-6889)<br />
                          • Any for all port numbers
                        </div>
                      )}
                    />
                  </div>
                  <Input
                    type='text'
                    value={form.sourcePort}
                    placeholder='1-65535'
                    onChange={e => changeValue('sourcePort', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
              </>
            )
          }
        </Row>
        {/* Destination, Destination port */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>
              Destination
              <TooltipDialog
                className='ms-1 me-1'
                title={ReactDOMServer.renderToString(
                  <div>
                    • A single IPv6 address. <br />
                    • Multiple IPv6s can be entered in the field separated by a comma (“,”) (e.g. 2001:db8:abcd:64::1234, 2001:db8:abcd:64::5678). <br />
                    • IPv6 prefix can be entered (e.g. 2001:db8:abcd:64::/64). <br />
                    • Any for all IPv6 addresses.
                  </div>
                )}
              />
            </div>
            <Input
              type='text'
              value={form.destination}
              placeholder='e.g. Any'
              onChange={e => changeValue('destination', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          {
            (
              form.protocol.find(item => item.isActive).value === 'TCP' ||
              form.protocol.find(item => item.isActive).value === 'UDP' ||
              form.protocol.find(item => item.isActive).value === 'TCP/UDP'
            ) && (
              <>
                <Col sm={6}>
                  <div className='modal-form-title required'>
                    Destination port
                    <TooltipDialog
                      className='ms-1 me-1'
                      title={ReactDOMServer.renderToString(
                        <div>
                          • Ports number must be integers <br />
                          • Single port numbers ( Range: 1-65535 )<br />
                          • Multiple ports can be entered comma-separated (e.g. 80, 81)<br />
                          • A Port range can be entered in the field (e.g. 6881-6889)<br />
                          • Any for all port numbers
                        </div>
                      )}
                    />
                  </div>
                  <Input
                    type='text'
                    value={form.destinationPort}
                    placeholder='1-65535'
                    onChange={e => changeValue('destinationPort', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
              </>
            )
          }
        </Row>
        {/* Schedule */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>Schedule</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.schedule.find(item => item.isActive)}
              itemList={form.schedule}
              onClick={item => changeValue('schedule', item)}
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
