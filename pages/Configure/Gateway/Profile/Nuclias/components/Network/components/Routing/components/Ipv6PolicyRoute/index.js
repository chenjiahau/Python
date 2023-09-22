import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// UI

// Component
import {
  ButtonAction, Button, Checkbox, LinkerWithA, PaginationContainer,
  InputWithIcon, RadioButton
} from 'components/';
import Func from '../../../../../Func';

import AddRouteModal from './AddRouteModal';
import EditRouteModal from './EditRouteModal';

// Context
import { ConfigContext } from '../../../../../../Context';
import { RoutingContext } from '../../Context';

// Dummy data
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';

const defaultModalStatus = {
  addRoute: {
    self: 'addRoute',
    status: false
  },
  editRoute: {
    self: 'editRoute',
    status: false
  },
  deleteRoute: {
    self: 'deleteRoute',
    status: false
  },
};

const protocolDefinition = [
  { title: 'Any', value: 'Any' },
  { title: 'TCP', value: 'TCP' },
  { title: 'UDP', value: 'UDP' },
  { title: 'TCP/UDP', value: 'TCP/UDP' },
  { title: 'ICMP', value: 'ICMP' },
]

const Ipv6PolicyRoute = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: routingState } = useContext(RoutingContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [interfaceList, setInterfaceList] = useState([]);
  const [list, setList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeActive = (index, state) => {
    const updatedList = cloneDeep(list);
    updatedList[index].active = state;
    setList(updatedList);
  };

  // Side effect
  useEffect(() => {
    setInterfaceList(cloneDeep(routingState.interface));
    const updatedList = cloneDeep(routingState.ipv6PolicyRoute);
    setList(cloneDeep(updatedList));
    setProfileList(cloneDeep(updatedList));
  }, [routingState.ipv6PolicyRoute]);

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
      <Func title='IPV6 POLICY ROUTE'>
        <div className='mb-2'>
          <div className='justify-content-between d-flex'>
            <ButtonGroup>
              {
                !isUseProfileConfig && (
                  <>
                    <Button
                      label='Add'
                      onClick={() => {
                        setSelectedRoute(null);
                        changeModalStatus(modalStatus.addRoute.self, true)
                      }}
                    />
                    <Button
                      label='Delete'
                      disabled={!checkAtleastOneChecked(list)}
                      onClick={() => changeModalStatus(modalStatus.deleteRoute.self, true)}
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
                        id='v6policy-route-all'
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
                    label='Source network'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'sourceNetwork', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'sourceNetwork', setList);
                    }}
                  />
                </th>
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
                <th>
                  <LinkerWithA
                    label='Destination network'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'destinationNetwork', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'destinationNetwork', setList);
                    }}
                  />
                </th>
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
                <th>
                  <LinkerWithA
                    label='Destination interface'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'destinationInterface', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'destinationInterface', setList);
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
                            {
                              !item.isDefault && (
                                <Checkbox
                                  id={`v6policy-route-${item.index}`}
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
                      <td>{item.protocol}</td>
                      <td>{item.sourceNetwork}</td>
                      <td>{item.sourcePort}</td>
                      <td>{item.destinationNetwork}</td>
                      <td>{item.destinationPort}</td>
                      <td>{item.sourceInterface}</td>
                      <td>{item.destinationInterface}</td>
                      <td className='input'>
                        {
                          !isUseProfileConfig ? (
                            <>
                              <div className='d-flex'>
                                <RadioButton
                                  id={`ipv6-policy-active-${index}-enable`}
                                  name={`ipv6PolicyRouteActive${index}`}
                                  label='Enable'
                                  hasRightMargin={true}
                                  checked={item.active}
                                  onChange={() => changeActive(index, true)}
                                />
                                <RadioButton
                                  id={`ipv6-policy-active-${index}-disable`}
                                  name={`ipv6PolicyRouteActive${index}`}
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
                                setSelectedRoute(item);
                                changeModalStatus(modalStatus.editRoute.self, true)
                              }}
                            />
                            <ButtonAction
                              label='DELETE'
                              title='DELETE'
                              iconClassName='icon-trash'
                              onClick={() => {
                                setSelectedRoute(item);
                                changeModalStatus(modalStatus.deleteRoute.self, true)
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

      <AddRouteModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        interfaceList={interfaceList}
        protocolDefinition={protocolDefinition}
      />

      <EditRouteModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        interfaceList={interfaceList}
        protocolDefinition={protocolDefinition}
        selectedRoute={selectedRoute}
      />
    </>
  )
}

export default Ipv6PolicyRoute;