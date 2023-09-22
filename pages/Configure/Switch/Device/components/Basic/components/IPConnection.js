import mainStyle from '../basic.module.scss';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Component
import { InlineTitle, RadioButton, Input, DropdownWithAdvancedSearch, TooltipDialog } from 'components/';
import ChangeConnectionTypeModal from '../modals/ChangeConnectionTypeModal';

// Dummy
import { generateVlanData } from 'dummy/data/switch/vlan';
import { getChangeValueFn } from 'dummy/utils/changeValue';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

// Default variable
const defaultModalStatus = {
  changeConnectionType: {
    status: false,
  }
};

const IPConnection = props => {
  const { device } = props;
  const navigate = useNavigate();

  // Fake data
  const fakeVlanData = generateVlanData();

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [vlanDropdown, setVlanDropdown] = useState([]);
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueFn(form, setForm);
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeConnectionTypeCallback = (state) => {
    if (!state) {
      changeValue('connectionType', !form.connectionType.value)
    }
  }

  const redirectToSwitchPorts = (vlanId) => {
    navigate(`/cloud/configure/switch/switch-ports?vlan=${vlanId}`);
  }

  useEffect(() => {
    const updatedForm = {
      connectionType: {
        value: true,
      },
      vlan: {
        value: 1,
      },
      localIp: {
        value: '',
      },
      subnetMask: {
        value: '',
      },
      gateway: {
        value: '',
      },
      dnsServer1: {
        value: '',
      },
      dnsServer2: {
        value: '',
      },
      dnsServer3: {
        value: '',
      },
      proxy: {
        value: false
      },
      proxyHost: {
        value: ''
      },
      proxyPort: {
        value: ''
      }
    }

    setForm(updatedForm);

    const updatedVlanDropdown = fakeVlanData.map(item => {
      return {
        value: item.id,
        label: item.title,
      }
    });
    setVlanDropdown(updatedVlanDropdown);
  }, [device]);

  if (!form) {
    return;
  }

  return (
    <>
      <div>
        <InlineTitle label='IP CONNECTION' />

        {/* Type */}
        <div className='form-group'>
          <div className='form-title'>Type</div>
          <div className='form-field form-field--horizontal'>
            <RadioButton
              id='enableConnectionType'
              name='connectionType'
              label='DHCP'
              checked={form.connectionType.value}
              onChange={() => {
                changeValue('connectionType', true);
                changeModalStatus('changeConnectionType', true);
              }}
            />
            <div style={{ width: '20px' }}></div>
            <RadioButton
              id='disableConnectionType'
              name='connectionType'
              label='Static'
              checked={!form.connectionType.value}
              onChange={() => {
                changeValue('connectionType', false);
                changeModalStatus('changeConnectionType', true);
              }}
            />
          </div>
        </div>

        {/* Local IP */}
        <div className='form-group'>
          <div className={`form-title form-title--indent ${form.connectionType.value ? '' : 'required'}`}>Local IP</div>
          {
            form.connectionType.value && (
              <div className='form-field'>
                {form.localIp.value}
              </div>
            )
          }
          {
            !form.connectionType.value && (
              <div className='form-field'>
                <Input
                  type='text'
                  isSmallSize={true}
                  autoComplete='new-password'
                  value={form.localIp.value}
                  onChange={e => changeValue('localIp', e.target.value)}
                />
              </div>
            )
          }
        </div>

        {/* Management VLAN */}
        <div className='form-group form-group--align-top'>
          <div className='form-title form-title--indent required'>
            Management VLAN
            <TooltipDialog
              className='ms-1 me-1'
              placement='auto'
              title="If there is not a member port belonging to the management VLAN, the management traffic, such as accessing the D-Link Cloud switch, cannot access the D-Link Cloud switch"
            />
          </div>
          <div className='form-field'>
            <div className='form-field--horizontal'>
              <div className='block-small-size'>
                <DropdownWithAdvancedSearch
                  type='number'
                  value={form.vlan.value}
                  placeholder='1-4094'
                  alignEnd={true}
                  hasButton={false}
                  noIcon={true}
                  isSelectingItem={true}
                  dataBsToggleOnInput={true}
                  dataBsToggleOnButton={true}
                  onChange={e => { }}
                >
                  {
                    vlanDropdown.map((item, index) => {
                      return (
                        <li key={index} className={item.value === form.vlan.value ? 'active' : ''}>
                          {item.label}
                        </li>
                      )
                    })
                  }
                </DropdownWithAdvancedSearch>
              </div>
              <div className='text-error'>The range should be from 1 to 4094</div>
            </div>
            <div className='form-field mt-2'>
              <span className='redirect-to' onClick={() => redirectToSwitchPorts(form.vlan.value)}>89</span> member ports belonging to this management VLAN currently.
            </div>
          </div>
        </div>

        {/* Subnet mask */}
        {
          !form.connectionType.value && (
            <div className='form-group form-group--align-top'>
              <div className='form-title required'>Subnet mask</div>
              <div className='form-field'>
                <Input
                  type='text'
                  isSmallSize={true}
                  autoComplete='new-password'
                  value={form.subnetMask.value}
                  onChange={e => changeValue('subnetMask', e.target.value)}
                />
                <div className='text-error mt-2'>
                  Configuration properties validation error.
                </div>
              </div>
            </div>
          )
        }

        {/* Public IP */}
        <div className='form-group'>
          <div className='form-title'>Public IP</div>
          <div className='form-field'>
            {device.publicIp}
          </div>
        </div>

        {/* Gateway */}
        <div className='form-group'>
          <div className={`form-title ${form.connectionType.value ? '' : 'required'}`}>Gateway</div>
          {
            form.connectionType.value && (
              <div className='form-field'>
                {form.gateway.value}
              </div>
            )
          }
          {
            !form.connectionType.value && (
              <div className='form-field'>
                <Input
                  type='text'
                  isSmallSize={true}
                  autoComplete='new-password'
                  value={form.gateway.value}
                  onChange={e => changeValue('gateway', e.target.value)}
                />
              </div>
            )
          }
        </div>

        {/* DNS server */}
        <div className='form-group'>
          <div className={`form-title ${form.connectionType.value ? '' : 'required'}`}>DNS server 1</div>
          {
            form.connectionType.value && (
              <div className='form-field'>
                {form.dnsServer1.value || '-'}
              </div>
            )
          }
          {
            !form.connectionType.value && (
              <div className='form-field'>
                <Input
                  type='text'
                  isSmallSize={true}
                  autoComplete='new-password'
                  value={form.dnsServer1.value}
                  onChange={e => changeValue('dnsServer1', e.target.value)}
                />
              </div>
            )
          }
        </div>
        <div className='form-group'>
          <div className='form-title'>DNS server 2</div>
          {
            form.connectionType.value && (
              <div className='form-field'>
                {form.dnsServer2.value || '-'}
              </div>
            )
          }
          {
            !form.connectionType.value && (
              <div className='form-field'>
                <Input
                  type='text'
                  isSmallSize={true}
                  autoComplete='new-password'
                  value={form.dnsServer2.value}
                  onChange={e => changeValue('dnsServer2', e.target.value)}
                />
              </div>
            )
          }
        </div>
        <div className='form-group'>
          <div className='form-title'>DNS server 3</div>
          {
            form.connectionType.value && (
              <div className='form-field'>
                {form.dnsServer3.value || '-'}
              </div>
            )
          }
          {
            !form.connectionType.value && (
              <div className='form-field'>
                <Input
                  type='text'
                  isSmallSize={true}
                  autoComplete='new-password'
                  value={form.dnsServer3.value}
                  onChange={e => changeValue('dnsServer3', e.target.value)}
                />
              </div>
            )
          }
        </div>

        {/* Proxy */}
        <div className='form-group'>
          <div className='form-title'>Proxy</div>
          <div className='form-field form-field--horizontal'>
            <RadioButton
              id='enableProxy'
              name='proxy'
              label='Enable'
              checked={form.proxy.value}
              onChange={() => changeValue('proxy', true)}
            />
            <div style={{ width: '20px' }}></div>
            <RadioButton
              id='disableProxy'
              name='proxy'
              label='Disable'
              checked={!form.proxy.value}
              onChange={() => changeValue('proxy', false)}
            />
          </div>
        </div>
        {
          form.proxy.value && (
            <>
              <div className={`form-group ${mainStyle['field']}`}>
                <div className='form-title form-title--indent'>Proxy host</div>
                <div className='form-field'>
                  <Input
                    type='text'
                    isSmallSize={true}
                    placeholder='hostname.com'
                    autoComplete='new-password'
                    value={form.proxyHost.value}
                    onChange={e => changeValue('proxyHost', e.target.value)}
                  />
                </div>
              </div>
              <div className={`form-group ${mainStyle['field']}`}>
                <div className='form-title form-title--indent'>Proxy port</div>
                <div className='form-field'>
                  <Input
                    type='number'
                    isSmallSize={true}
                    placeholder='1-65535'
                    autoComplete='new-password'
                    value={form.proxyPort.value}
                    onChange={e => changeValue('proxyPort', e.target.value)}
                  />
                </div>
              </div>
            </>
          )
        }
      </div>

      <ChangeConnectionTypeModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        callback={(state) => changeConnectionTypeCallback(state)}
      />
    </>
  );
}

export default IPConnection;