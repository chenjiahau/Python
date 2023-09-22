import mainStyle from '../basic.module.scss';

import { useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';

// Component
import InlineTitle from 'components/InlineTitle';
import RadioButton from 'components/RadioButton';
import Input from 'components/Input';
import ChangeConnectionTypeModal from '../modals/ChangeConnectionTypeModal';

// Default variable
const defaultModalStatus = {
  changeConnectionType: {
    status: false,
  }
};

const IPConnection = props => {
  const {
    device,
    form,
    changeValue
  } = props;

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  // Method
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  const changeConnectionTypeCallback = (state) => {
    if (!state) {
      changeValue('connectionType', !form.connectionType.value)
    }
  }

  return (
    <>
      <div>
        <InlineTitle label='IP CONNECTION' />
        {/* Type */}
        <div className="form-group">
          <div className='form-title'>Type</div>
          <div className='form-field form-field--horizontal'>
            <RadioButton
              id="Enable"
              name="Enable"
              label="Enable"
              checked={form.connectionType.value}
              onChange={() => {
                changeValue('connectionType', true);
                changeModalStatus('changeConnectionType', true);
              }}
            />
            <div style={{ width: '20px' }}></div>
            <RadioButton
              id="Disable"
              name="Disable"
              label="Disable"
              checked={!form.connectionType.value}
              onChange={() => {
                changeValue('connectionType', false);
                changeModalStatus('changeConnectionType', true);
              }}
            />
          </div>
        </div>
        {/* Local IP */}
        <div className="form-group">
          <div className='form-title required'>Local IP</div>
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
        {/* Subnet mask */}
        <div className="form-group">
          <div className='form-title required'>Subnet mask</div>
          {
            form.connectionType.value && (
              <div className='form-field'>
                {form.subnetMask.value}
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
                  value={form.subnetMask.value}
                  onChange={e => changeValue('subnetMask', e.target.value)}
                />
              </div>
            )
          }
        </div>
        {/* Management VLAN */}
        <div className="form-group">
          <div className='form-title'>Management VLAN</div>
          <div className='form-field'>
            {device.vlan.managementVlan ? 'Enabled' : 'Disabled'}
          </div>
        </div>
        <div className="form-group">
          <div className='form-title form-title--indent'>VLAN mode</div>
          <div className='form-field'>
            {device.vlan.vlanMode}
          </div>
        </div>
        <div className="form-group">
          <div className='form-title form-title--indent required'>
            VLAN tag
          </div>
          <div className='form-field'>
            {device.vlan.vlanTag}
          </div>
        </div>
        {/* Public IP */}
        <div className="form-group">
          <div className='form-title'>Public IP</div>
          <div className='form-field'>
            {device.publicIp}
          </div>
        </div>
        {/* IPv6 */}
        <div className="form-group">
          <div className='form-title'>IPv6</div>
          <div className='form-field'>
            {device.ipv6 ? 'Enabled' : 'Disabled'}
          </div>
        </div>
        {/* Gateway */}
        <div className="form-group">
          <div className='form-title required'>Gateway</div>
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
        <div className="form-group">
          <div className='form-title required'>DNS server 1</div>
          {
            form.connectionType.value && (
              <div className='form-field'>
                {form.dnsServer1.value}
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <div className='form-title'>Proxy</div>
          <div className='form-field'>
            {device.proxy.state ? 'Enabled' : 'Disabled'}
          </div>
        </div>
        <div className={`form-group ${mainStyle['field']}`}>
          <div className='form-title form-title--indent'>Proxy host</div>
          <div className='form-field'>
            {device.proxy.host}
          </div>
        </div>
        <div className={`form-group ${mainStyle['field']}`}>
          <div className='form-title form-title--indent'>Proxy port</div>
          <div className='form-field'>
            {device.proxy.port}
          </div>
        </div>
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