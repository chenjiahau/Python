import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Component
import { DropdownWithItem, Input, TooltipDialog, RadioButton } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const DhcpV6 = (props) => {
  const { form, setForm } = props;
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  return (
    <>
      <div className='sub-title mt-4 mb-4'>DHCPv6</div>
      {/* Hostname */}
      <Row>
        <Col sm={6}>
          <div>
            <div className='modal-form-title'>Hostname</div>
            <Input
              type='text'
              value={form.hostname}
              placeholder='1-64 characters'
              onChange={e => changeValue('hostname', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </div>
        </Col>
      </Row>
      {/* DNS servers */}
      <Row className='mt-2'>
        <Col>
          <div>
            <div className='modal-form-title'>DNS servers</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.dnsServers.find(item => item.isActive)}
              itemList={form.dnsServers}
              onClick={item => changeValue('dnsServers', item)}
            />
          </div>
        </Col>
        <Col>
          {
            form.dnsServers[1].isActive && (
              <div>
                <div className='modal-form-title required'>Primary DNS server</div>
                <Input
                  type='text'
                  value={form.primaryDnsServer}
                  placeholder='e.g. 8.8.8.8'
                  onChange={e => changeValue('primaryDnsServer', e.target.value)}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </div>
            )
          }
        </Col>
      </Row>
      {
        form.dnsServers[1].isActive && (
          <Row className='mt-2'>
            <Col sm={6}>
              <div>
                <div className='modal-form-title'>Secondary DNS server</div>
                <Input
                  type='text'
                  value={form.secondaryDnsServer}
                  placeholder='e.g. 8.8.4.4'
                  onChange={e => changeValue('secondaryDnsServer', e.target.value)}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </div>
            </Col>
          </Row>
        )
      }
      {/* MTU size */}
      <Row className='mt-2'>
        <Col sm={6}>
          <div>
            <div className='modal-form-title required'>MTU size (bytes)</div>
            <Input
              type='number'
              value={form.mtuSize}
              placeholder='1280-1500'
              onChange={e => changeValue('mtuSize', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </div>
        </Col>
      </Row>

      <div className='sub-title mt-4 mb-4'>Advanced settings</div>
      {/* Allow ping */}
      <Row className='mt-2'>
        <Col sm={6}>
          <div className='modal-form-title'>Allow ping</div>
          <div className='form-field--horizontal'>
            <RadioButton
              id='allowPing-enable'
              name='allowPingEnable'
              label='Enable'
              hasRightMargin={true}
              checked={form.allowPing}
              onChange={() => changeValue('allowPing', true)}
            />
            <RadioButton
              id='allowPing-disable'
              name='allowPingDisable'
              label='Disable'
              checked={!form.allowPing}
              onChange={() => changeValue('allowPing', false)}
            />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default DhcpV6;