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

const protocolDefinition = ['TCP', 'UDP', 'TCP/UDP'];

const OneCOneNat = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: firewallState } = useContext(FirewallContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [wans, setWans] = useState([]);
  const [list, setList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeActive = (index, state) => {
    const updatedList = cloneDeep(list);
    updatedList[index].active = state;
    setList(updatedList);
  };

  // Side effect
  useEffect(() => {
    if (!firewallState?.oneCOneNat) return;
    const updatedWans = [];
    firewallState?.interfaces?.forEach((interfaceItem) => {
      if (interfaceItem.type !== 'vlan') {
        updatedWans.push(interfaceItem);
      }
    });
    setWans(updatedWans);

    const updatedList = [];

    for (const rule of firewallState.oneCOneNat) {
      updatedList.push(rule);
    }

    setList(cloneDeep(updatedList));
    setProfileList(cloneDeep(updatedList));
  }, [firewallState.oneCOneNat]);

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
      <Func title='1:1 NAT'>
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
                        id='one-c-one-nat-all'
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
                    label='WAN IP'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'wanIp', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'wanIp', setList);
                    }}
                  />
                </th>
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
                    label='Ports'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'ports', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'ports', setList);
                    }}
                  />
                </th>
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
                              id={`one-c-one-${index}`}
                              type='checkbox'
                              checked={item.checked}
                              onChange={e => toggleCheckedOne(index, list, setList)}
                            />
                          </td>
                        )
                      }
                      <td>{item.name}</td>
                      <td>{item.interface}</td>
                      <td>{item.wanIp}</td>
                      <td>{item.localIp}</td>
                      <td>{item.protocol}</td>
                      <td>{item.ports}</td>
                      <td>{item.allowedRemoteIps}</td>
                      <td className='input'>
                        {
                          !isUseProfileConfig ? (
                            <>
                              <div className='d-flex'>
                                <RadioButton
                                  id={`one-c-one-nate-active-${index}-enable`}
                                  name={`oneCOneNatActive${index}`}
                                  label='Enable'
                                  hasRightMargin={true}
                                  checked={item.active}
                                  onChange={() => changeActive(index, true)}
                                />
                                <RadioButton
                                  id={`one-c-one-nate-active-${index}-disable`}
                                  name={`oneCOneNatActive${index}`}
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
        protocolDefinition={protocolDefinition}
        wans={wans}
      />

      <EditModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        protocolDefinition={protocolDefinition}
        wans={wans}
        selectedConfig={selectedConfig}
      />
    </>
  )
}

export default OneCOneNat;