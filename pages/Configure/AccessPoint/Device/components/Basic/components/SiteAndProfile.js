import mainStyle from '../basic.module.scss';

import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Component
import InlineTitle from 'components/InlineTitle';
import DropdownWithItem from 'components/DropdownWithItem';

const SiteAndProfile = props => {
  const {
    device,
    form,
    changeValue
  } = props;

  return (
    <div>
      <InlineTitle label='SITE AND PROFILE' />
      {/* Sync status */}
      <div className={`form-group ${mainStyle['field']}`}>
        <div className='form-title'>Sync status</div>
        <div className='form-field'>
          {device.syncStatus}
        </div>
      </div>
      {/* Firmware status */}
      <div className={`form-group ${mainStyle['field']}`}>
        <div className='form-title'>Firmware status</div>
        <div className='form-field'>
          <Link to="/cloud/settings/firmware" className='text-decoration-underline'>{device.firmwareStatus}</Link>
        </div>
      </div>
      {/* Firmware version */}
      <div className={`form-group ${mainStyle['field']}`}>
        <div className='form-title'>Firmware version</div>
        <div className='form-field'>
          {device.firmwareVersion}
        </div>
      </div>
      {/* Site */}
      <div className={`form-group ${mainStyle['field']}`}>
        <div className='form-title'>Site</div>
        <div className='form-field form-field--dropdown-middle-width'>
          <DropdownWithItem
            type="normal"
            selectedItem={form.site.selected}
            itemList={form.site.list}
            isMiddleSize={true}
            onClick={site => changeValue('site', site)}
          />
        </div>
      </div>
      {/* Timezone */}
      <div className={`form-group ${mainStyle['field']}`}>
        <div className='form-title'>Timezone</div>
        <div className='form-field'>
          {device.timezone}
        </div>
      </div>
      {/* Profile */}
      <div className={`form-group ${mainStyle['field']}`}>
        <div className='form-title'>Profile</div>
        <div className='form-field form-field--dropdown-middle-width'>
          <DropdownWithItem
            type="normal"
            selectedItem={form.profile.selected}
            itemList={form.profile.list}
            isMiddleSize={true}
            onClick={profile => changeValue('profile', profile)}
          />
        </div>
      </div>
      {/* External syslog server */}
      <div className={`form-group ${mainStyle['field']}`}>
        <div className='form-title'>External syslog server</div>
        <div className='form-field'>
          {device.syslogServer || '-'}
        </div>
      </div>
    </div>
  );
}

export default SiteAndProfile;