
import firmwareUpgradesStyle from '../firmware-upgrades.module.css';

import { useState , useCallback } from 'react';
import { Table , ButtonGroup} from 'react-bootstrap';
import { cloneDeep } from 'lodash';


import Button from 'components/Button';
import DropdownWithItem from 'components/DropdownWithItem';
import Icon from 'components/Icon';
import DropdownWithCheckbox from 'components/DropdownWithCheckbox';
import InputWithUploadButton from 'components/InputWithUploadButton';

import TooltipDialog from 'components/TooltipDialog';

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
  { type: 'all' , checked:false },
  { type: 'first' ,checked:false },
  { type: 'second' ,checked:false },
  { type: 'third' ,checked:false }
];


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


const BulkUpgrades  = () => {
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });
  const [checkboxlist, setCheckboxlist] = useState(defaultCheckboxlist);
  const [selectedDeviceModal, setDeviceModal] = useState({...defaultDeviceList[0].list[0]});
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);
  const [portList2, setPortList2] = useState(cloneDeep(defaultPortList));

  const sorting = e => {
    // NEED TO DO : put this into public function.
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  const changeCheckbox = (type, value) => {
    const newCheckboxlist = [...checkboxlist]
    if (type === 'all') {
      for (let item of newCheckboxlist) {
        item.checked = value;
      }
      setCheckboxlist(newCheckboxlist);
    }
    else {
      for (let item of newCheckboxlist) {
        if (item.type === type) {
          item.checked = value;
        }
      }
      if (newCheckboxlist[1].checked && newCheckboxlist[2].checked && newCheckboxlist[3].checked){
        newCheckboxlist[0].checked = true
      }else {
        newCheckboxlist[0].checked = false
      }
      setCheckboxlist(newCheckboxlist);
    }
  }
  const checkDeleteDisabeled = () => {
    const result = checkboxlist.some(item => item.checked === true);
    return !result
  }

  return (
    <div className="layout-container layout-container--column layout-container--fluid tab-container-border">
      <div className={`${firmwareUpgradesStyle['topBoxsArea']}`}>
        <div className={`${firmwareUpgradesStyle['topFWCard-frame']}`}>
          <div className={`${firmwareUpgradesStyle['topFWCard-MSP']}`}>
            <div className={`${firmwareUpgradesStyle['detail-body-FW-MSP-l']}`}>
              <div className={`${firmwareUpgradesStyle['top-title-row']}`}>
                <div className={`${firmwareUpgradesStyle['top-title']}`} >
                  <Icon
                    className="icon-download mx-2"
                    style={{ width: 28, height: 28 }}
                  />
                  Download the scheduled upgrades
                </div>
                <hr></hr>
                <div className="row">
                  <div className="form-group">
                    <div className="form-field">
                      <em>
                      Generate the scheduled upgrades for all or specific organizations. You may reschedule the firmware upgrades by uploading the modified file.
                      </em>
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <div className="form-title">Model name :</div>
                    <div className="form-field">
                      <div style={{width: '180px'}}>
                        <DropdownWithItem
                          id='device-model-dropdown'
                          type='device'
                          selectedItem={selectedDeviceModal}
                          itemList={defaultDeviceList}
                          onClick={ list => setDeviceModal({...list})}
                        />
                      </div>
                     </div>
                  </div>
                  <div className="form-group mt-2">
                    <div className="form-title">
                      Firmware availability :
                      <TooltipDialog
                        className="ms-2"
                        placement="right"
                        title="Current device version compared to server latest version"
                      ></TooltipDialog>
                    </div>
                    <div className="form-field">
                      <div style={{width: '180px'}}>
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
                  <div className="form-group mt-2">
                    <div className="form-field">
                      <Button
                        label="Generate"
                        className="btn-grey-blue"
                        onClick={() => changeModalStatus('add', false)}
                      />
                      <Button
                        label="Download"
                        className="btn-grey-blue mx-4"
                        onClick={() => changeModalStatus('add', false)}
                      />
                    </div>
                  </div>




                </div>
              </div>

            </div>
          </div>
           <div className={`${firmwareUpgradesStyle['topFWCard-MSP']}`}>
           <div className={`${firmwareUpgradesStyle['detail-body-FW-MSP-r']}`}>
              <div className={`${firmwareUpgradesStyle['top-title-row']}`}>
                <div className={`${firmwareUpgradesStyle['top-title']}`} >
                  <Icon
                    className="icon-download mx-2"
                    style={{ width: 28, height: 28 }}
                  />
                  Download the scheduled upgrades
                </div>
                <hr></hr>
                <div className="row">
                  <div className="form-group">
                    <div className="form-field">
                      <em>
                      Upload the downloaded scheduled upgrades to schedule firmware upgrades.You may upload up to 5,000 devices at one time.
                      </em>
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <div className="form-field">
                      <div style={{width:'460px', float: 'left'}}>
                        <InputWithUploadButton value={''} onChange={() => {}} />
                      </div>
                      <div>
                        <Button
                          label='Upload Image'
                          className='btn-grey-blue mx-2'
                          onClick={() => {}}
                          style={{float: 'left'}}
                        />
                      </div>
                     </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BulkUpgrades;