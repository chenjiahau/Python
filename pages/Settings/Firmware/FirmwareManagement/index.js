
import { useState , useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';


import DropdownWithItem from 'components/DropdownWithItem';
import ButtonWithIcon from 'components/ButtonWithIcon';
import DropdownWithCheckbox from 'components/DropdownWithCheckbox';

import FirmwareManagementTable from './FirmwareManagementTable';


const defaultDeviceList = [
  {
    index: 1,
    parentId: 1,
    name: 'AccessPoints',
    checked: false,
    title: '130d9e4fb0',
    level: 'first',
    list:[
      {title: 'DBA-1210p', checked: false, level: 'second', customKey: 'Access', parentId: 1},
      {title: 'DBA-1510p', checked: false, level: 'second', customKey: 'Access', parentId: 1},
      {title: 'DBA-1520p', checked: false, level: 'second', customKey: 'Access', parentId: 1},
    ],
  },
  {
    index: 2,
    parentId: 2,
    name: 'Switches',
    title: '0052efad5d',
    checked: false,
    level: 'first',
    list:[
      {title: 'DBS-2000', checked: false, level: 'second', customKey: 'Switches', parentId: 2},
    ],
  },
  {
    index: 3,
    parentId: 3,
    name: 'Gateway',
    title: '926dec9494',
    checked: false,
    level: 'first',
    list:[
      {title: 'DBG-2000', checked: false, level: 'second', customKey: 'Gateway', parentId: 3},
      {title: 'DBG-2000(B1)', checked: false, level: 'second', customKey: 'Gateway', parentId: 3},
      {title: 'DBG-X1000', checked: false, level: 'second', customKey: 'Gateway', parentId: 3},
    ],
  }
];

const defaultPortList = [
  { title: 'Update available', checked: false },
  { title: 'Up to date', checked: false },
];

const FirmwareManagement = () => {
  const [preview, setPreview] = useState(false);
  const [selectedDeviceModal, setDeviceModal] = useState({...defaultDeviceList[0].list[0]});
  const [portList2, setPortList2] = useState(cloneDeep(defaultPortList));
  const [deviceList2, setdeviceList2] = useState(cloneDeep(defaultDeviceList));
  const [selectedDeviceCount, setSelectedDeviceCount] = useState(0);
  const [isDeviceToggleAll, setIsDeviceToggleAll] = useState(false);

  const sorting = e => {
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  const changeCheckbox = (list) => {
    console.log ('list',list)
  }
  useEffect(() => {
    let newList = [...deviceList2[0].list, ...deviceList2[1].list, ...deviceList2[2].list,]
    const nweSelectedDeviceCount = newList.filter(item => !item.isAll && item.checked).length;
    setSelectedDeviceCount(nweSelectedDeviceCount)

    const newIsDeviceToggleAll = newList.every(item => item.checked===true);
    setIsDeviceToggleAll(newIsDeviceToggleAll)
  }, [deviceList2]);

  return (
    <div className="layout-container layout-container--column layout-container--fluidr">
      <div className='form-group' style={{display: 'inline-block', width: '180px'}}>
        <div className='form-title mb-2'>Device model :</div>
        <div style={{width: '160px',height:'auto'}}>
          <DropdownWithCheckbox
            allMode = {true}
            label='c7d0b2bf4f'
            id='device-model-dropdown-1'
            type='checkbox'
            itemList={deviceList2}
            dropdownType = 'three'
            onChangeAll={isToggleAll => {
              const defaultDeviceList2 = cloneDeep(defaultDeviceList);
              defaultDeviceList2.forEach(deviceItem => {
                deviceItem.checked = isToggleAll
                deviceItem.list.forEach( item => {
                  item.checked = isToggleAll
                });
              });
              setdeviceList2(defaultDeviceList2);
            }}
            onChangeLevel1={(item, checked) => {
              if (item.level === 'first') {
                const defaultDeviceList2 = cloneDeep(deviceList2);
                defaultDeviceList2.forEach((deviceItem,index) => {
                  if (deviceItem.index === item.index){
                    deviceItem.checked = checked
                    deviceItem.list.forEach(item => {
                      item.checked = checked
                    });
                  }
                });
                setdeviceList2(defaultDeviceList2);

              }
              if (item.level === 'second') {
                const defaultDeviceList2 = cloneDeep(deviceList2);
                console.log ('defaultDeviceList2',defaultDeviceList2)
                defaultDeviceList2.forEach((deviceItem,index) => {
                  if (deviceItem.parentId === item.parentId){
                    deviceItem.list.forEach(subItem => {
                      if (subItem.title === item.title ){
                        subItem.checked = checked
                      }
                    });
                    let newList = [...defaultDeviceList2[index].list]
                    console.log ('newList',newList)
                    const newListAll = newList.every(item => item.checked===true);
                    if (newListAll){
                      deviceItem.checked = true
                    }
                    else {
                      deviceItem.checked = false
                    }
                  }
                });
                setdeviceList2(defaultDeviceList2);
              }

            }}
            selectedTargetCount = {selectedDeviceCount}
            isTargetToggleAll = {isDeviceToggleAll}
          />
        </div>
      </div>
      <div className='form-group' style={{display: 'inline-block', width: '180px', height:'auto'}}>
        <div className='form-title mb-2'>Firmware availability : </div>
        <div className="form-field">
          <div style={{width: '160px'}}>
            <DropdownWithCheckbox
              allMode={true}
              label='c7d0b2bf4f'
              id='port-list-dropdown-3'
              type='checkbox'
              subType= 'right'
              extendLiClassName="ms-4"
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
      <ButtonWithIcon
        label='Preview'
        iconClassName="icon-preview"
        onClick={() => setPreview(true)}
        style={{width:'110px', hight:'28px',}}
        className='me-3'
      ></ButtonWithIcon>
      <ButtonWithIcon
        label='Download'
        iconClassName='icon-download'
        onClick={() => {}}
      ></ButtonWithIcon>
      {preview && <FirmwareManagementTable></FirmwareManagementTable>}
    </div>
  );
};

export default FirmwareManagement;
