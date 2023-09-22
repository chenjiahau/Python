import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { RadioButton, Input, Button } from 'components/';

// Context
import DataContext from '../../DataContext';

// Dummy data & util
import { getChangeValueFn } from 'dummy/utils/changeValue';

const generateData = () => {
  return cloneDeep({
    proxy: false,
    proxyHost: '',
    proxyPort: '',
    ipv6: true,
    fastRoaming: false,
    managementVlan: false,
    vlanMode: false,
    vlanTag: '',
  });
}

const Settings = (props) => {
  const {
    modalStatus,
    changeModalStatus,
    proflie
  } = props;

  const ctx = useContext(DataContext);

  // Faker API data
  const fakeData = generateData();

  // Stat
  const [form, setForm] = useState();

  // Method
  const changeValue = getChangeValueFn(form, setForm);

  // Side effect
  useEffect(() => {
    const data = {
      proxy: {
        value: fakeData.proxy,
      },
      proxyHost: {
        value: fakeData.proxyHost,
      },
      proxyPort: {
        value: fakeData.proxyPort,
      },
      ipv6: {
        value: fakeData.ipv6,
      },
      fastRoaming: {
        value: fakeData.fastRoaming,
      },
      managementVlan: {
        value: fakeData.managementVlan,
      },
      vlanMode: {
        value: fakeData.vlanMode,
      },
      vlanTag: {
        value: fakeData.vlanTag,
      }
    };

    setForm(data);
    ctx.updateSettings(data);
    ctx.updateChangedSettings(data);
  }, []);

  useEffect(() => {
    ctx.updateChangedSettings(form);
  }, [form]);

  if (!form) {
    return null;
  }

  return (
    <>
      <div className="layout-container layout-container--column layout-container--fluid">
        <div className="form-groups">
          {/* Proxy */}
          <div className='form-title'>
            Proxy
          </div>
          <div className='form-field form-field--horizontal'>
            <RadioButton
              id="proxy-enable"
              name="proxy"
              label="Enable"
              hasRightMargin={true}
              checked={form.proxy.value}
              onChange={e => changeValue(e.target.name, true)}
            />
            <RadioButton
              id="proxy-disable"
              name="proxy"
              label="Disable"
              checked={!form.proxy.value}
              onChange={e => changeValue(e.target.name, false)}
            />
          </div>

          {/* Proxy host, proxy port */}
          {
            form.proxy.value && (
              <>
                <div className='form-title form-title--indent required'>
                  Proxy host
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type="text"
                    name="proxyHost"
                    isMiddleSize={true}
                    placeholder="hostname.com"
                    autoComplete="new-email"
                    value={form.proxyHost.value}
                    onChange={e => changeValue(e.target.name, e.target.value)}
                  />
                </div>
                <div className='form-title form-title--indent required'>
                  Proxy port
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type="number"
                    name="proxyPort"
                    isMiddleSize={true}
                    placeholder="1-65535"
                    autoComplete="new-email"
                    value={form.proxyPort.value}
                    onChange={e => changeValue(e.target.name, +e.target.value ? +e.target.value : 1)}
                  />
                </div>
              </>
            )
          }

          {/* IPv6 */}
          <div className='form-title'>
            IPv6
          </div>
          <div className='form-field form-field--horizontal'>
            <RadioButton
              id="ipv6-enable"
              name="ipv6"
              label="Enable"
              hasRightMargin={true}
              checked={form.ipv6.value}
              onChange={e => changeValue(e.target.name, true)}
            />
            <RadioButton
              id="ipv6-disable"
              name="ipv6"
              label="Disable"
              checked={!form.ipv6.value}
              onChange={e => changeValue(e.target.name, false)}
            />
          </div>

          {/* Fast roaming */}
          <div className='form-title'>
            Fast roaming
          </div>
          <div className='form-field form-field--horizontal'>
            <RadioButton
              id="fast-roaming-enable"
              name="fastRoaming"
              label="Enable"
              hasRightMargin={true}
              checked={form.fastRoaming.value}
              onChange={e => changeValue(e.target.name, true)}
            />
            <RadioButton
              id="fast-roaming-disable"
              name="fastRoaming"
              label="Disable"
              checked={!form.fastRoaming.value}
              onChange={e => changeValue(e.target.name, false)}
            />
          </div>

          {/* Management VLAN */}
          <div className='form-title'>
            Management VLAN
          </div>
          <div className='form-field form-field--horizontal'>
            <RadioButton
              id="management-vlan-enable"
              name="managementVlan"
              label="Enable"
              hasRightMargin={true}
              checked={form.managementVlan.value}
              onChange={e => changeValue(e.target.name, true)}
            />
            <RadioButton
              id="management-vlan-disable"
              name="managementVlan"
              label="Disable"
              checked={!form.managementVlan.value}
              onChange={e => changeValue(e.target.name, false)}
            />
          </div>

          {
            form.managementVlan.value && (
              <>
                <div className='form-title form-title--indent'>
                  VLAN mode
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id="vlan-mode-enable"
                    name="vlanMode"
                    label="Tagged"
                    hasRightMargin={true}
                    checked={form.vlanMode.value}
                    onChange={e => changeValue(e.target.name, true)}
                  />
                  <RadioButton
                    id="vlan-mode-disable"
                    name="vlanMode"
                    label="Untagged"
                    checked={!form.vlanMode.value}
                    onChange={e => changeValue(e.target.name, false)}
                  />
                </div>
                <div className='form-title form-title--indent required'>
                  VLAN tag
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type="number"
                    name="vlanTag"
                    isMiddleSize={true}
                    placeholder="1-4094"
                    autoComplete="new-email"
                    value={form.vlanTag.value}
                    onChange={e => changeValue(e.target.name, +e.target.value ? +e.target.value : 1)}
                  />
                </div>
              </>
            )
          }
        </div>

        <div className='text-warning mt-4'>
          Please make sure your Management VLAN and Proxy settings are correct. Otherwise, the devices will lose connectivity with the Nuclias Cloud.
        </div>
        <div className='text-warning'>
          IP address, Management VLAN and Proxy settings will not be applied to the devices which are set to use local settings.
        </div>

        <div className='apply-btn-group'>
          <Button
            label='Cancel'
            className='btn-cancel me-3'
            onClick={() => { console.log('Click on Cancel') }}
          />
          <Button
            label='Save'
            className='btn-submit'
            onClick={() => { }}
          />
        </div>
      </div >
    </>
  );
}

export default Settings;