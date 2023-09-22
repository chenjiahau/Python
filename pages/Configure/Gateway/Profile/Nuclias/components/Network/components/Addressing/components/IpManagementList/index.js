import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// UI

// Component
import {
  ButtonAction, Button, Checkbox, LinkerWithA, PaginationContainer,
  InputWithIcon
} from 'components/';
import Func from '../../../../../Func';

import AddIpModal from './AddIpModal';
import EditIpModal from './EditIpModal';

// Context
import { ConfigContext } from '../../../../../../Context';
import { AddressingContext } from '../../Context';

// Dummy data
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';

const defaultModalStatus = {
  addIp: {
    self: 'addIp',
    status: false
  },
  editIp: {
    self: 'editIp',
    status: false
  },
  deleteIp: {
    self: 'deleteIp',
    status: false
  },
};

const IpManagementList = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: addressingState } = useContext(AddressingContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [vlanList, setVlanList] = useState([]);
  const [list, setList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [selectedIp, setSelectedIp] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  // Side effect
  useEffect(() => {
    if (addressingState.vlan.length === 0) {
      return;
    }

    const updatedVlanList = [];
    addressingState.vlan.forEach(item => {
      updatedVlanList.push({
        title: item.name,
        vlanId: item.vlanId
      });
    });
    setVlanList(updatedVlanList);

    const updatedList = [];
    addressingState.ipManagementList.forEach(item => {
      updatedList.push({
        name: item.name,
        interface: item.interface,
        ipAddress: item.ipAddress,
        macAddress: item.macAddress,
        ipv6Suffix: item.ipv6Suffix,
        ipMacBinding: item.ipMacBinding,
        dhcpIpReservation: item.dhcpIpReservation,
        config: item.config
      });
    });
    setList(updatedList);
  }, [addressingState.ipManagementList]);

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;
  const isUseProfileConfig = !isProfilePath && isNotStandalone;

  let sourceList = null;
  if (isProfilePath) {
    sourceList = list;
  } else {
    sourceList = isNotStandalone ? profileList : list;
  }

  return (
    <>
      <Func title='IP MANAGEMENT LIST'>
        <div className='mb-2'>
          <div className='justify-content-between d-flex'>
            <ButtonGroup>
              {
                !isUseProfileConfig && (
                  <>
                    <Button
                      label='Add'
                      onClick={() => {
                        setSelectedIp(null);
                        changeModalStatus(modalStatus.addIp.self, true)
                      }}
                    />
                    <Button
                      label='Delete'
                      disabled={!checkAtleastOneChecked(list)}
                      onClick={() => changeModalStatus(modalStatus.deleteIp.self, true)}
                    />
                  </>
                )
              }
            </ButtonGroup>
            <InputWithIcon
              type='search'
              iconPosition='left'
              iconClassName='icon-search'
              value={''}
              onChange={e => { }}
              onClick={() => { }}
              onBlur={() => { }}
            />
          </div>
        </div>

        <div className='table-responsive'>
          <Table
            striped
            hover
            className='table-container'
          >
            <thead>
              <tr>
                {
                  !isUseProfileConfig && (
                    <th>
                      <Checkbox
                        id='vlan-all'
                        type='checkbox'
                        checked={checkedAllState(list.filter(item => !item.isDefault))}
                        onChange={e => toggleCheckedAll(list, setList)}
                      />
                    </th>
                  )
                }
                <th>#</th>
                <th>
                  <LinkerWithA
                    label='Name'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'name', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'name', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Interface'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'interface', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'interface', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='IP address'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'ipAddress', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'ipAddress', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='MAC address'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'macAddress', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'macAddress', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='IPv6 suffix'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'ipv6Suffix', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'ipv6Suffix', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='IP-MAC binding'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'ipMacBinding', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'ipMacBinding', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='DHCP IP reservation'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'dhcpIpReservation', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'dhcpIpReservation', setList);
                    }}
                  />
                </th>
                {
                  !isUseProfileConfig && (
                    <th className={'table-action-th'}>Actions</th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                sourceList.map((item, index) => {
                  return (
                    <tr key={index}>
                      {
                        !isUseProfileConfig && (
                          <td>
                            {
                              !item.isDefault && (
                                <Checkbox
                                  id={`ip-${item.index}`}
                                  type='checkbox'
                                  checked={item.checked}
                                  onChange={e => toggleCheckedOne(index, list, setList)}
                                />
                              )
                            }
                          </td>
                        )
                      }
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.interface}</td>
                      <td>{item.ipAddress}</td>
                      <td>{item.macAddress}</td>
                      <td>{item.ipv6Suffix}</td>
                      <td>{item.ipMacBinding ? <>Enabled</> : <>Disabled</>}</td>
                      <td>{item.dhcpIpReservation ? <>Enabled</> : <>Disabled</>}</td>
                      {
                        !isUseProfileConfig && (
                          <td className={'table-action-td'}>
                            <ButtonAction
                              label='EDIT'
                              title='EDIT'
                              iconClassName='icon-edit'
                              onClick={() => {
                                setSelectedIp(item);
                                changeModalStatus(modalStatus.editIp.self, true)
                              }}
                            />
                            {
                              !item.isDefault && (
                                <>
                                  <ButtonAction
                                    label='DELETE'
                                    title='DELETE'
                                    iconClassName='icon-trash'
                                    onClick={() => {
                                      setSelectedIp(item);
                                      changeModalStatus(modalStatus.deleteIp.self, true)
                                    }}
                                  />
                                </>
                              )
                            }
                          </td>
                        )
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>

        <PaginationContainer
          total={sourceList.length}
          onPageChange={currentPageNum =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={currentPageNum =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />
      </Func >

      <AddIpModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        vlanList={vlanList}
      />

      <EditIpModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        vlanList={vlanList}
        selectedIp={selectedIp}
      />
    </>
  )
}

export default IpManagementList;