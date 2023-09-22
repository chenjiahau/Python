
import { useState , useCallback } from 'react';
import { Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';


import DropdownWithItem from 'components/DropdownWithItem';
import DropdownWithCheckbox from 'components/DropdownWithCheckbox';
import TooltipDialog from 'components/TooltipDialog';
import Button from 'components/Button';

import GenerateModal from './modals/GenerateModal';

const defaultModalStatus = {
  generate: {
    status: false,
    disabled: false,
  }
};

const defaultDeviceList = [
  {
    index: 1,
    name: 'Access Points',
    title: '130d9e4fb0',
    list:[
      {title: 'DBA-1210p'},
      {title: 'DBA-1510p'},
      {title: 'DBA-1520p'},
    ],
  },
  {
    index: 2,
    name: 'Switches',
    title: '0052efad5d',
    list:[
      {title: 'DBS-2000'},
    ],
  },
  {
    index: 3,
    name: 'Gateway',
    title: '926dec9494',
    list:[
      {title: 'DBG-2000'},
      {title: 'DBG-2000(B1)'},
      {title: 'DBG-X1000'},
    ],
  },
];

const defaultPortList = [
  { title: 'Update available', checked: false },
  { title: 'Up to date', checked: false },
];

const FirmwareManagement = () => {
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });
  const [selectedDeviceModal, setDeviceModal] = useState({...defaultDeviceList[0].list[0]});
  const [portList2, setPortList2] = useState(cloneDeep(defaultPortList));

  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);


  return (
    <div className="layout-container layout-container--column layout-container--fluidr">
      <div className='form-group' style={{display: 'inline-block', width: '180px'}}>
        <div className='form-title mb-2'>Device model :</div>
        <div style={{width: '160px'}}>
          <DropdownWithItem
            id='device-model-dropdown'
            type='device'
            selectedItem={selectedDeviceModal}
            itemList={defaultDeviceList}
            onClick={ list => setDeviceModal({...list})}
          />
        </div>
      </div>
      <div className='form-group' style={{display: 'inline-block', width: '180px'}}>
        <div className='form-title mb-2'>Firmware availability : </div>
        <div className="form-field">
          <div style={{width: '160px'}}>
            <DropdownWithCheckbox
              allMode={true}
              label='c7d0b2bf4f'
              id='port-list-dropdown-3'
              type='checkbox'
              subType= 'right'
              itemList={portList2}
              onChangeAll={isToggleAll => {
                const tmpPortList2 = cloneDeep(portList2);
                tmpPortList2.forEach(portItem => {
                  portItem.checked = isToggleAll;
                });
                setPortList2(tmpPortList2);
              }}
              onChange={item => {
                const tmpPortList2 = cloneDeep(portList2);
                tmpPortList2.forEach(portItem => {
                  if(portItem.title === item.title){
                    portItem.checked = !portItem.checked;
                  }
                });
                setPortList2(tmpPortList2);
              }}
            />
          </div>
        </div>
      </div>
      <Button
        label='Generate'
        className='me-3'
        onClick={() => changeModalStatus('generate', true)}
        style={{width:'110px',hight:'28px',}}
      />
      <Button
        label='Download'
        className='me-3'
        onClick={() => {}}
        style={{width:'110px',hight:'28px',}}
      />
      <TooltipDialog
        className="ms-2"
        placement="right"
        title="Click Generate to prepare the file to download. It may take few minutes to generate the file. You will receive an email from the Nuclias Cloud team once the file is ready to download."

      ></TooltipDialog>

      <GenerateModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </div>
  );
};

export default FirmwareManagement;
