import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  DropdownWithItem, Button, ModalContainer, Input, InputWithIcon,
  RadioButton, DropdownWithCheckbox, TooltipDialog
} from 'components/';

// Dummy data & util
import { getVlanConfig } from 'dummy/data/gateway/data/network/addressing/vlan';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const EditVlanModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    configState,
    vpnTunnels,
    cpList,
    portsDefinition,
    dhcpModeDefinition,
    dhcpv6ModeDefinition,
    ipv6SuffixDefinition,
    ipv6ACServerDefinition,
    portocolDefinition,
    selectedVlan
  } = props;

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  const changeNdpProxy = state => {
    const updatedForm = cloneDeep(form);
    updatedForm.ndpProxy = state;

    if (!state) {
      updatedForm.raMode = false;
      updatedForm.dhcpV6Mode.forEach(mode => {
        mode.isActive = false;
      });

      updatedForm.dhcpV6Mode[1].isActive = true;
    }

    setForm(updatedForm);
  }

  // Side effect
  useEffect(() => {
    if (!modalStatus.editVlan.status) {
      return;
    }

    const vlanConfig = getVlanConfig();

    // Untagged ports
    const untaggedPorts = portsDefinition.map(port => {
      return {
        ...port,
        checked: false,
      };
    });

    // Tagged ports
    const taggedPorts = portsDefinition.map(port => {
      return {
        ...port,
        checked: false,
      };
    });

    // Bridge to interface
    const bridgeToInterface = [
      { title: 'None', value: 'None', isActive: false },
    ]
    for (const vpnTunnel of vpnTunnels) {
      bridgeToInterface.push({
        title: vpnTunnel.interface,
        value: vpnTunnel.interface,
        isActive: false,
      });
    }
    bridgeToInterface[0].isActive = true;

    // DHCP mode
    const dhcpMode = dhcpModeDefinition.map(mode => {
      return {
        ...mode,
        isActive: false,
      };
    });
    dhcpMode[0].isActive = true;

    // DHCPv6 mode
    const dhcpV6Mode = dhcpv6ModeDefinition.map(mode => {
      return {
        ...mode,
        isActive: false,
      };
    });
    dhcpV6Mode[0].isActive = true;

    // IPv6 suffix
    const ipv6Suffix = ipv6SuffixDefinition.map(suffix => {
      return {
        ...suffix,
        isActive: false,
      };
    });
    ipv6Suffix[2].isActive = true;

    // IPv6 auto configuration service
    const ipv6AutoConfigurationService = ipv6ACServerDefinition.map(service => {
      return {
        ...service,
        isActive: false,
      };
    });
    ipv6AutoConfigurationService[0].isActive = true;

    // Captive portal name
    const captivePortalName = cpList.map(cp => {
      return {
        title: cp.name,
        value: cp.name,
        isActive: false,
      };
    });
    captivePortalName[0].isActive = true;

    // Protocol
    const protocol = portocolDefinition.map(protocol => {
      return {
        ...protocol,
        isActive: false,
      };
    });
    protocol[0].isActive = true;

    vlanConfig.untaggedPorts = untaggedPorts;
    vlanConfig.taggedPorts = taggedPorts;
    vlanConfig.bridgeToInterface = bridgeToInterface;
    vlanConfig.dhcpMode = dhcpMode;
    vlanConfig.dhcpV6Mode = dhcpV6Mode;
    vlanConfig.ipv6Suffix = ipv6Suffix;
    vlanConfig.ipv6AutoConfigurationService = ipv6AutoConfigurationService;
    vlanConfig.captivePortalName = captivePortalName;
    vlanConfig.protocol = protocol;

    setForm(vlanConfig);
  }, [modalStatus.editVlan.status]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editVlan.status}
      closeModal={() => changeModalStatus(modalStatus.editVlan.self, false)}
    >
      <div className='header'>
        <div className='title'>Edit VLAN profile</div>
      </div>
      <div className='body'>
        {/* Name, Untagged ports */}
        <Row>
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
            <div className='modal-form-title'>Untagged ports</div>
            <DropdownWithCheckbox
              allMode={true}
              label='c7d0b2bf4f'
              id='untagged-ports-dropdown'
              type='checkbox'
              itemList={form.untaggedPorts}
              onChangeAll={isToggleAll => {
                const tmpPorts = cloneDeep(form.untaggedPorts);
                tmpPorts.forEach(port => {
                  port.checked = isToggleAll;
                });

                const updatedForm = cloneDeep(form);
                updatedForm.untaggedPorts = tmpPorts;
                setForm(updatedForm);
              }}
              onChange={item => {
                const tmpPorts = cloneDeep(form.untaggedPorts);
                tmpPorts.forEach(port => {
                  if (port.title === item.title) {
                    port.checked = !port.checked;
                  }
                });

                const updatedForm = cloneDeep(form);
                updatedForm.untaggedPorts = tmpPorts;
                setForm(updatedForm);
              }}
            />
          </Col>
        </Row>
        {/* VLAN ID, Tagged ports */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>VLAN ID</div>
            <Input
              type='number'
              value={form.vlanId}
              placeholder='2-2094'
              onChange={e => changeValue('vlanId', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>Tagged ports</div>
            <DropdownWithCheckbox
              allMode={true}
              label='c7d0b2bf4f'
              id='tagged-ports-dropdown'
              type='checkbox'
              itemList={form.taggedPorts}
              onChangeAll={isToggleAll => {
                const tmpPorts = cloneDeep(form.untaggedPorts);
                tmpPorts.forEach(port => {
                  port.checked = isToggleAll;
                });

                const updatedForm = cloneDeep(form);
                updatedForm.untaggedPorts = tmpPorts;
                setForm(updatedForm);
              }}
              onChange={item => {
                const tmpPorts = cloneDeep(form.untaggedPorts);
                tmpPorts.forEach(port => {
                  if (port.title === item.title) {
                    port.checked = !port.checked;
                  }
                });

                const updatedForm = cloneDeep(form);
                updatedForm.untaggedPorts = tmpPorts;
                setForm(updatedForm);
              }}
            />
          </Col>
        </Row>
        {/* InterVLAN */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>InterVLAN</div>
            <div className='form-field--horizontal'>
              <RadioButton
                id='inter-vlan-enable'
                name='interVlanEnable'
                label='Enable'
                hasRightMargin={true}
                disabled={!form.bridgeToInterface[0].isActive}
                checked={form.interVlan}
                onChange={() => changeValue('interVlan', true)}
              />
              <RadioButton
                id='inter-vlan-disable'
                name='interVlanDisable'
                label='Disable'
                disabled={!form.bridgeToInterface[0].isActive}
                checked={!form.interVlan}
                onChange={() => changeValue('interVlan', false)}
              />
            </div>
          </Col>
        </Row>
        {/* Bridge to interface */}
        {/* Bridge to interface */}
        {
          !configState.profile && (
            <>
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>
                    Bridge to interface
                    <TooltipDialog
                      className='ms-1 me-1'
                      title='A VLAN rule that bridges a VLAN to L2TPv3 clients will affect the wireless connectivity if the associated SSID uses the same VLAN rule once the rule is changed'
                    />
                  </div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.bridgeToInterface.find(item => item.isActive)}
                    itemList={form.bridgeToInterface}
                    onClick={item => {
                      const updatedForm = cloneDeep(form);
                      updatedForm.bridgeToInterface.forEach(iface => {
                        iface.isActive = false;
                        if (iface.value === item.value) {
                          iface.isActive = true;
                        }
                      });

                      if (!updatedForm.bridgeToInterface[0].isActive) {
                        updatedForm.interVlan = false;
                      }

                      updatedForm.protocol.forEach(protocol => {
                        protocol.isActive = false;
                      });
                      updatedForm.protocol[1].isActive = true;

                      setForm(updatedForm);
                    }}
                  />
                </Col>
              </Row>
            </>
          )
        }
        <div className='sub-title mt-4 mb-4'>VLAN subnet</div>
        {
          form.bridgeToInterface[0].isActive ? (
            <>
              {/* IPv4 address, Subnet mask */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title required'>IPv4 address</div>
                  <Input
                    type='text'
                    value={form.ipv4Address}
                    placeholder='e.g. 192.168.200.1'
                    onChange={e => changeValue('ipv4Address', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
                <Col sm={6}>
                  <div className='modal-form-title required'>Subnet mask</div>
                  <Input
                    type='text'
                    value={form.subnetMask}
                    placeholder='e.g. 255.255.255.0'
                    onChange={e => changeValue('subnetMask', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
              </Row>
              {/* DHCP mode */}
              <Row className='mt-2'>
                <Col>
                  <div className='modal-form-title'>DHCP mode</div>
                  <div className='form-field--horizontal'>
                    <RadioButton
                      id='dhcp-mode-none'
                      name='dhcpModeNone'
                      label='None'
                      hasRightMargin={true}
                      checked={form.dhcpMode[0].isActive}
                      onChange={() => {
                        const updatedForm = cloneDeep(form);
                        updatedForm.dhcpMode.forEach(mode => {
                          mode.isActive = false;
                        });
                        updatedForm.dhcpMode[0].isActive = true;
                        setForm(updatedForm);
                      }}
                    />
                    <RadioButton
                      id='dhcp-mode-server'
                      name='dhcpModeServer'
                      label='DHCP server'
                      hasRightMargin={true}
                      checked={form.dhcpMode[1].isActive}
                      onChange={() => {
                        const updatedForm = cloneDeep(form);
                        updatedForm.dhcpMode.forEach(mode => {
                          mode.isActive = false;
                        });
                        updatedForm.dhcpMode[1].isActive = true;
                        setForm(updatedForm);
                      }}
                    />
                    <RadioButton
                      id='dhcp-mode-relay'
                      name='dhcpModeRelay'
                      label='DHCP relay'
                      checked={form.dhcpMode[2].isActive}
                      onChange={() => {
                        const updatedForm = cloneDeep(form);
                        updatedForm.dhcpMode.forEach(mode => {
                          mode.isActive = false;
                        });
                        updatedForm.dhcpMode[2].isActive = true;
                        setForm(updatedForm);
                      }}
                    />
                  </div>
                </Col>
              </Row>
              {
                form.dhcpMode[1].isActive && (
                  <>
                    {/* Domain name, Starting IP address */}
                    <Row className='mt-2'>
                      <Col sm={6}>
                        <div className='modal-form-title required'>Domain name</div>
                        <Input
                          type='text'
                          value={form.domainName}
                          placeholder='3-253 characters'
                          onChange={e => changeValue('domainName', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </Col>
                      <Col sm={6}>
                        <div className='modal-form-title required'>Starting IP address</div>
                        <Input
                          type='text'
                          value={form.startingIpAddress}
                          placeholder='e.g. 192.168.200.101'
                          onChange={e => changeValue('startingIpAddress', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </Col>
                    </Row>
                    {/* Ending IP address, Default gateway */}
                    <Row className='mt-2'>
                      <Col sm={6}>
                        <div className='modal-form-title required'>Ending IP address</div>
                        <Input
                          type='text'
                          value={form.endingIpAddress}
                          placeholder='e.g. 192.168.200.200'
                          onChange={e => changeValue('endingIpAddress', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </Col>
                      <Col sm={6}>
                        <div className='modal-form-title required'>Default gateway</div>
                        <Input
                          type='text'
                          value={form.defaultGateway}
                          placeholder='e.g. 192.168.200.1'
                          onChange={e => changeValue('defaultGateway', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </Col>
                    </Row>
                    {/* Lease time (minutes) */}
                    <Row className='mt-2'>
                      <Col sm={6}>
                        <div className='modal-form-title required'>Lease time (minutes)</div>
                        <Input
                          type='number'
                          value={form.leaseTime}
                          placeholder='1-10080'
                          onChange={e => changeValue('leaseTime', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </Col>
                    </Row>
                  </>
                )
              }
              {
                form.dhcpMode[2].isActive && (
                  <>
                    {/* Relay gateway */}
                    <Row className='mt-2'>
                      <Col>
                        <div className='modal-form-title required'>Relay gateway</div>
                        <Input
                          type='text'
                          value={form.relayGateway}
                          placeholder='e.g. 10.90.90.90'
                          onChange={e => changeValue('relayGateway', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </Col>
                    </Row>
                  </>
                )
              }
              {/* RA mode, NDP-Proxy */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>RA mode</div>
                  <div className='form-field--horizontal'>
                    <RadioButton
                      id='ra-mode-relay'
                      name='raModeRelay'
                      label='Relay'
                      hasRightMargin={true}
                      checked={form.raMode}
                      onChange={() => changeValue('raMode', true)}
                    />
                    <RadioButton
                      id='ra-mode-server'
                      name='raModeServer'
                      label='Server'
                      checked={!form.raMode}
                      onChange={() => changeValue('raMode', false)}
                    />
                  </div>
                </Col>
                <Col sm={6}>
                  <div className='modal-form-title'>NDP-Proxy</div>
                  <div className='form-field--horizontal'>
                    <RadioButton
                      id='ndp-proxy-enable'
                      name='ndpProxyEnable'
                      label='Enable'
                      hasRightMargin={true}
                      checked={form.ndpProxy}
                      onChange={() => changeNdpProxy(true)}
                    />
                    <RadioButton
                      id='ndp-proxy-disable'
                      name='ndpProxyDisable'
                      label='Disable'
                      checked={!form.ndpProxy}
                      onChange={() => changeNdpProxy(false)}
                    />
                  </div>
                </Col>
              </Row>
              {/* DHCPv6 mode */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>DHCPv6 mode</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.dhcpV6Mode.find(item => item.isActive)}
                    itemList={form.dhcpV6Mode}
                    onClick={item => changeValue('dhcpV6Mode', item)}
                  />
                </Col>
              </Row>
              {
                (
                  (
                    (form.raMode && form.ndpProxy)
                    && form.dhcpV6Mode.find(mode => mode.isActive).value === 'dhcpv6Server'
                  ) || (!form.raMode && form.ndpProxy) || !form.ndpProxy
                ) && (
                  <>
                    {/* IPv6 assignment */}
                    <Row className='mt-2'>
                      <Col sm={6}>
                        <div className='modal-form-title'>IPv6 assignment</div>
                        <div className='form-field--horizontal'>
                          <RadioButton
                            id='ipv6-assignment-enable'
                            name='ipv6AssignmentEnable'
                            label='Enable'
                            hasRightMargin={true}
                            checked={form.ipv6Assignment}
                            onChange={() => changeValue('ipv6Assignment', true)}
                          />
                          <RadioButton
                            id='ipv6-assignment-disable'
                            name='ipv6AssignmentDisable'
                            label='Disable'
                            checked={!form.ipv6Assignment}
                            onChange={() => changeValue('ipv6Assignment', false)}
                          />
                        </div>
                      </Col>
                    </Row>
                    {
                      form.ipv6Assignment ? (
                        <>
                          {/* IPv6 assignment prefix length, IPv6 assignment hint */}
                          <Row className='mt-2'>
                            <Col sm={6}>
                              <div className='modal-form-title required'>IPv6 assignment prefix length</div>
                              <Input
                                type='number'
                                value={form.ipv6AssignmentPrefixLength}
                                placeholder='e.g. 64'
                                onChange={e => changeValue('ipv6AssignmentPrefixLength', e.target.value)}
                                onFocus={() => { }}
                                onBlur={() => { }}
                              />
                            </Col>
                            <Col sm={6}>
                              <div className='modal-form-title required'>IPv6 assignment hint</div>
                              <Input
                                type='text'
                                value={form.ipv6AssignmentHint}
                                placeholder='e.g. 0'
                                onChange={e => changeValue('ipv6AssignmentHint', e.target.value)}
                                onFocus={() => { }}
                                onBlur={() => { }}
                              />
                            </Col>
                          </Row>
                          {/* IPv6 suffix, Manual suffix (optional) */}
                          <Row className='mt-2'>
                            <Col sm={6}>
                              <div className='modal-form-title required'>IPv6 suffix</div>
                              <DropdownWithItem
                                type='normal'
                                selectedItem={form.ipv6Suffix.find(item => item.isActive)}
                                itemList={form.ipv6Suffix}
                                onClick={item => changeValue('ipv6Suffix', item)}
                              />
                            </Col>
                            <Col sm={6}>
                              <div className='modal-form-title'>Manual suffix (optional)</div>
                              <Input
                                type='text'
                                value={form.manualSuffix}
                                placeholder='e.g. 1'
                                onChange={e => changeValue('manualSuffix', e.target.value)}
                                onFocus={() => { }}
                                onBlur={() => { }}
                              />
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <>
                          {/* IPv6 address */}
                          <Row className='mt-2'>
                            <Col sm={6}>
                              <div className='modal-form-title required'>IPv6 address</div>
                              <Input
                                type='text'
                                value={form.ipv6Address}
                                placeholder='e.g. 2001:db8:abcd:64::2/64'
                                onChange={e => changeValue('ipv6Address', e.target.value)}
                                onFocus={() => { }}
                                onBlur={() => { }}
                              />
                            </Col>
                          </Row>
                        </>
                      )
                    }
                  </>
                )
              }
              {/* IPv6 autoconfiguration service */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>IPv6 autoconfiguration service </div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.ipv6AutoConfigurationService.find(item => item.isActive)}
                    itemList={form.ipv6AutoConfigurationService}
                    onClick={item => changeValue('ipv6AutoConfigurationService', item)}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <>
              {/* Protocol */}
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
                {
                  form.protocol.find(protocol => protocol.isActive).value === 'dhcpv4' && (
                    <>
                      <Col sm={6}>
                        <div className='modal-form-title required'>RADIUS Gateway IP address</div>
                        <Input
                          type='text'
                          value={form.bridgedRadiusGatewayIpAddress}
                          placeholder='e.g. 192.168.200.1'
                          onChange={e => changeValue('bridgedRadiusGatewayIpAddress', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </Col>
                    </>
                  )
                }
              </Row>
              {
                form.protocol.find(protocol => protocol.isActive).value === 'staticIpv4' && (
                  <>
                    {/* IP address, Subnet mask */}
                    <Row className='mt-2'>
                      <Col sm={6}>
                        <div className='modal-form-title required'>IP address</div>
                        <Input
                          type='text'
                          value={form.bridgedIpAddress}
                          placeholder='e.g. 192.168.200.1'
                          onChange={e => changeValue('bridgedIpAddress', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </Col>
                      <Col sm={6}>
                        <div className='modal-form-title required'>Subnet mask</div>
                        <Input
                          type='text'
                          value={form.bridgedSubnetMask}
                          placeholder='e.g. 192.168.200.1'
                          onChange={e => changeValue('bridgeToInterface', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </Col>
                    </Row>
                    {/* Gateway IP address(optoinal), RADIUS Gateway IP address */}
                    <Row className='mt-2'>
                      <Col sm={6}>
                        <div className='modal-form-title'>Gateway IP address(optional)</div>
                        <Input
                          type='text'
                          value={form.bridgedDefaultGateway}
                          placeholder='e.g. 192.168.200.1'
                          onChange={e => changeValue('bridgedDefaultGateway', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </Col>
                      <Col sm={6}>
                        <div className='modal-form-title required'>RADIUS Gateway IP address</div>
                        <Input
                          type='text'
                          value={form.bridgedRadiusGatewayIpAddress}
                          placeholder='e.g. 192.168.200.1'
                          onChange={e => changeValue('bridgedRadiusGatewayIpAddress', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </Col>
                    </Row>
                  </>
                )
              }
            </>
          )
        }
        {
          (
            form.bridgeToInterface[0].isActive
            || !form.protocol[0].isActive
          ) && (
            <>
              {/* Captive portal, Captive portal name */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>Captive portal</div>
                  <div className='form-field--horizontal'>
                    <RadioButton
                      id='captive-portal-enable'
                      name='captivePortalEnable'
                      label='Enable'
                      hasRightMargin={true}
                      checked={form.captivePortal}
                      onChange={() => changeValue('captivePortal', true)}
                    />
                    <RadioButton
                      id='captive-portal-disable'
                      name='captivePortalDisable'
                      label='Disable'
                      checked={!form.captivePortal}
                      onChange={() => changeValue('captivePortal', false)}
                    />
                  </div>
                </Col>
                {
                  !form.captivePortal && (
                    <>
                      <Col sm={6}>
                        <div className='modal-form-title'>Captive portal name</div>
                        <DropdownWithItem
                          type='normal'
                          selectedItem={form.captivePortalName.find(item => item.isActive)}
                          itemList={form.captivePortalName}
                          onClick={item => changeValue('captivePortalName', item)}
                        />
                      </Col>
                    </>
                  )
                }
              </Row>
              {/* Allow ping from LAN */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>Allow ping from LAN</div>
                  <div className='form-field--horizontal'>
                    <RadioButton
                      id='allow-ping-from-vlan-enable'
                      name='allowPingFromVlanEnable'
                      label='Enable'
                      hasRightMargin={true}
                      checked={form.allowPingFromLan}
                      onChange={() => changeValue('allowPingFromLan', true)}
                    />
                    <RadioButton
                      id='allow-ping-from-vlan-disable'
                      name='allowPingFromVlanDisable'
                      label='Disable'
                      checked={!form.allowPingFromLan}
                      onChange={() => changeValue('allowPingFromLan', false)}
                    />
                  </div>
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
          onClick={() => changeModalStatus(modalStatus.editVlan.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.editVlan.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default EditVlanModal;
