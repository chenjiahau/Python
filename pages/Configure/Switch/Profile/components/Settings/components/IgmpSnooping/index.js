import mainStyle from '../../settings.module.scss';

import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep, set } from 'lodash';

// Component
import { Button, Checkbox, DropdownWithItem, ButtonAction } from 'components/';

import AddIgmpSnoopingModal from './modals/AddIgmpSnoopingModal';
import AddIgmpSnoopingVlanModal from './modals/AddIgmpSnoopingVlanModal';
import EditIgmpSnoopingVlanModal from './modals/EditIgmpSnoopingVlanModal';

// Dummy data
import { generateIgmpSnoopingData } from 'dummy/data/switch/igmp-snooping';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

const defaultModalStatus = {
  addIgmpSnooping: {
    self: 'addIgmpSnooping',
    status: false
  },
  addIgmpSnoopingVlan: {
    self: 'addIgmpSnoopingVlan',
    status: false
  },
  editIgmpSnoopingVlan: {
    self: 'editIgmpSnoopingVlan',
    status: false
  }
};

const defaultIgmpSnoopingStateDropdown = [
  { title: 'Enable', isActive: false },
  { title: 'Disable', isActive: false },
];

const IgmpSnooping = () => {
  const navigate = useNavigate();

  // Fake data
  const fakeData = generateIgmpSnoopingData();

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [igmpSnooping, setIgmpSnooping] = useState(null);
  const [igmpSnoopingVlan, setIgmpSnoopingVlan] = useState(null);
  const [selectedIgmpSnooping, setSelectedIgmpSnooping] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const redirectToSwitchPorts = () => {
    navigate('/cloud/configure/switch/switch-ports');
  }

  // Side effect
  useEffect(() => {
    // IGMP snooping
    const updatedIgmpSnooping = cloneDeep(fakeData.igmpSnooping);
    for (const igmpSnooping of updatedIgmpSnooping) {
      const igmpSnoopingStateDropdown = cloneDeep(defaultIgmpSnoopingStateDropdown);

      igmpSnooping.checked = false;
      if (igmpSnooping.state) {
        igmpSnoopingStateDropdown[0].isActive = true;
      } else {
        igmpSnoopingStateDropdown[1].isActive = true;
      }

      igmpSnooping.state = igmpSnoopingStateDropdown;
    }

    setIgmpSnooping(updatedIgmpSnooping);

    // IGMP snooping VLAN
    const updatedIgmpSnoopingVlan = cloneDeep(fakeData.igmpSnoopingVlan);
    for (const igmpSnoopingVlan of updatedIgmpSnoopingVlan) {
      igmpSnoopingVlan.checked = false;
    }

    setIgmpSnoopingVlan(updatedIgmpSnoopingVlan);
  }, []);

  if (!igmpSnooping || !setIgmpSnoopingVlan) {
    return;
  }

  return (
    <>
      <div
        className={`tab-container-border ${mainStyle['access-policy-tab-container']}`}
        style={{ paddingTop: 0 }}
      >

        {/* IGMP snooping */}
        <div className='form-group form-group--align-top'>
          <div className='form-title'>
            IGMP snooping
          </div>
          <div className='form-field'>
            <div className='d-flex justify-content-between mt-4 mb-1'>
              <ButtonGroup>
                <Button
                  label='Add'
                  className='btn-grey'
                  onClick={() => changeModalStatus(modalStatus.addIgmpSnooping.self, true)}
                />
                <Button
                  label='Delete'
                  className='btn-grey'
                  onClick={() => { }}
                  disabled
                />
              </ButtonGroup>
            </div>
            <div className='table-responsive' style={{ overflow: 'visible' }}>
              <Table
                striped
                hover
                className='table-container table-container--disable-sort mt-2'
                style={{ overflowY: 'auto' }}
              >
                <thead>
                  <tr>
                    <th>
                      <Checkbox
                        id='mac-rules-check-all'
                        type='checkbox'
                        checked={false}
                        onChange={e => { }}
                      />
                    </th>
                    <th>#</th>
                    <th>Switch</th>
                    <th style={{ width: '220px' }}>IGMP snooping</th>
                    <th className='table-action-th'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    igmpSnooping.map((igmpSnooping, index) => {
                      return (
                        <tr key={`igmp-snooping-${index}`}>
                          <td>
                            {
                              !igmpSnooping.isDefault && (
                                <Checkbox
                                  id={`check-igmp-snooping-${index}`}
                                  type='checkbox'
                                  checked={igmpSnooping.checked}
                                  onChange={e => { }}
                                />
                              )
                            }

                          </td>
                          <td>
                            {
                              !igmpSnooping.isDefault && (
                                <>
                                  {index + 1}
                                </>
                              )
                            }
                          </td>
                          <td>
                            {igmpSnooping.switch}
                          </td>
                          <td>
                            <DropdownWithItem
                              type='normal'
                              selectedItem={igmpSnooping.state.find(item => item.isActive)}
                              itemList={igmpSnooping.state}
                              onClick={item => { }}
                            />
                          </td>
                          <td className={'table-action-td'}>
                            {
                              !igmpSnooping.isDefault && (
                                <ButtonAction
                                  label='DELETE'
                                  title='DELETE'
                                  iconClassName='icon-trash'
                                  onClick={() => { }}
                                />
                              )
                            }
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        {/* IGMP snooping VLAN settings */}
        <div className='form-group form-group--align-top'>
          <div className='form-title form-group--align-top'>
            IGMP snooping VLAN settings
          </div>
          <div className='form-field' style={{ overflow: 'auto' }}>
            <div className='d-flex justify-content-between mt-4 mb-1'>
              <ButtonGroup>
                <Button
                  label='Add'
                  className='btn-grey'
                  onClick={() => changeModalStatus(modalStatus.addIgmpSnoopingVlan.self, true)}
                />
                <Button
                  label='Delete'
                  className='btn-grey'
                  onClick={() => { }}
                  disabled
                />
              </ButtonGroup>
            </div>
            <div className='table-responsive'>
              <Table
                striped
                hover
                className='table-container table-container--disable-sort mt-2'
                style={{ overflowY: 'auto' }}
              >
                <thead>
                  <tr>
                    <th>
                      <Checkbox
                        id='mac-rules-check-all'
                        type='checkbox'
                        checked={false}
                        onChange={e => { }}
                      />
                    </th>
                    <th>#</th>
                    <th>VLAN ID</th>
                    <th>IGMP snooping</th>
                    <th>Querier state</th>
                    <th>Multicast filtering mode</th>
                    <th>Static Mrouter ports</th>
                    <th className='table-action-th'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    igmpSnoopingVlan.map((igmpSnoopingVlan, index) => {
                      return (
                        <tr key={`igmp-snooping-vlan-${index}`}>
                          <td>
                            <Checkbox
                              id={`check-igmp-snooping-vlan-${index}`}
                              type='checkbox'
                              checked={igmpSnoopingVlan.checked}
                              onChange={e => { }}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{igmpSnoopingVlan.vlanId}</td>
                          <td>{igmpSnoopingVlan.imgpSnooping}</td>
                          <td>{igmpSnoopingVlan.querierState}</td>
                          <td>{igmpSnoopingVlan.multicastFilteringMode}</td>
                          <td>
                            <div>
                              10 Ports: -
                            </div>
                            <div>
                              28 Ports: -
                            </div>
                            <div>
                              52 Ports: -
                            </div>
                          </td>
                          <td className={'table-action-td'}>
                            <ButtonAction
                              label='EDIT'
                              title='EDIT'
                              iconClassName='icon-edit'
                              onClick={() => changeModalStatus(modalStatus.editIgmpSnoopingVlan.self, true)}
                            />
                            <ButtonAction
                              label='DELETE'
                              title='DELETE'
                              iconClassName='icon-trash'
                              onClick={() => { }}
                            />
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
            </div>

          </div>
        </div>
        {/* Dynamic multicast router ports */}
        <div className='form-group mt-3'>
          <div className='form-title form-group--align-top'>
            Dynamic multicast router ports
          </div>
          <div className='form-field'>
            <span className='redirect-to' onClick={redirectToSwitchPorts}>View the detail information</span>
          </div>
        </div>
      </div >

      <AddIgmpSnoopingModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <AddIgmpSnoopingVlanModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <EditIgmpSnoopingVlanModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </>
  )
}

export default IgmpSnooping;