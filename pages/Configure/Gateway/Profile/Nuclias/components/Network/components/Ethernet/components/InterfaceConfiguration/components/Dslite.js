import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Component
import { DropdownWithItem, Input, TooltipDialog, RadioButton } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const Dslite = (props) => {
  const { form, setForm, changeDsliteServiceProvider } = props;
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  return (
    <>
      <div className='sub-title mt-4 mb-4'>DS-Lite configuration</div>
      {/* Service provider */}
      <div>
        <div className='modal-form-title'>
          Service provider
          <TooltipDialog
            className='ms-1 me-1'
            title='Please note that some service providers are only available in specific countries.'
          />
        </div>
        <DropdownWithItem
          type='normal'
          selectedItem={form.serviceProvider.find(item => item.isActive)}
          itemList={form.serviceProvider}
          onClick={item => changeDsliteServiceProvider(item)}
        />
      </div>

      {/* AFTR address */}
      {
        (form.serviceProvider[0].isActive || form.serviceProvider[2].isActive) && (
          <div className='mt-2'>
            <div className='modal-form-title'>AFTR address</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.aftrAddress.find(item => item.isActive)}
              itemList={form.aftrAddress}
              onClick={item => changeValue('aftrAddress', item)}
            />
          </div>
        )
      }

      {/* Transix */}
      {
        form.serviceProvider[0].isActive && form.aftrAddress[1].isActive && (
          <>
            {/* Peer tunnel IPv6 address */}
            <div className='mt-2'>
              <div className='modal-form-title required'>Peer tunnel IPv6 address</div>
              <Input
                type='text'
                value={form.peerTunnelIpv6Address}
                placeholder='e.g. 2404:8e00::feed:140 or gw.transix.jp'
                onChange={e => changeValue('peerTunnelIpv6Address', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            {/* Interface ID */}
            <div className='mt-2'>
              <div className='modal-form-title required'>Interface ID</div>
              <Input
                type='text'
                value={form.interfaceId}
                placeholder='e.g. ::11'
                onChange={e => changeValue('interfaceId', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            {/* Global IPv4 address */}
            <div className='mt-2'>
              <div className='modal-form-title required'>Global IPv4 address</div>
              <Input
                type='text'
                value={form.globalIpv4Address}
                placeholder='e.g. 1.1.1.1'
                onChange={e => changeValue('globalIpv4Address', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            {/* Update URL */}
            <div className='mt-2'>
              <div className='modal-form-title required'>Update URL</div>
              <Input
                type='text'
                value={form.updatedUrl}
                placeholder='https://update.transix.jp/request'
                onChange={e => changeValue('updatedUrl', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            {/* Username, Password */}
            <Row className='mt-2'>
              <Col>
                <div className='modal-form-title'>Username</div>
                <Input
                  type='text'
                  value={form.username}
                  placeholder='1-64 characters'
                  onChange={e => changeValue('username', e.target.value)}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </Col>
              <Col>
                <div className='modal-form-title'>Password</div>
                <Input
                  type='password'
                  value={form.password}
                  placeholder='1-64 characters'
                  onChange={e => changeValue('password', e.target.value)}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </Col>
            </Row>
          </>
        )
      }

      {/* V6Plus */}
      {
        form.serviceProvider[1].isActive && (
          <>
            {/* BR address */}
            <div className='mt-2'>
              <div className='modal-form-title required'>BR address</div>
              <Input
                type='text'
                value={form.brAddress}
                placeholder='e.g. 2404:8e00::feed:140'
                onChange={e => changeValue('brAddress', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            {/* Interface ID */}
            <div className='mt-2'>
              <div className='modal-form-title required'>Interface ID</div>
              <Input
                type='text'
                value={form.interfaceId}
                placeholder='e.g. ::11'
                onChange={e => changeValue('interfaceId', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            {/* Global IPv4 address */}
            <div className='mt-2'>
              <div className='modal-form-title required'>Global IPv4 address</div>
              <Input
                type='text'
                value={form.globalIpv4Address}
                placeholder='e.g. 1.1.1.1'
                onChange={e => changeValue('globalIpv4Address', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            {/* Update URL */}
            <div className='mt-2'>
              <div className='modal-form-title required'>Update URL</div>
              <Input
                type='text'
                value={form.updatedUrl}
                placeholder='https://update.transix.jp/request'
                onChange={e => changeValue('updatedUrl', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            {/* Username, Password */}
            <Row className='mt-2'>
              <Col>
                <div className='modal-form-title'>Username</div>
                <Input
                  type='text'
                  value={form.username}
                  placeholder='1-64 characters'
                  onChange={e => changeValue('username', e.target.value)}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </Col>
              <Col>
                <div className='modal-form-title'>Password</div>
                <Input
                  type='password'
                  value={form.password}
                  placeholder='1-64 characters'
                  onChange={e => changeValue('password', e.target.value)}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </Col>
            </Row>
          </>
        )
      }

      {/* V6Connect */}
      {
        form.serviceProvider[2].isActive && (
          <>
            {/* Peer tunnel IPv6 address */}
            <div className='mt-2'>
              <div className='modal-form-title required'>Peer tunnel IPv6 address</div>
              <Input
                type='text'
                value={form.peerTunnelIpv6Address}
                placeholder='e.g. 2404:8e00::feed:140 or gw.transix.jp'
                onChange={e => changeValue('peerTunnelIpv6Address', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            {/* Interface ID */}
            <div className='mt-2'>
              <div className='modal-form-title required'>Interface ID</div>
              <Input
                type='text'
                value={form.interfaceId}
                placeholder='e.g. ::11'
                onChange={e => changeValue('interfaceId', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            {/* Global IPv4 address */}
            <div className='mt-2'>
              <div className='modal-form-title required'>Global IPv4 address</div>
              <Input
                type='text'
                value={form.globalIpv4Address}
                placeholder='e.g. 1.1.1.1'
                onChange={e => changeValue('globalIpv4Address', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            {/* Update URL */}
            <div className='mt-2'>
              <div className='modal-form-title required'>Update URL</div>
              <Input
                type='text'
                value={form.updatedUrl}
                placeholder='https://update.transix.jp/request'
                onChange={e => changeValue('updatedUrl', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            {/* Username, Password */}
            <Row className='mt-2'>
              <Col>
                <div className='modal-form-title'>Username</div>
                <Input
                  type='text'
                  value={form.username}
                  placeholder='1-64 characters'
                  onChange={e => changeValue('username', e.target.value)}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </Col>
              <Col>
                <div className='modal-form-title'>Password</div>
                <Input
                  type='password'
                  value={form.password}
                  placeholder='1-64 characters'
                  onChange={e => changeValue('password', e.target.value)}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </Col>
            </Row>
          </>
        )
      }

      {/* Custom */}
      {
        form.serviceProvider[3].isActive && (
          <>
            <div className='mt-2'>
              <div className='modal-form-title required'>AFTR (address family transition router) address</div>
              <Input
                type='text'
                value={form.aftrFamilyAddress}
                placeholder='e.g. 2404:8e00::feed:140 or gw.transix.jp'
                onChange={e => changeValue('aftrFamilyAddress', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
          </>
        )
      }

      {/* Advanced settings */}
      {
        (
          (form.serviceProvider[0].isActive && form.aftrAddress[1].isActive) ||
          (form.serviceProvider[1].isActive) ||
          (form.serviceProvider[2].isActive && form.aftrAddress[1].isActive)
        ) && (
          <>
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
          </>
        )
      }
    </>
  )
}

export default Dslite;