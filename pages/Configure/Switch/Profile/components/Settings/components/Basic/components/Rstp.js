import mainStyle from '../../../settings.module.scss';

import { useState, useEffect } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { TooltipDialog, RadioButton, Button, Checkbox, ButtonAction } from 'components/';

import AddBridgePriorityModal from './modals/AddBridgePriorityModal';
import ChangeBridgePriorityModal from './modals/ChangeBridgePriorityModal';

// Fake data
import { generateRstpData } from 'dummy/data/switch/basic/rstp';
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';
import { getChangeValueFn } from 'dummy/utils/changeValue';

// Util
import { calculateHeightOfMaskContainer } from 'utils/dom';

const defaultModalStatus = {
  addPriority: {
    self: 'addPriority',
    status: false,
  },
  changePriority: {
    self: 'changePriority',
    status: false,
  },
};

const defaultBridgePriorityList = [
  { title: '0-likedly root', isActive: false },
  { title: '4096', isActive: false },
  { title: '8192', isActive: false },
  { title: '12288', isActive: false },
  { title: '16384', isActive: false },
  { title: '20480', isActive: false },
  { title: '24576', isActive: false },
  { title: '28672', isActive: false },
  { title: '32768-default', isActive: false },
  { title: '36864', isActive: false },
  { title: '40960', isActive: false },
  { title: '45056', isActive: false },
  { title: '49152', isActive: false },
  { title: '53248', isActive: false },
  { title: '57344', isActive: false },
  { title: '61440', isActive: false },
];

const Rstp = () => {

  // Fake data
  const fakeRstp = generateRstpData();

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [form, setForm] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState({
    index: 0,
    priority: null
  });

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);
  const changeValue = getChangeValueFn(form, setForm);

  // Side effect
  useEffect(() => {
    const updatedForm = {
      rstpEnablingState: {
        value: fakeRstp.rstpGlobalSettings,
      },
      rstpPriorityList: []
    };

    for (let index in fakeRstp.rstpBridgePriorityList) {
      const list = cloneDeep(defaultBridgePriorityList);

      for (const item of list) {
        if (item.title === fakeRstp.rstpBridgePriorityList[index].bridgePriority) {
          item.isActive = true;
          break;
        }
      }

      updatedForm.rstpPriorityList.push({
        switch: fakeRstp.rstpBridgePriorityList[index].switch,
        bridgePriority: {
          selected: list.find(item => item.isActive === true),
          list,
          isChecked: false
        }
      });
    }

    setForm(updatedForm);
  }, []);

  useEffect(() => {
    if (!form) {
      return;
    }

    const maskDom = document.querySelector('#rstp-mask-container-parent');
    const tableDom = document.querySelector('#rstp-priority-table');

    // Calculate height of mask container
    calculateHeightOfMaskContainer(maskDom, tableDom, 34);
  }, [form]);

  if (!form) {
    return;
  }

  return (
    <>
      <div className='text-title'>RSTP CONFIGURATION</div>
      <div className={mainStyle['detail']} >
        {/* RSTP global settings */}
        <div className='form-title'>
          RSTP global settings
          <TooltipDialog
            className='ms-1 me-1'
            placement='auto'
            title="Enabling RSTP (802.1w) will prevent switch loops and will allow redundant links between switches.If enabled, RSTP will automatically be active on all switches in the current network. Access ports will bypass the learning state and immediately go into a forwarding state."
          />
        </div>
        <div className={`${mainStyle['two-column-block']}`}>
          <div className='form-field--horizontal'>
            <RadioButton
              id='enableRstp'
              name='rstpEnablingState'
              label="Enable"
              checked={form.rstpEnablingState.value}
              onChange={() => changeValue('rstpEnablingState', true)}
            />
            <div style={{ width: '20px' }}></div>
            <RadioButton
              id='disableRstp'
              name='rstpEnablingState'
              label="Disable"
              checked={!form.rstpEnablingState.value}
              onChange={() => changeValue('rstpEnablingState', false)}
            />
          </div>
        </div>

        {/* RSTP bridge priority */}
        <div id="rstp-mask-container-parent" className='mask-parent'>
          <div className={`${form.rstpEnablingState.value ? '' : 'mask-container'}`}>
            <div className='form-title mt-1'>
              RSTP bridge priority
              <TooltipDialog
                className='ms-1 me-1'
                placement='auto'
                title="RSTP Bridge Priority is one of the two parameters used to select the Root Bridge switch. The other parameter is system’s MAC address. The switch with the lowest priority will become the root bridge switch (MAC address is the tiebreaker). In other words, if the priority of all switches is the same, the switch with lowest MAC address will become the root bridge switch."
              />
            </div>
          </div>
          {!form.rstpEnablingState.value && <div className='mask-container-overlay'></div>}
        </div>
        <div id="rstp-mask-container-parent" className='mask-parent'>
          <div className={`${form.rstpEnablingState.value ? '' : 'mask-container'}`}>
            <div className={mainStyle['block']}>
              <ButtonGroup>
                <Button
                  label='Add'
                  disabled={!form.rstpEnablingState.value}
                  onClick={() => changeModalStatus(modalStatus.addPriority.self, true)}
                />
                <Button
                  label='Delete'
                  disabled={!form.rstpEnablingState.value || !checkAtleastOneChecked(form.rstpPriorityList)}
                  onClick={() => { }}
                />
              </ButtonGroup>
            </div>
            <div className={`${mainStyle['one-column-block']}`}>
              <div id="rstp-priority-table" className="table-responsive" style={{ maxHeight: '300px' }}>
                <Table
                  striped
                  hover
                  className="table-container table-container--disable-sort"
                  style={{ overflowY: 'auto' }}
                >
                  <thead>
                    <tr>
                      <th width='5%'>
                        <Checkbox
                          id='checkall-priority'
                          type='checkbox'
                          checked={checkedAllState(form.rstpPriorityList)}
                          onChange={e => { }}
                        />
                      </th>
                      <th width='5%'>#</th>
                      <th width='50%'>Switch</th>
                      <th width='25%'>Bridge Priority</th>
                      <th width='15%' className={'table-action-th'}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      form.rstpPriorityList.map((priority, index) => {
                        return (
                          <tr key={`rstp-priority-${index}`}>
                            <td>
                              <Checkbox
                                id={`check-priority-${index}`}
                                type='checkbox'
                                checked={priority.checked}
                                onChange={e => { }}
                              />
                            </td>
                            <td>{index + 1}</td>
                            <td>{priority.switch}</td>
                            <td>
                              <Button
                                label={priority.bridgePriority.selected.title}
                                className='btn-grey-blue'
                                style={{ width: '100%' }}
                                onClick={() => {
                                  setSelectedPriority({
                                    index,
                                    priority
                                  });
                                  changeModalStatus(modalStatus.changePriority.self, true)
                                }}
                              />
                            </td>
                            <td className={'table-action-td'}>
                              <ButtonAction
                                label="DELETE"
                                title="DELETE"
                                iconClassName="icon-trash"
                                onClick={() => { }}
                              />
                            </td>
                          </tr>
                        )
                      })
                    }
                    <tr className='table-active'>
                      <td></td>
                      <td></td>
                      <td>Default</td>
                      <td>32768</td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          {!form.rstpEnablingState.value && <div className='mask-container-overlay'></div>}
        </div>
      </div >

      <AddBridgePriorityModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <ChangeBridgePriorityModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedPriority={selectedPriority}
        callback={(index, item) => {
          const updatedForm = { ...form };
          updatedForm.rstpPriorityList[selectedPriority.index].bridgePriority.selected = item;
          updatedForm.rstpPriorityList[selectedPriority.index].bridgePriority.list.forEach((listItem, listIndex) => {
            if (listIndex === index) {
              listItem.checked = true;
            } else {
              listItem.checked = false;
            }
          });

          setForm(updatedForm);
        }}
      />
    </>
  )
}

export default Rstp;