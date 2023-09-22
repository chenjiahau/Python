import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { InlineTitle, EditableNameBox, TooltipDialog, Icon, Button } from 'components/';
import EditTagModal from './EditTagModal';

// Dummy
import { getChangeValueFn } from 'dummy/utils/changeValue';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

const defaultModalStatus = {
  editTag: {
    self: 'editTag',
    status: false,
  },
};

const Information = props => {
  const { device } = props;

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [form, setForm] = useState(null);
  const [eyeState, setEyeState] = useState(true)

  // Method
  const changeValue = getChangeValueFn(form, setForm);
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  // Side effect
  useEffect(() => {
    const updatedForm = {
      deviceName: {
        value: device.name,
        isValid: true,
      }
    }

    setForm(updatedForm);
  }, [device]);

  if (!form) {
    return;
  }

  return (
    <>
      <InlineTitle label='DEVICE INFORMATION' />

      {/* Device name */}
      <div className='form-group'>
        <div className='form-title'>Device name</div>
        <div className='form-field'>
          <EditableNameBox
            isSmallSize={true}
            isInvalid={!form.deviceName.isValid}
            onClickCancelIcon={() => changeValue('deviceName', device.deviceName)}
            inputFieldOnKeyDown={(e) => { }}
            inputFieldOnChange={e => changeValue('deviceName', e.target.value)}
            value={form.deviceName.value}
          />
        </div>
      </div>

      {/* Model name */}
      <div className='form-group'>
        <div className='form-title'>Model name</div>
        <div className='form-field'>
          {device.modelName}
        </div>
      </div>

      {/* Device UID */}
      <div className='form-group'>
        <div className='form-title'>Device UID</div>
        <div className='form-field'>
          {device.deviceUid}
        </div>
      </div>

      {/* MAC address */}
      <div className='form-group'>
        <div className='form-title'>MAC address</div>
        <div className='form-field'>
          {device.macAddress}
        </div>
      </div>

      {/* Serial number */}
      <div className='form-group'>
        <div className='form-title'>Serial number</div>
        <div className='form-field'>
          {device.serialNumber}
        </div>
      </div>

      {/* Local credential */}
      <div className='form-group'>
        <div className='form-title'>
          Local credential
          <TooltipDialog
            className='ms-1 me-1'
            placement='right'
            title='Navigate to Settings > Organization Management > Site to edit the Device Credentials.'
          />
        </div>
        <div>
          <div className='form-field'>
            Username: {device.localCredential.username}
          </div>
        </div>
      </div>
      <div className='form-group'>
        <div className='form-title'></div>
        <div className='form-field form-field--horizontal'>
          <div style={{ marginRight: '8px' }}>
            Password: {eyeState ? device.localCredential.password.replace(/./g, '*') : device.localCredential.password}
          </div>
          <Icon
            iconTitle={eyeState ? 'Show password' : 'Hide password'}
            className={`icon-left ${eyeState ? 'icon-open-eye' : 'icon-close-eye'}`}
            onClick={() => setEyeState(!eyeState)}
          />
        </div>
      </div>

      {/* RSTP */}
      <div className='form-group'>
        <div className='form-title'>RSTP</div>
        <div className='form-field'>
          {device.rstp || '-'}
        </div>
      </div>

      {/* IGMP snooping */}
      <div className='form-group'>
        <div className='form-title'>IGMP snooping</div>
        <div className='form-field'>
          {device.igmpSnooping || ''}
        </div>
      </div>

      {/* Tags */}
      <div className='form-group form-group--align-top'>
        <div className='form-title'>Tags</div>
        <div className='form-field'>
          {device.tagList.length > 0 && device.tagList.join(', ')}
          {device.tagList.length > 0 && <span className='space'></span>}
          <div className={device.tagList.length > 0 ? 'mt-1' : ''}>
            <Button
              label='Edit tag'
              className='btn-indigo'
              onClick={() => changeModalStatus(modalStatus.editTag.self, true)}
            />
          </div>
        </div>
      </div >

      {/* Hardware version */}
      <div className='form-group' >
        <div className='form-title'>Hardware version</div>
        <div className='form-field'>
          {device.hardwareVersion}
        </div>
      </div>

      {/* SNMP */}
      <div className='form-group' >
        <div className='form-title sub-title'>SNMP</div>
      </div>
      <div className='form-group'>
        <div className='form-title form-title--indent'>SNMP access</div>
        <div className='form-field'>
          {device.snmpAccess}
        </div>
      </div>

      <EditTagModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        tags={device.tagList}
      />
    </>
  );
}

export default Information;