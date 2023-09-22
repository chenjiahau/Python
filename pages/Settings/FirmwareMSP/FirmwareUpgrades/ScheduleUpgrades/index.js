
import { useState } from 'react';

import DropdownWithItem from 'components/DropdownWithItem';
import ButtonWithIcon from 'components/ButtonWithIcon';

import ScheduleUpgradesTable from './ScheduleUpgradesTable';

const defaultModalStatus = {
  schedule: {
    status: false,
    disabled: false,
  },
  device: {
    status: false,
    disabled: false,
  },
  releaseNote: {
    status: false,
    disabled: false,
  }
};

const defaultCheckboxlist = [
  { type: 'all', checked: false },
  { type: 'first', checked: false },
  { type: 'second', checked: false },
  { type: 'third', checked: false }
];

const defaultDeviceList = [
  {
    index: 1,
    name: 'Access Points',
    title: '130d9e4fb0',
    list: [
      { title: 'DBA-1210p' },
      { title: 'DBA-1510p' },
      { title: 'DBA-1520p' },
    ],
  },
  {
    index: 2,
    name: 'Switches',
    title: '0052efad5d',
    list: [
      { title: 'DBS-2000' },
    ],
  },
  {
    index: 3,
    name: 'Gateway',
    title: '926dec9494',
    list: [
      { title: 'DBG-2000' },
      { title: 'DBG-2000(B1)' },
      { title: 'DBG-X1000' },
    ],
  },
];

const ScheduleUpgrades = () => {
  const [checkboxlist, setCheckboxlist] = useState(defaultCheckboxlist);
  const [preview, setPreview] = useState(false);
  const [selectedDeviceModal, setDeviceModal] = useState({ ...defaultDeviceList[0].list[0] });


  return (
    <div className="layout-container layout-container--column layout-container--fluid tab-container-border">
      <div className='form-group' style={{ display: 'inline-block', width: '200px' }}>
        <div className='form-title mb-2'>Device model :</div>
        <div style={{ width: '180px' }}>
          <DropdownWithItem
            id='device-model-dropdown'
            type='device'
            selectedItem={selectedDeviceModal}
            itemList={defaultDeviceList}
            onClick={list => setDeviceModal({ ...list })}
          />
        </div>
      </div>
      <div className='form-group' style={{ display: 'inline-block' }}>
        <div className='form-title mb-2'>Firmware availability : </div>
        <span className='me-3'>Update available / Up to date</span>
        <ButtonWithIcon
          label='Preview'
          iconClassName="icon-preview"
          onClick={() => setPreview(true)}
          style={{ width: '110px', hight: '28px' }}
        ></ButtonWithIcon>
      </div>
      {preview && <ScheduleUpgradesTable></ScheduleUpgradesTable>}
    </div>
  )
}

export default ScheduleUpgrades;