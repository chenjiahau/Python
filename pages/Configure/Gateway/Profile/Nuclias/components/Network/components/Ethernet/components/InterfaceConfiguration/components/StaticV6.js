import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Component
import { DropdownWithItem, Input, TooltipDialog, RadioButton } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const StaticV6 = (props) => {
  const { form, setForm } = props;
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  return (
    <>
      <div className='sub-title mt-4 mb-4'>Static V6</div>
      {/* IPv6 address */}
      <Row>
        <Col>
          <div>
            <div className='modal-form-title required'>IPv6 address</div>
            <Input
              type='text'
              value={form.ipV6Address}
              placeholder='e.g. 2001:db8:abcd:64::2/64'
              onChange={e => changeValue('ipV6Address', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </div>
        </Col>
        <Col>
          <div>
            <div className='modal-form-title required'>IPv6 gateway</div>
            <Input
              type='text'
              value={form.ipV6Gateway}
              placeholder='e.g. 2001:db8:abcd:64::1'
              onChange={e => changeValue('ipV6Gateway', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </div>
        </Col>
      </Row>
      {/* IPv6 routed prefix, IPv6 suffix */}
      <Row className='mt-2'>
        <Col>
          <div>
            <div className='modal-form-title'>IPv6 routed prefix</div>
            <Input
              type='text'
              value={form.ipv6RoutePrefix}
              placeholder='e.g. 2001:db8:abcd:64::/56'
              onChange={e => changeValue('ipv6RoutePrefix', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </div>
        </Col>
        <Col>
          <div>
            <div className='modal-form-title'>IPv6 suffix</div>
            <Input
              type='text'
              value={form.ipV6Suffix}
              placeholder='e.g. ::1'
              onChange={e => changeValue('ipV6Suffix', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </div>
        </Col>
      </Row>
      {/* Primary DNS server, Secondary DNS server */}
      <Row className='mt-2'>
        <Col>
          <div>
            <div className='modal-form-title required'>Primary DNS server</div>
            <Input
              type='text'
              value={form.primaryDnsServer}
              placeholder='e.g. 2001:4860:4860::8888'
              onChange={e => changeValue('primaryDnsServer', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </div>
        </Col>
        <Col>
          <div>
            <div className='modal-form-title'>Secondary DNS server</div>
            <Input
              type='text'
              value={form.secondaryDnsServer}
              placeholder='e.g. 2001:4860:4860::8844'
              onChange={e => changeValue('secondaryDnsServer', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </div>
        </Col>
      </Row>
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

export default StaticV6;