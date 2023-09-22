import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// UI

// Component
import {
  ButtonAction, Button, Checkbox, LinkerWithA, PaginationContainer,
  InputWithIcon, RadioButton, InlineTitle, DropdownWithCheckbox
} from 'components/';
import Func from '../../../../../Func';

import AddModal from './AddModal';
import EditModal from './EditModal';

// Context
import { ConfigContext } from '../../../../../../Context';
import { FirewallContext } from '../../Context';

// Dummy data
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';

const defaultFieldList = [
  { title: 'All', key: 'all', checked: true, isAll: true },
  { title: 'Source', key: 'source', checked: true },
  { title: 'Source port', key: 'sourcePort', checked: true },
  { title: 'Destination', key: 'destination', checked: true },
  { title: 'Destination port', key: 'destinationPort', checked: true },
  { title: 'Schedule', key: 'schedule', checked: true },
];

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

const policyDefinition = ['Permit', 'Deny'];
const protocolDefinition = ['Any', 'TCP', 'UDP', 'TCP/UDP', 'ICMP'];

const Ipv4FirewallRules = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: firewallState } = useContext(FirewallContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [fields, setFields] = useState(cloneDeep(defaultFieldList));
  const [wans, setWans] = useState([]);
  const [vlans, setVlans] = useState([]);
  const [schedulePolicies, setSchedulePolicies] = useState([]);
  const [list, setList] = useState([]);
  const [sampleList, setSampleList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeField = (field) => {
    let isCheckedAll = checkedAllState(fields);
    const updatedFieldList = cloneDeep(fields);

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
    setFields(updatedFieldList);
  }

  const getVisibleFieldState = (key) => {
    let state = true;
    for (const field of fields) {
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
    if (!firewallState?.ipv4FirewallRules) return
    const updatedWans = [];
    const updatedVlans = [];
    firewallState?.interfaces?.forEach((interfaceItem) => {
      if (interfaceItem.type !== 'vlan') {
        updatedWans.push(interfaceItem);
      } else {
        updatedVlans.push(interfaceItem);
      }
    });
    setWans(updatedWans);
    setVlans(updatedVlans);

    const updatedSchedulePolicies = [];
    firewallState.schedulePolicies?.forEach((schedulePolicy) => {
      updatedSchedulePolicies.push(schedulePolicy);
    });
    setSchedulePolicies(updatedSchedulePolicies);

    const updatedList = [];
    const updatedSampleList = [];
    console.log('firewallState.ipv4FirewallRules', firewallState.ipv4FirewallRules)
    for (const rule of firewallState.ipv4FirewallRules) {
      if (rule.isSample) {
        updatedSampleList.push(rule);
      } else {
        updatedList.push(rule);
      }
    }

    setList(cloneDeep(updatedList));
    setProfileList(cloneDeep(updatedList));
    setSampleList(cloneDeep(updatedSampleList));
  }, [firewallState?.ipv4FirewallRules]);

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
      <Func title='IPV4 FIREWALL RULES'>
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
                id='ipv4-firewall-rules-field-dropdown'
                type='checkbox'
                isJiugonggeLabel={true}
                isLastElement={true}
                itemList={fields}
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
                        id='ipv4-firewall-rules-all'
                        type='checkbox'
                        checked={checkedAllState(list)}
                        onChange={e => toggleCheckedAll(list, setList)}
                      />
                    </th>
                  )
                }
                <th>
                  <LinkerWithA
                    label='Priority'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'priority', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'priority', setList);
                    }}
                  />
                </th>
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
                    label='Policy'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'policy', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'policy', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Protocol'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'protocol', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'protocol', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Source interface'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'sourceInterface', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'sourceInterface', setList);
                    }}
                  />
                </th>
                {
                  getVisibleFieldState('source') && (
                    <>
                      <th>
                        <LinkerWithA
                          label='Source'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'source', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'source', setList);
                          }}
                        />
                      </th>
                    </>
                  )
                }
                {
                  getVisibleFieldState('sourcePort') && (
                    <>
                      <th>
                        <LinkerWithA
                          label='Source port'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'sourcePort', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'sourcePort', setList);
                          }}
                        />
                      </th>
                    </>
                  )
                }
                {
                  getVisibleFieldState('destination') && (
                    <>
                      <th>
                        <LinkerWithA
                          label='Destination'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'destination', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'destination', setList);
                          }}
                        />
                      </th>
                    </>
                  )
                }
                {
                  getVisibleFieldState('destinationPort') && (
                    <>
                      <th>
                        <LinkerWithA
                          label='Destination port'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'destinationPort', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'destinationPort', setList);
                          }}
                        />
                      </th>
                    </>
                  )
                }
                {
                  getVisibleFieldState('schedule') && (
                    <>
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
                    </>
                  )
                }
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
                            <Checkbox
                              id={`ipv4-firewall-rules-${index}`}
                              type='checkbox'
                              checked={item.checked}
                              onChange={e => toggleCheckedOne(index, list, setList)}
                            />
                          </td>
                        )
                      }
                      <td>{item.priority}</td>
                      <td>{item.name}</td>
                      <td>{item.policy}</td>
                      <td>{item.protocol}</td>
                      <td>{item.sourceInterface}</td>
                      {
                        getVisibleFieldState('source') && (
                          <>
                            <td>{item.source}</td>
                          </>
                        )
                      }
                      {
                        getVisibleFieldState('sourcePort') && (
                          <>
                            <td>{item.sourcePort}</td>
                          </>
                        )
                      }
                      {
                        getVisibleFieldState('destination') && (
                          <>
                            <td>{item.destination}</td>
                          </>
                        )
                      }
                      {
                        getVisibleFieldState('destinationPort') && (
                          <>
                            <td>{item.destinationPort}</td>
                          </>
                        )
                      }
                      {
                        getVisibleFieldState('schedule') && (
                          <>
                            <td>{item.schedule}</td>
                          </>
                        )
                      }
                      <td className='input'>
                        {
                          !isUseProfileConfig ? (
                            <>
                              <div className='d-flex'>
                                <RadioButton
                                  id={`ipv4-firewall-rules-active-${index}-enable`}
                                  name={`ipv4FirewallRulesActive${index}`}
                                  label='Enable'
                                  hasRightMargin={true}
                                  checked={item.active}
                                  onChange={() => changeActive(index, true)}
                                />
                                <RadioButton
                                  id={`ipv4-firewall-rules-active-${index}-disable`}
                                  name={`ipv4FirewallRulesActive${index}`}
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
              {
                sampleList.map((item, index) => {
                  return (
                    <tr key={`sample-${index}`}>
                      {
                        !isUseProfileConfig && (
                          <td>
                          </td>
                        )
                      }
                      <td>{item.priority}</td>
                      <td>{item.name}</td>
                      <td>{item.policy}</td>
                      <td>{item.protocol}</td>
                      <td>{item.sourceInterface}</td>
                      {
                        getVisibleFieldState('source') && (
                          <>
                            <td>{item.source}</td>
                          </>
                        )
                      }
                      {
                        getVisibleFieldState('sourcePort') && (
                          <>
                            <td>{item.sourcePort}</td>
                          </>
                        )
                      }
                      {
                        getVisibleFieldState('destination') && (
                          <>
                            <td>{item.destination}</td>
                          </>
                        )
                      }
                      {
                        getVisibleFieldState('destinationPort') && (
                          <>
                            <td>{item.destinationPort}</td>
                          </>
                        )
                      }
                      {
                        getVisibleFieldState('schedule') && (
                          <>
                            <td>{item.schedule}</td>
                          </>
                        )
                      }
                      <td className='input'>
                        {item.active ? 'Enabled' : 'Disabled'}
                      </td>
                      {
                        !isUseProfileConfig && (
                          <td className={'table-action-td'}></td>
                        )
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div >

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
        policyDefinition={policyDefinition}
        protocolDefinition={protocolDefinition}
        wans={wans}
        vlans={vlans}
        schedulePolicies={schedulePolicies}
      />

      <EditModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        policyDefinition={policyDefinition}
        protocolDefinition={protocolDefinition}
        wans={wans}
        vlans={vlans}
        schedulePolicies={schedulePolicies}
        selectedConfig={selectedConfig}
      />
    </>
  )
}

export default Ipv4FirewallRules;