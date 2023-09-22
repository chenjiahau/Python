import mainStyle from '../../../settings.module.scss';

import React from 'react';

import { useState, useEffect } from 'react';

// Component
import { RadioButton, Textarea } from 'components/';

// Fake data
import { generateDhcpServerData } from 'dummy/data/switch/basic/dhcp-server';
import { getChangeValueFn } from 'dummy/utils/changeValue';

const DhcpServerScreen = () => {
  // Fake data
  const fakeDhcpServer = generateDhcpServerData();

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueFn(form, setForm);

  // Side effect
  useEffect(() => {
    const updatedForm = {
      state: {
        value: fakeDhcpServer.enable
      },
      allowedIp: {
        value: fakeDhcpServer.allowedIpList.join(', ')
      }
    };
    setForm(updatedForm);
  }, []);

  if (!form) {
    return;
  }

  return (
    <>
      <div className='text-title'>DHCP SERVER SCREEN CONFIGURATION</div>
      <div className={mainStyle['detail']} >
        {/* DHCP Server Screening */}
        <div className='form-title'>DHCP Server Screening</div>
        <div className={`${mainStyle['block']} ${mainStyle['two-column-block']}`}>
          <div className='form-field--horizontal'>
            <RadioButton
              id='enableDhcpServer'
              name='dhcpServerState'
              label="Enable"
              checked={form.state.value}
              onChange={() => changeValue('state', true)}
            />
            <div style={{ width: '20px' }}></div>
            <RadioButton
              id='disableDhcpServer'
              name='dhcpServerState'
              label="Disable"
              checked={!form.state.value}
              onChange={() => changeValue('state', false)}
            />
          </div>
        </div>

        {/* Allowed DHCP server IP */}
        <div className='mask-parent'>
          <div className={`${form.state.value ? '' : 'mask-container'}`}>
            <div className='form-title required'>Allowed DHCP server IP</div>
          </div>
          {!form.state.value && <div className='mask-container-overlay'></div>}
        </div>
        <div className='mask-parent' style={{ height: '120px' }} >
          <div className={`${form.state.value ? '' : 'mask-container'}`}>
            <div style={{ width: '300px', height: '110px' }}>
              <Textarea
                style={{ width: '300px', height: '100px' }}
                value={form.allowedIp.value}
                disabled={!form.state.value}
                placeholder=''
                onChange={e => { }}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
            <div
              className='d-flex justify-content-between'
              style={{ width: '300px' }}
            >
              <div className='text-error'>
                {form.state.value && !form.allowedIp.value && 'eg: 10.90.90.90, 10.1.1.1'}
              </div>
              <div>Up to 5 entries</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DhcpServerScreen