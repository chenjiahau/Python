import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// UI

// Component
import {
  ButtonAction, Button, Checkbox, LinkerWithA, PaginationContainer,
  InputWithIcon, DropdownWithCheckbox, InlineTitle, RadioButton
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

const defaultFieldList = [
  { title: 'All', key: 'all', checked: true, isAll: true },
  { title: 'Policy type', key: 'policyType', checked: true },
  { title: 'Interface', key: 'interface', checked: true },
  { title: 'Management type', key: 'managementType', checked: true },
  { title: 'Priority', key: 'priority', checked: true },
  { title: 'Service', key: 'service', checked: true },
  { title: 'Traffic selector', key: 'trafficSelector', checked: true },
  { title: 'Schedule', key: 'schedule', checked: true },
];

const policyTypeDefinition = [
  { title: 'Outbound', value: 'Outbound', isActive: false },
  { title: 'Inbound', value: 'Inbound', isActive: false },
];

const managementTypeDefinition = [
  { title: 'Priority', value: 'Priority', isActive: false },
  { title: 'Rate', value: 'Rate', isActive: false },
];

const priorityDefinition = [
  { title: 'High', value: 'High', isActive: false },
  { title: 'Medium', value: 'Medium', isActive: false },
  { title: 'Low', value: 'Low', isActive: false },
];

const serviceDefinition = [
  { title: 'Any', value: 'Any', isActive: false },
  { title: 'AIM', value: 'AIM', isActive: false },
  { title: 'BGP', value: 'BGP', isActive: false },
  { title: 'BOOTP_CLIENT', value: 'BOOTP_CLIENT', isActive: false },
  { title: 'BOOTP_SERVER', value: 'BOOTP_SERVER', isActive: false },
];

const trafficSelectorMatchTypeDefinition = [
  { title: 'IP address', value: 'IP address', isActive: false },
  { title: 'MAC address', value: 'MAC address', isActive: false },
  { title: 'Interface', value: 'Interface', isActive: false },
];

const Ipv4TrafficShaping = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: trafficManagementState } = useContext(TrafficManagementContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [fieldList, setFieldList] = useState(cloneDeep(defaultFieldList));
  const [wanList, setWanList] = useState([]);
  const [vlanList, setVlanList] = useState([]);
  const [schedulePolicyList, setSchedulePolicyList] = useState([]);
  const [list, setList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeField = (field) => {
    let isCheckedAll = checkedAllState(fieldList);
    const updatedFieldList = cloneDeep(fieldList);

    if (field.key === 'all') {
      for (const f of updatedFieldList) {
        f['checked'] = !isCheckedAll;
      }
    } else {
      for (const f of updatedFieldList) {
        if (f.key === field.key) {
          f.checked = !f.checked;
        }
      }
    }

    updatedFieldList[0].checked = checkedAllState(updatedFieldList);
    setFieldList(updatedFieldList);
  }

  const getVisibleFieldState = (key) => {
    let state = true;
    for (const field of fieldList) {
      if (field.key === key) {
        state = field.checked;
      }
    }

    return state;
  }

  const changeActive = (index, state) => {
    const updatedList = cloneDeep(list);
    updatedList[index].active = state;
    setList(updatedList);
  };

  // Side effect
  useEffect(() => {
    if (
      trafficManagementState.wan.length === 0
      || trafficManagementState.vlan.length === 0
      || trafficManagementState.schedulePolicy.length === 0
    ) {
      return;
    }

    setWanList(trafficManagementState.wan);
    setVlanList(trafficManagementState.vlan);
    setSchedulePolicyList(trafficManagementState.schedulePolicy);

    const updatedList = cloneDeep(trafficManagementState.ipv4TrafficShaping);
    setList(cloneDeep(updatedList));
    setProfileList(cloneDeep(updatedList));
  }, [trafficManagementState.ipv4TrafficShaping]);

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
      <Func title='IPV4 TRAFFIC SHAPING'>
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
            <InlineTitle isNonUnderline>
              <InputWithIcon
                type='search'
                iconPosition='left'
                iconClassName='icon-search'
                value={''}
                onChange={e => { }}
                onClick={() => { }}
                onBlur={() => { }}
              />
              <DropdownWithCheckbox
                id='ipv4-traffic-shaping-field-dropdown'
                type='checkbox'
                isJiugonggeLabel={true}
                isLastElement={true}
                itemList={fieldList}
                onChange={item => changeField(item)}
              />
            </InlineTitle>
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
                        id='ipv4-traffic-shaping-all'
                        type='checkbox'
                        checked={checkedAllState(list.filter(item => !item.isDefault))}
                        onChange={e => toggleCheckedAll(list, setList)}
                      />
                    </th>
                  )
                }
                <th>#</th>
                <th>
                  {
                    getVisibleFieldState('name') && (
                      <>
                        <LinkerWithA
                          label='Name'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'name', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'name', setList);
                          }}
                        />
                      </>
                    )
                  }
                </th>
                <th>
                  {
                    getVisibleFieldState('policyType') && (
                      <>
                        <LinkerWithA
                          label='Policy type'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'policyType', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'policyType', setList);
                          }}
                        />
                      </>
                    )
                  }
                </th>
                <th>
                  {
                    getVisibleFieldState('interface') && (
                      <>
                        <LinkerWithA
                          label='Interface'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'interface', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'interface', setList);
                          }}
                        />
                      </>
                    )
                  }
                </th>
                <th>
                  {
                    getVisibleFieldState('managementType') && (
                      <>
                        <LinkerWithA
                          label='Management type'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'managementType', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'managementType', setList);
                          }}
                        />
                      </>
                    )
                  }
                </th>
                <th>
                  {
                    getVisibleFieldState('priority') && (
                      <>
                        <LinkerWithA
                          label='Priority'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'priority', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'priority', setList);
                          }}
                        />
                      </>
                    )
                  }
                </th>
                <th>
                  {
                    getVisibleFieldState('bandwidthRate') && (
                      <>
                        <LinkerWithA
                          label='Bandwidth rate'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'bandwidthRate', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'bandwidthRate', setList);
                          }}
                        />
                      </>
                    )
                  }
                </th>
                <th>
                  {
                    getVisibleFieldState('service') && (
                      <>
                        <LinkerWithA
                          label='Service'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'service', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'service', setList);
                          }}
                        />
                      </>
                    )
                  }
                </th>
                <th>
                  {
                    getVisibleFieldState('trafficSelectorMatchType') && (
                      <>
                        <LinkerWithA
                          label='Traffic selector match type'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'trafficSelectorMatchType', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'trafficSelectorMatchType', setList);
                          }}
                        />
                      </>
                    )
                  }
                </th>
                <th>
                  {
                    getVisibleFieldState('schedule') && (
                      <>
                        <LinkerWithA
                          label='Schedule'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'schedule', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'schedule', setList);
                          }}
                        />
                      </>
                    )
                  }
                </th>
                <th>
                  <LinkerWithA
                    label='Active'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'active', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'active', setList);
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
                                  id={`ipv4-traffic-shaping-${index}`}
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
                      <td>
                        {
                          getVisibleFieldState('policyType') && (
                            <>
                              {item.policyType}
                            </>
                          )
                        }
                      </td>
                      <td>
                        {
                          getVisibleFieldState('interface') && (
                            <>
                              {item.interface}
                            </>
                          )
                        }
                      </td>
                      <td>
                        {
                          getVisibleFieldState('managementType') && (
                            <>
                              {item.managementType}
                            </>
                          )
                        }
                      </td>
                      <td>
                        {
                          getVisibleFieldState('priority') && (
                            <>
                              {item.priority}
                            </>
                          )
                        }
                      </td>
                      <td>{item.bandwidthRate}</td>
                      <td>
                        {
                          getVisibleFieldState('service') && (
                            <>
                              {item.service}
                            </>
                          )
                        }
                      </td>
                      <td>
                        {
                          getVisibleFieldState('trafficSelectorMatchType') && (
                            <>
                              {item.trafficSelectorMatchType}
                            </>
                          )
                        }
                      </td>
                      <td>
                        {
                          getVisibleFieldState('schedule') && (
                            <>
                              {item.schedule}
                            </>
                          )
                        }
                      </td>
                      <td className='input'>
                        {
                          !isUseProfileConfig ? (
                            <>
                              <div className='d-flex'>
                                <RadioButton
                                  id={`ipv4-traffic-shaping-active-${index}-enable`}
                                  name={`ipv4TrafficShapingActive${index}`}
                                  label='Enable'
                                  hasRightMargin={true}
                                  checked={item.active}
                                  onChange={() => changeActive(index, true)}
                                />
                                <RadioButton
                                  id={`ipv4-traffic-shaping-active-${index}-disable`}
                                  name={`ipv4TrafficShapingActive${index}`}
                                  label='Disable'
                                  checked={!item.active}
                                  onChange={() => changeActive(index, false)}
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              {item.active ? 'Enabled' : 'Disabled'}
                            </>
                          )
                        }
                      </td>
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
        policyTypeDefinition={policyTypeDefinition}
        managementTypeDefinition={managementTypeDefinition}
        priorityDefinition={priorityDefinition}
        serviceDefinition={serviceDefinition}
        trafficSelectorMatchTypeDefinition={trafficSelectorMatchTypeDefinition}
        wanList={wanList}
        vlanList={vlanList}
        schedulePolicyList={schedulePolicyList}
      />

      <EditModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        policyTypeDefinition={policyTypeDefinition}
        managementTypeDefinition={managementTypeDefinition}
        priorityDefinition={priorityDefinition}
        serviceDefinition={serviceDefinition}
        trafficSelectorMatchTypeDefinition={trafficSelectorMatchTypeDefinition}
        wanList={wanList}
        vlanList={vlanList}
        schedulePolicyList={schedulePolicyList}
        selectedConfig={selectedConfig}
      />
    </>
  )
}

export default Ipv4TrafficShaping;