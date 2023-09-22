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

import AddConfigModal from './AddConfigModal';
import EditConfigModal from './EditConfigModal';

// Context
import { ConfigContext } from '../../../../../../Context';
import { RoutingContext } from '../../Context';

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

const directionDefinition = [
  { title: 'In only', value: 'In only' },
  { title: 'Both', value: 'Both' },
];

const versionDefinition = [
  { title: 'RIP-1', value: 'RIP-1' },
  { title: 'RIP-2M', value: 'RIP-2M' },
];

const RipConfiguration = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: routingState } = useContext(RoutingContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [interfaceList, setInterfaceList] = useState([]);
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
    setInterfaceList(cloneDeep(routingState.interface));
    const updatedList = cloneDeep(routingState.ripConfiguration);
    setList(cloneDeep(updatedList));
    setProfileList(cloneDeep(updatedList));
  }, [routingState.ripConfiguration]);

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
      <Func title='RIP CONFIGURATION'>
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
                        id='rip-config-all'
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
                    label='Direction'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'direction', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'direction', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Version'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'version', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'version', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Authentication'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'authentication', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'authentication', setList);
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
                                  id={`rip-config-${index}`}
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
                      <td>{item.interface}</td>
                      <td>{item.direction}</td>
                      <td>{item.version}</td>
                      <td>{item.authentication ? 'Enabled' : 'Disabled'}</td>
                      <td className='input'>
                        {
                          !isUseProfileConfig ? (
                            <>
                              <div className='d-flex'>
                                <RadioButton
                                  id={`rip-config-active-${index}-enable`}
                                  name={`ripConfigActive${index}`}
                                  label='Enable'
                                  hasRightMargin={true}
                                  checked={item.active}
                                  onChange={() => changeActive(index, true)}
                                />
                                <RadioButton
                                  id={`rip-config-active-${index}-disable`}
                                  name={`ripConfigActive${index}`}
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
                                changeModalStatus(modalStatus.deleteConfig.self, true)
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

      <AddConfigModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        interfaceList={interfaceList}
        directionDefinition={directionDefinition}
        versionDefinition={versionDefinition}
      />

      <EditConfigModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        interfaceList={interfaceList}
        directionDefinition={directionDefinition}
        versionDefinition={versionDefinition}
        selectedConfig={selectedConfig}
      />
    </>
  )
}

export default RipConfiguration;