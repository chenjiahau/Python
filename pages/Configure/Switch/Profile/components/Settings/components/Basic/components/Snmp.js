import mainStyle from '../../../settings.module.scss';

import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { TooltipDialog, RadioButton, Textarea, DropdownWithItem, Input } from 'components/';

// Fake data
import { generateSnmpData } from 'dummy/data/switch/basic/snmp';
import { getChangeValueFn } from 'dummy/utils/changeValue';

const defaultSnmpAccessList = [
  { title: 'Disable', isActive: false },
  { title: 'SNMP V1/V2c', isActive: false }
];

const Snmp = () => {
  // Fake data
  const fakeSnmp = generateSnmpData();

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeSnampAccess = (selectedSnmpAccess) => {
    const updatedForm = cloneDeep(form);
    updatedForm.snmpAccess.list.forEach(item => item.isActive = item.title === selectedSnmpAccess.title);
    updatedForm.snmpAccess.selected = updatedForm.snmpAccess.list.find(item => item.isActive);
    setForm(updatedForm);
  }

  const changeTrapState = (value) => {
    const updatedForm = cloneDeep(form);
    updatedForm.trapState.value = value;
    setForm(updatedForm);
  }

  // Side effect
  useEffect(() => {
    const snmpAccessList = cloneDeep(defaultSnmpAccessList);
    snmpAccessList.forEach(item => item.isActive = item.title === fakeSnmp.snmpAccess);

    const updatedForm = {
      snmpAccess: {
        selected: snmpAccessList.find(item => item.isActive),
        list: snmpAccessList
      },
      snmpUdpPort: {
        value: fakeSnmp.snmpUdpPort
      },
      communityName: {
        value: fakeSnmp.communityName
      },
      trapState: {
        value: fakeSnmp.trapState
      },
      trapReceives: {
        value: fakeSnmp.trapReceives.join(', ')
      }
    };

    setForm(updatedForm);
  }, []);

  if (!form) {
    return;
  }

  return (
    <>
      <div className='text-title'>SNMP</div>
      <div className={mainStyle['detail']} >
        {/* SNMP access */}
        <div>
          <div className='form-title'>
            SNMP access
          </div>
        </div>
        <div>
          <div className={`${mainStyle['block']} ${mainStyle['two-column-block']}`}>
            <DropdownWithItem
              id='action-dropdown'
              type='normal'
              selectedItem={form.snmpAccess.selected}
              itemList={form.snmpAccess.list}
              onClick={item => changeSnampAccess(item)}
            />
          </div>
        </div>

        {/* SNMP port */}
        <div className='mask-parent mt-1'>
          <div className={`${form.snmpAccess.selected.title === 'SNMP V1/V2c' ? '' : 'mask-container'}`}>
            <div className='form-title required'>
              SNMP port
            </div>
          </div>
          {form.snmpAccess.selected.title !== 'SNMP V1/V2c' && <div className='mask-container-overlay'></div>}
        </div>
        <div className='mask-parent'>
          <div className={`${form.snmpAccess.selected.title === 'SNMP V1/V2c' ? '' : 'mask-container'}`}>
            <div className={`${mainStyle['block']} ${mainStyle['two-column-block']}`}>
              <Input
                type='number'
                placeholder='1-65535'
                autoComplete='new-password'
                value={form.snmpUdpPort.value}
                onChange={e => { }}
              />
            </div>
          </div>
          {form.snmpAccess.selected.title !== 'SNMP V1/V2c' && <div className='mask-container-overlay'></div>}
        </div>

        {/* Community name */}
        <div className='mask-parent mt-1'>
          <div className={`${form.snmpAccess.selected.title === 'SNMP V1/V2c' ? '' : 'mask-container'}`}>
            <div className='form-title required'>
              Community name
              <TooltipDialog
                className='ms-1 me-1'
                placement='bottom'
                title="Only support “Read-only” community string."
              />
            </div>
          </div>
          {form.snmpAccess.selected.title !== 'SNMP V1/V2c' && <div className='mask-container-overlay'></div>}
        </div>
        <div style={{ position: 'relative', height: '24px' }}>
          <div className={`${form.snmpAccess.selected.title === 'SNMP V1/V2c' ? '' : 'mask-container'}`}>
            <div className={`${mainStyle['block']} ${mainStyle['two-column-block']}`}>
              <Input
                type='text'
                placeholder='1-32 characters'
                autoComplete='new-password'
                value={form.communityName.value}
                onChange={e => { }}
              />
            </div>
          </div>
          {form.snmpAccess.selected.title !== 'SNMP V1/V2c' && <div className='mask-container-overlay'></div>}
        </div>

        {/* Trap state */}
        <div className='mask-parent mt-1'>
          <div className={`${form.snmpAccess.selected.title === 'SNMP V1/V2c' ? '' : 'mask-container'}`}>
            <div className='form-title'>
              Trap state
            </div>
          </div>
          {form.snmpAccess.selected.title !== 'SNMP V1/V2c' && <div className='mask-container-overlay'></div>}
        </div>
        <div className='mask-parent'>
          <div className={`${form.snmpAccess.selected.title === 'SNMP V1/V2c' ? '' : 'mask-container'}`}>
            <div className={`${mainStyle['block']} ${mainStyle['two-column-block']}`}>
              <div className='form-field--horizontal'>
                <RadioButton
                  id='enableTrapState'
                  name='trapState'
                  label="Enable"
                  checked={form.trapState.value}
                  onChange={() => changeTrapState(true)}
                />
                <div style={{ width: '20px' }}></div>
                <RadioButton
                  id='disableTrapState'
                  name='trapState'
                  label="Disable"
                  checked={!form.trapState.value}
                  onChange={() => changeTrapState(false)}
                />
              </div>
            </div>
          </div>
          {form.snmpAccess.selected.title !== 'SNMP V1/V2c' && <div className='mask-container-overlay'></div>}
        </div>

        {/* Trap receivers */}
        <div className='mask-parent mt-1'>
          <div className={`${form.snmpAccess.selected.title === 'SNMP V1/V2c' ? '' : 'mask-container'}`}>
            <div className='form-title required'>
              Trap receivers
              <TooltipDialog
                className='ms-1 me-1'
                placement='bottom'
                title="Enter IP addresses separated by whitespace, commas, or semicolons."
              />
            </div>
          </div>
          {form.snmpAccess.selected.title !== 'SNMP V1/V2c' && <div className='mask-container-overlay'></div>}
        </div>
        <div className='mask-parent'>
          <div className={`${form.snmpAccess.selected.title === 'SNMP V1/V2c' ? '' : 'mask-container'}`}>
            <div style={{ width: '300px', height: '110px' }}>
              <Textarea
                style={{ width: '300px', height: '100px' }}
                value={form.trapReceives.value}
                placeholder=''
                disabled={form.snmpAccess.selected.title !== 'SNMP V1/V2c'}
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
                {form.snmpAccess.selected.title === 'SNMP V1/V2c' && !form.trapReceives.value && 'e.g. 10.90.90.90, 10.1.1.1'}
              </div>
              <div>Up to 3 entries</div>
            </div>
          </div>

        </div>

        {/* Support MIBs */}
        <div className='mask-parent mt-1'>
          <div className={`${form.snmpAccess.selected.title === 'SNMP V1/V2c' ? '' : 'mask-container'}`}>
            <div className='form-title'>
              Support MIBs
            </div>
          </div>
          {form.snmpAccess.selected.title !== 'SNMP V1/V2c' && <div className='mask-container-overlay'></div>}
        </div>
        <div>
          <div className='mask-parent'>
            <div className={`${form.snmpAccess.selected.title === 'SNMP V1/V2c' ? '' : 'mask-container'}`}>
              <a
                href='/file/support_MIBs.zip'
                className='redirect-to'
                disabled={form.snmpAccess.selected.title !== 'SNMP V1/V2c'}
              >
                Download MIBs
              </a>
            </div>
            {form.snmpAccess.selected.title !== 'SNMP V1/V2c' && <div className='mask-container-overlay'></div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Snmp;