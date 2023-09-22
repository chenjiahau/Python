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

import AddModal from './AddModal';
import EditModal from './EditModal';

// Context
import { ConfigContext } from '../../../../../../Context';
import { TrafficManagementContext } from '../../Context';

// Dummy data
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';

const defaultModalStatus = {
  addConfig: {
    self: 'addConfig',
    status: false
  },
  editConfig: {
    self: 'editConfig',
    status: false
  },
  deleteConfig: {
    self: 'deleteConfig',
    status: false
  },
};

const sourceTypeDefinition = [
  { title: 'IP address', value: 'IP address', isActive: false },
  { title: 'IP range', value: 'IP range', isActive: false },
  { title: 'Interface', value: 'Interface', isActive: false },
];

const Ipv4SessionLimit = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: trafficManagementState } = useContext(TrafficManagementContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [vlanList, setVlanList] = useState([]);
  const [schedulePolicyList, setSchedulePolicyList] = useState([]);
  const [list, setList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  // Side effect
  useEffect(() => {
    if (
      trafficManagementState.vlan.length === 0
      || trafficManagementState.schedulePolicy.length === 0
    ) {
      return;
    }

    setVlanList(trafficManagementState.vlan);
    setSchedulePolicyList(trafficManagementState.schedulePolicy);

    const updatedList = cloneDeep(trafficManagementState.ipv4SessionLimiting);
    setList(cloneDeep(updatedList));
    setProfileList(cloneDeep(updatedList));
  }, [trafficManagementState.ipv4SessionLimiting]);

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
      <Func title='IPV4 SESSION LIMIT'>
        <div className='mb-2'>
          <div className='justify-content-between d-flex'>
            <ButtonGroup>
              {
                !isUseProfileConfig && (
                  <>
                    <Button
                      label='Add'
                      onClick={() => {
                        setSelectedConfig(null);
                        changeModalStatus(modalStatus.addConfig.self, true)
                      }}
                    />
                    <Button
                      label='Delete'
                      disabled={!checkAtleastOneChecked(list)}
                      onClick={() => changeModalStatus(modalStatus.deleteConfig.self, true)}
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
                        id='ipv4-session-limit-all'
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
                    label='Source type'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'sourceType', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'sourceType', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Maximum sessions'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'maximumSessions', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'maximumSessions', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Schedule'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'schedule', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'schedule', setList);
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
                                  id={`ipv4-session-limit-${index}`}
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
                      <td>{item.sourceType}</td>
                      <td>{item.maximumSessions}</td>
                      <td>{item.schedule}</td>
                      {
                        !isUseProfileConfig && (
                          <td className={'table-action-td'}>
                            <ButtonAction
                              label='EDIT'
                              title='EDIT'
                              iconClassName='icon-edit'
                              onClick={() => {
                                setSelectedConfig(item);
                                changeModalStatus(modalStatus.editConfig.self, true)
                              }}
                            />
                            <ButtonAction
                              label='DELETE'
                              title='DELETE'
                              iconClassName='icon-trash'
                              onClick={() => {
                                setSelectedConfig(item);
                                changeModalStatus(modalStatus.editConfig.self, true)
                              }}
                            />
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

      <AddModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        sourceTypeDefinition={sourceTypeDefinition}
        vlanList={vlanList}
        schedulePolicyList={schedulePolicyList}
      />

      <EditModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        sourceTypeDefinition={sourceTypeDefinition}
        vlanList={vlanList}
        schedulePolicyList={schedulePolicyList}
        selectedConfig={selectedConfig}
      />
    </>
  )
}

export default Ipv4SessionLimit;