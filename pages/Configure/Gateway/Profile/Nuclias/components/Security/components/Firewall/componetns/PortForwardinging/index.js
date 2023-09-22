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
  { title: 'Interface', key: 'interface', checked: true },
  { title: 'Protocol', key: 'protocol', checked: true },
  { title: 'Public port', key: 'publicPort', checked: true },
  { title: 'Local IP', key: 'localIp', checked: true },
  { title: 'Local Port', key: 'localPort', checked: true },
  { title: 'Allowed remote IPs', key: 'allowedRemoteIps', checked: true },
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

const modeDefinition = ['Forwarding', 'Translation'];
const protocolDefinition = ['TCP', 'UDP', 'TCP/UDP'];

const PortForwarding = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: firewallState } = useContext(FirewallContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [fields, setFields] = useState(cloneDeep(defaultFieldList));
  const [wans, setWans] = useState([]);
  const [vlans, setVlans] = useState([]);
  const [list, setList] = useState([]);
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

    setList(cloneDeep(firewallState.portForwarding));
    setProfileList(cloneDeep(firewallState.portForwarding));
  }, [firewallState.portForwarding]);

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
      <Func title='PORT FORWARDING'>
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
                id='port-forwarding-field-dropdown'
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
                        id='port-forwarding-all'
                        type='checkbox'
                        checked={checkedAllState(list)}
                        onChange={e => toggleCheckedAll(list, setList)}
                      />
                    </th>
                  )
                }
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
                    label='Mode'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'mode', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'mode', setList);
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
                    label='Protocol'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'protocol', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'protocol', setList);
                    }}
                  />
                </th>
                {
                  getVisibleFieldState('publicPort') && (
                    <>
                      <th>
                        <LinkerWithA
                          label='Public port'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'publicPort', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'publicPort', setList);
                          }}
                        />
                      </th>
                    </>
                  )
                }
                {
                  getVisibleFieldState('localIp') && (
                    <>
                      <th>
                        <LinkerWithA
                          label='Local IP'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'localIp', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'localIp', setList);
                          }}
                        />
                      </th>
                    </>
                  )
                }
                {
                  getVisibleFieldState('localPort') && (
                    <>
                      <th>
                        <LinkerWithA
                          label='Local port'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'localPort', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'localPort', setList);
                          }}
                        />
                      </th>
                    </>
                  )
                }
                {
                  getVisibleFieldState('allowedRemoteIps') && (
                    <>
                      <th>
                        <LinkerWithA
                          label='Allowed remote IPs'
                          className='text-decoration-none'
                          onClick={e => {
                            isUseProfileConfig && sorting(e, profileList, 'allowedRemoteIps', setProfileList);
                            !isUseProfileConfig && sorting(e, list, 'allowedRemoteIps', setList);
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
                              id={`port-forwarding-${index}`}
                              type='checkbox'
                              checked={item.checked}
                              onChange={e => toggleCheckedOne(index, list, setList)}
                            />
                          </td>
                        )
                      }
                      <td>{item.name}</td>
                      <td>{item.mode}</td>
                      <td>{item.interface}</td>
                      <td>{item.protocol}</td>
                      {
                        getVisibleFieldState('publicPort') && (
                          <>
                            <td>{item.publicPort}</td>
                          </>
                        )
                      }
                      {
                        getVisibleFieldState('localIp') && (
                          <>
                            <td>{item.localIp}</td>
                          </>
                        )
                      }
                      {
                        getVisibleFieldState('localPort') && (
                          <>
                            <td>{item.localPort}</td>
                          </>
                        )
                      }
                      {
                        getVisibleFieldState('allowedRemoteIps') && (
                          <>
                            <td>
                              {
                                item.allowedRemoteIps === '' ? 'Any' : item.allowedRemoteIps
                              }
                            </td>
                          </>
                        )
                      }
                      <td className='input'>
                        {
                          !isUseProfileConfig ? (
                            <>
                              <div className='d-flex'>
                                <RadioButton
                                  id={`port-forwarding-active-${index}-enable`}
                                  name={`portForwardingActive${index}`}
                                  label='Enable'
                                  hasRightMargin={true}
                                  checked={item.active}
                                  onChange={() => changeActive(index, true)}
                                />
                                <RadioButton
                                  id={`port-forwarding-active-${index}-disable`}
                                  name={`portForwardingActive${index}`}
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
        modeDefinition={modeDefinition}
        protocolDefinition={protocolDefinition}
        wans={wans}
        vlans={vlans}
      />

      <EditModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        modeDefinition={modeDefinition}
        protocolDefinition={protocolDefinition}
        wans={wans}
        vlans={vlans}
        selectedConfig={selectedConfig}
      />
    </>
  )
}

export default PortForwarding;