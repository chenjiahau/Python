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

const Ipv6StaticRoute = () => {
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
    const updatedList = cloneDeep(routingState.ipv6StaticRoute);
    setList(cloneDeep(updatedList));
    setProfileList(cloneDeep(updatedList));
  }, [routingState.ipv6StaticRoute]);

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
      <Func title='IPV6 STATIC ROUTE'>
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
                        id='v4static-route-all'
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
                    label='Destination'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'destination', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'destination', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Gateway'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'gateway', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'gateway', setList);
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
                    label='Metric'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'metric', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'metric', setList);
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
                                  id={`v4static-route-${item.index}`}
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
                      <td>{item.destination}</td>
                      <td>{item.gateway}</td>
                      <td>{item.interface}</td>
                      <td>{item.metric}</td>
                      <td className='input'>
                        {
                          !isUseProfileConfig ? (
                            <>
                              <div className='d-flex'>
                                <RadioButton
                                  id={`ipv6-static-route-active-${index}-enable`}
                                  name={`ipv6StaticRouteActive${index}`}
                                  label='Enable'
                                  hasRightMargin={true}
                                  checked={item.active}
                                  onChange={() => changeActive(index, true)}
                                />
                                <RadioButton
                                  id={`ipv6-static-route-active-${index}-disable`}
                                  name={`ipv6StaticRouteActive${index}`}
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
      />

      <EditRouteModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        interfaceList={interfaceList}
        selectedRoute={selectedRoute}
      />
    </>
  )
}

export default Ipv6StaticRoute;