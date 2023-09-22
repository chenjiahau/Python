import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep, size } from 'lodash';

// Component
import { DropdownWithItem, RadioButton, Input } from 'components/';

import Func from '../../../../../Func';

// Context
import { ConfigContext } from '../../../../../../Context';
import { EthernetContext } from '../../Context';

// Dummy data
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const protocolDefinition = {
  dhcpV4: 'DHCPv4',
  dhcpV6: 'DHCPv6',
  staticV4: 'Static IPv4',
  staticV6: 'Static IPv6',
  pppoe: 'PPPoE',
  dslite: 'DS-Lite / IPIP',
  mape: 'MAP-E'
};

const wanModeDefinition = {
  standalone: 'Standalone mode',
  autoRollover: 'Auto-rollover',
  loadBalancing: 'Load balancing'
};

const healthCheckDefinition = {
  wanDnsServers: 'WAN DNS servers',
  dnsServers: 'DNS servers',
  pingIpAddress: 'Ping IP address'
};

const tooltip = (
  <div>
    Please note the following when setting up your WAN mode.<br /><br />
    For all WAN modes:<br /><br />
    • The following features will work with a designated WAN despite the WAN mode: <br />
    - Site-to-Site Manual VPN <br />
    - Static route <br />
    - Policy route <br /><br />
    For Auto rollover and Load balancing: <br /><br />
    • This mode only applies to IPv4(IPv4 Default WAN is not applicable in this mode). IPv6 follows IPv6 Default WAN.<br />
    • The following features will be affected under either of these modes(the WAN mode prevails over a designated WAN):
    <br />
    - Port forwarding <br />
    - Port triggering
  </div>);

const WanModeConfiguration = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: ethernetState } = useContext(EthernetContext);

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    if (size(ethernetState.interfaces) === 0 || !ethernetState.wanMode) {
      return;
    }

    // Collect interfaces
    let interfaces = new Set();
    let ifaceIndex = 0;
    ethernetState.interfaces.forEach((iface) => {
      const ifaceName = iface.interface;

      ifaceIndex++;
      const ifaceObj = {
        id: ifaceIndex,
        title: ifaceName,
        isActive: false
      };
      interfaces.add(ifaceObj);

      iface.protocols.forEach((protocol, protocolIndex) => {
        if (protocol.protocol === protocolDefinition.pppoe) {
          ifaceIndex++;
          interfaces.add({
            id: ifaceIndex,
            title: protocol.name,
            isActive: false
          })
        }
      });
    });

    const primaryWanInterfaces = cloneDeep(Array.from(interfaces));
    const secondaryWanInterfaces = cloneDeep(Array.from(interfaces));

    const updatedForm = {
      ...ethernetState.wanMode,
    };

    primaryWanInterfaces.forEach((iface, index) => {
      if (iface.title === updatedForm.primaryWanInterface) {
        primaryWanInterfaces[index].isActive = true;
      }
    });
    updatedForm.primaryWanInterface = primaryWanInterfaces;

    secondaryWanInterfaces.forEach((iface, index) => {
      if (iface.title === updatedForm.secondaryWanInterface) {
        secondaryWanInterfaces[index].isActive = true;
      }
    });
    updatedForm.secondaryWanInterface = secondaryWanInterfaces;

    const wanModeDropdown = [];
    for (const key in wanModeDefinition) {
      wanModeDropdown.push({
        title: wanModeDefinition[key],
        value: key,
        isActive: false
      });
    }

    const healthCheckDropdown = [];
    for (const key in healthCheckDefinition) {
      healthCheckDropdown.push({
        title: healthCheckDefinition[key],
        value: key,
        isActive: false
      });
    }

    wanModeDropdown.forEach((wanMode, index) => {
      if (wanMode.value === updatedForm.wanMode) {
        wanModeDropdown[index].isActive = true;
      }
    });
    updatedForm.wanMode = wanModeDropdown;

    healthCheckDropdown.forEach((healthCheck, index) => {
      if (healthCheck.value === updatedForm.healthCheck) {
        healthCheckDropdown[index].isActive = true;
      }
    });
    updatedForm.healthCheck = healthCheckDropdown;

    setForm(updatedForm);
  }, [ethernetState.wanMode]);

  if (!form) {
    return (
      <Func
        title='WAN MODE CONFIGURATION'
        htmlTooltip={tooltip}
      />
    );
  }

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;
  const selectedWanMode = form.wanMode.find(item => item.isActive);
  const selectedPrimaryInterface = form.primaryWanInterface.find(item => item.isActive);
  const selectedHealthCheck = form.healthCheck.find(item => item.isActive);

  return (
    <>
      <Func
        title='WAN MODE CONFIGURATION'
        htmlTooltip={tooltip}
      >
        <div className='form-groups form-group--align-top'>
          {/* WAN mode */}
          <div className='form-title'>
            WAN mode
          </div>
          <div className='form-field form-field--dropdown-middle-width'>
            {
              ((isProfilePath) || (!isProfilePath && !isNotStandalone)) ? (
                <DropdownWithItem
                  type='normal'
                  isMiddleSize={true}
                  selectedItem={form.wanMode.find(item => item.isActive)}
                  itemList={form.wanMode}
                  onClick={item => changeValue('wanMode', item)}
                />
              ) : (
                <>
                  {selectedWanMode.title}
                </>
              )
            }

          </div>
          {
            selectedWanMode.title !== wanModeDefinition.standalone && (
              <>
                {
                  selectedWanMode.title === wanModeDefinition.loadBalancing && (
                    <>
                      {/* Load balancing */}
                      <div className='form-title'>
                        Load balancing
                      </div>
                      <div className='form-field'>
                        <div className='form-field--horizontal'>
                          <RadioButton
                            id='load-balancing-enable'
                            name='loadBalancingEnable'
                            label='Round robin'
                            hasRightMargin={true}
                            checked={form.loadBalancing}
                            onChange={() => changeValue('loadBalancing', true)}
                          />
                          <RadioButton
                            id='load-balancing-disable'
                            name='loadBalancingDisable'
                            label='Spillover'
                            checked={!form.loadBalancing}
                            onChange={() => changeValue('loadBalancing', false)}
                          />
                        </div>
                      </div>
                    </>
                  )
                }

                {/* Primary WAN(Interface) */}
                <div className='form-title'>
                  Primary WAN
                </div>
                <div className='form-field form-field--dropdown-middle-width'>
                  <DropdownWithItem
                    type='normal'
                    isMiddleSize={true}
                    selectedItem={form.primaryWanInterface.find(item => item.isActive)}
                    itemList={form.primaryWanInterface}
                    onClick={item => changeValue('primaryWanInterface', item)}
                  />
                </div>
                {/* Secondary WAN(Interface) */}
                <div className='form-title'>
                  Secondary WAN
                </div>
                <div className='form-field form-field--dropdown-middle-width'>
                  <DropdownWithItem
                    type='normal'
                    isMiddleSize={true}
                    selectedItem={form.secondaryWanInterface.find(item => item.isActive)}
                    itemList={form.secondaryWanInterface.filter(item => item.title !== selectedPrimaryInterface.title)}
                    onClick={item => changeValue('secondaryWanInterface', item)}
                  />
                </div>
                {/* Health check method */}
                <div className='form-title'>
                  Health check method
                </div>
                <div className='form-field form-field--dropdown-middle-width'>
                  <DropdownWithItem
                    type='normal'
                    isMiddleSize={true}
                    selectedItem={form.healthCheck.find(item => item.isActive)}
                    itemList={form.healthCheck}
                    onClick={item => changeValue('healthCheck', item)}
                  />
                </div>
                {
                  selectedHealthCheck.title !== healthCheckDefinition.wanDnsServers && (
                    <>
                      {/* Primary WAN */}
                      <div className='form-title required'>
                        Primary WAN
                      </div>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='text'
                          value={form.primaryWanIpv4}
                          placeholder='0.0.0.0'
                          isMiddleSize={true}
                          onChange={e => changeValue('primaryWanIpv4', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                        <Input
                          type='text'
                          value={form.primaryWanIpv6}
                          placeholder='2001:abcd::1'
                          isMiddleSize={true}
                          onChange={e => changeValue('primaryWanIpv6', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </div>
                      {/* Secondary WAN */}
                      <div className='form-title required'>
                        Secondary WAN
                      </div>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='text'
                          value={form.secondaryWanIpv4}
                          placeholder='0.0.0.0'
                          isMiddleSize={true}
                          onChange={e => changeValue('secondaryWanIpv4', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                        <Input
                          type='text'
                          value={form.secondaryWanIpv6}
                          placeholder='2001:abcd::1'
                          isMiddleSize={true}
                          onChange={e => changeValue('secondaryWanIpv6', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </div>
                    </>
                  )
                }
                {/* Health check interval */}
                <div className='form-title required'>
                  Health check interval
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type='number'
                    isMiddleSize={true}
                    placeholder='5-999'
                    autoComplete='new-email'
                    value={form.healthCheckInterval}
                    onChange={(e) => changeValue('healthCheckInterval', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>seconds</div>
                </div>
                {/* Health check retries */}
                <div className='form-title required'>
                  Health check retries
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type='number'
                    isMiddleSize={true}
                    placeholder='2-999'
                    autoComplete='new-email'
                    value={form.healthCheckRetries}
                    onChange={(e) => changeValue('healthCheckRetries', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>times</div>
                </div>
                {
                  (
                    (selectedWanMode.title === wanModeDefinition.loadBalancing)
                    && (!form.loadBalancing)
                  ) && (
                    <>
                      {/* Primary WAN load tolerance */}
                      <div className='form-title required'>
                        Primary WAN load tolerance
                      </div>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='number'
                          isMiddleSize={true}
                          placeholder='20-80'
                          autoComplete='new-email'
                          value={form.primaryWanLoadTolerance}
                          onChange={(e) => changeValue('primaryWanLoadTolerance', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                        <div>%</div>
                      </div>
                      {/* Primary WAN maximum bandwidth	 */}
                      <div className='form-title required'>
                        Primary WAN maximum bandwidth
                      </div>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='number'
                          isMiddleSize={true}
                          placeholder='1-2500'
                          autoComplete='new-email'
                          value={form.primaryWanMaximumBandwidth}
                          onChange={(e) => changeValue('primaryWanMaximumBandwidth', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                        <div>Mbps</div>
                      </div>
                    </>
                  )
                }
              </>
            )
          }
        </div>
      </Func >
    </>
  )
}

export default WanModeConfiguration;