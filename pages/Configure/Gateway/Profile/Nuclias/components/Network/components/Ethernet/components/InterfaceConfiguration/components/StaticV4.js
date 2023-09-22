import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Component
import { DropdownWithItem, Input, TooltipDialog, RadioButton } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const StaticV4 = (props) => {
  const { form, setForm } = props;
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  return (
    <>
      <div className='sub-title mt-4 mb-4'>Static V4</div>
      {/* IP address, IP subnet mask, Gateway IP address */}
      <Row>
        <Col>
          <div>
            <div className='modal-form-title required'>IP address</div>
            <Input
              type='text'
              value={form.ipAddress}
              placeholder='e.g. 10.90.90.90'
              onChange={e => changeValue('ipAddress', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </div>
        </Col>
        <Col>
          <div>
            <div className='modal-form-title required'>IP subnet mask</div>
            <Input
              type='text'
              value={form.ipSubnetMask}
              placeholder='e.g. 255.255.255.0'
              onChange={e => changeValue('ipSubnetMask', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </div>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col sm={6}>
          <div>
            <div className='modal-form-title required'>Gateway IP address</div>
            <Input
              type='text'
              value={form.gatewayIpAddress}
              placeholder='e.g. 10.90.90.1'
              onChange={e => changeValue('ipSugatewayIpAddressbnetMask', e.target.value)}
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
        </Col>
        <Col>
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
      {/* MTU size */}
      <Row className='mt-2' >
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
      <div>
        <div className='modal-form-title'>
          Route mode
          <TooltipDialog
            className='ms-1 me-1'
            title='With NAT enabled, the gateway hides clients’ private network by replacing IP addresses with its WAN address for all traffic going to the Internet. In Router Mode the gateway does not perform NAT and bridges traffic between LAN and WAN.'
          />
        </div>
      </div>
      {/* Router mode */}
      <Row>
        <Col>
          <div className='form-field--horizontal'>
            <RadioButton
              id='routeMode-enable'
              name='routeModeEnable'
              label='Network address translation(NAT)'
              hasRightMargin={true}
              checked={form.routeMode}
              onChange={() => changeValue('routeMode', true)}
            />
            <RadioButton
              id='routeMode-disable'
              name='routeModeDisable'
              label='Router'
              checked={!form.routeMode}
              onChange={() => changeValue('routeMode', false)}
            />
          </div>
        </Col>
      </Row>
      {/* IPsec passthrough, PPTP passthrough */}
      <Row className='mt-2'>
        <Col>
          <div className='modal-form-title'>IPsec passthrough</div>
          <div className='form-field--horizontal'>
            <RadioButton
              id='passThroughIpsec-enable'
              name='passThroughIpsecEnable'
              label='Enable'
              hasRightMargin={true}
              checked={form.passThroughIpsec}
              onChange={() => changeValue('passThroughIpsec', true)}
            />
            <RadioButton
              id='passThroughIpsec-disable'
              name='passThroughIpsecDisable'
              label='Disable'
              checked={!form.passThroughIpsec}
              onChange={() => changeValue('passThroughIpsec', false)}
            />
          </div>
        </Col>
        <Col>
          <div className='modal-form-title'>PPTP passthrough</div>
          <div className='form-field--horizontal'>
            <RadioButton
              id='passThroughPptp-enable'
              name='passThroughPptpEnable'
              label='Enable'
              hasRightMargin={true}
              checked={form.passThroughPptp}
              onChange={() => changeValue('passThroughPptp', true)}
            />
            <RadioButton
              id='passThroughPptp-disable'
              name='passThroughPptpDisable'
              label='Disable'
              checked={!form.passThroughPptp}
              onChange={() => changeValue('passThroughPptp', false)}
            />
          </div>
        </Col>
      </Row>
      {/* L2TP passthrough */}
      <Row className='mt-2'>
        <Col sm={6}>
          <div className='modal-form-title'>L2TP passthrough</div>
          <div className='form-field--horizontal'>
            <RadioButton
              id='passThroughL2tp-enable'
              name='passThroughL2tpEnable'
              label='Enable'
              hasRightMargin={true}
              checked={form.passThroughL2tp}
              onChange={() => changeValue('passThroughL2tp', true)}
            />
            <RadioButton
              id='passThroughL2tp-disable'
              name='passThroughL2tpDisable'
              label='Disable'
              checked={!form.passThroughL2tp}
              onChange={() => changeValue('passThroughL2tp', false)}
            />
          </div>
        </Col>
      </Row>
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

export default StaticV4;