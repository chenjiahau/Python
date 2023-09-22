import mainStyle from '../basic.module.scss';

import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';

// Component
import InlineTitle from 'components/InlineTitle';
import EditableNameBox from 'components/EditableNameBox';
import TooltipDialog from "components/TooltipDialog";
import Icon from 'components/Icon';

const Information = props => {
  const {
    device,
    form,
    changeValue,
  } = props;

  // State
  const [eyeState, setEyeState] = useState(true)

  return (
    <>
      <InlineTitle label='DEVICE INFORMATION' />
      {/* Device name */}
      <div className="form-group">
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
      <div className="form-group">
        <div className='form-title'>Model name</div>
        <div className='form-field'>
          {device.modelName}
        </div>
      </div>
      {/* Hardware version */}
      {
        (device.modelName === 'DBG-2000' || device.modelName === 'DBG-2000(B1)') &&
        <div className="form-group">
          <div className='form-title'>Hardware version</div>
          <div className='form-field'>
            {device.hardwareVersion}
          </div>
        </div>
      }
      {/* Device UID */}
      <div className="form-group">
        <div className='form-title'>Device UID</div>
        <div className='form-field'>
          {device.deviceUid}
        </div>
      </div>
      {/* Serial number */}
      <div className="form-group">
        <div className='form-title'>Serial number</div>
        <div className='form-field'>
          {device.serialNumber}
        </div>
      </div>
      {/* DDNS hostname */}
      <div className="form-group">
        <div className='form-title'>DDNS hostname</div>
        <div className='form-field'>
          {device.serialNumber}
        </div>
      </div>
      {/* Local credential */}
      <div className="form-group">
        <div className='form-title'>
          Local credential
        </div>
        <div>
          <div className='form-field'>
            Username: {device.localCredential.username}
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className='form-title'></div>
        <div className='form-field'>
          <div className="form-field--horizontal">
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
      </div>
      {/* MAC address */}
      <div className="form-group">
        <div className='form-title'>MAC address</div>
        <div className='form-field'>
          {device.macAddress}
        </div>
      </div>
      {/* Uptime */}
      <div className="form-group">
        <div className='form-title'>Uptime</div>
        <div className='form-field'>
          {device.uptime}
        </div>
      </div>
      {/* Public IPv4 address */}
      <div className="form-group">
        <div className='form-title'>Public IPv4 address</div>
        <div className='form-field'>
          {device.localIp}
        </div>
      </div>
    </>
  );
}

export default Information;