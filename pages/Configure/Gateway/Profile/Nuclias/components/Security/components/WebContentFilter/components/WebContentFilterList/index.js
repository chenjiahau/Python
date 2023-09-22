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

import AddModal from './AddModal';
import EditModal from './EditModal';

// Context
import { ConfigContext } from '../../../../../../Context';
import { WcfContext } from '../../Context';

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

const policyDefinition = ['Allow', 'Block '];
const nonManagedAction = ['Allow', 'Block'];
const policyScopeDefinition = ['Global', 'By feature'];
const networkDefinition = ['Single', 'Range', 'Interface'];
const filteringTypeDefinition = ['Default category', 'URL', 'Default category + URL', 'Custom group'];

const WebContentFilterList = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: wcfState } = useContext(WcfContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
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
    const updatedList = cloneDeep(wcfState.webContentFilterList);
    setList(cloneDeep(updatedList));
    setProfileList(cloneDeep(updatedList));
  }, [wcfState.webContentFilterList]);

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;
  const isUseProfileConfig = !isProfilePath && isNotStandalone;

  let sourceList = null;
  if (isProfilePath) {
    sourceList = list;
  } else {
    sourceList = isNotStandalone ? profileList : list;
  }

  const { interface: iface, wcfCategory, schedule, customGroupList: customGroup } = wcfState;

  return (
    <>
      <Func title='WEB CONTENT FILTERING LIST'>
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
                        id='web-content-filtering-list-all'
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
                    label='Policy'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'policy', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'Policy', setList);
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
                <th>
                  <LinkerWithA
                    label='Scope'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'scope', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'scope', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Filtering type'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'filteringType', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'filteringType', setList);
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
                                  id={`web-content-filtering-list-${index}`}
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
                      <td>{item.policy}</td>
                      <td>{item.schedule}</td>
                      <td>{item.scope}</td>
                      <td>{item.filteringType}</td>
                      <td className='input'>
                        {
                          !isUseProfileConfig ? (
                            <>
                              <div className='d-flex'>
                                <RadioButton
                                  id={`web-content-filtering-active-${index}-enable`}
                                  name={`webContentFilteringActive${index}`}
                                  label='Enable'
                                  hasRightMargin={true}
                                  checked={item.active}
                                  onChange={() => changeActive(index, true)}
                                />
                                <RadioButton
                                  id={`web-content-filtering-active-${index}-disable`}
                                  name={`webContentFilteringActive${index}`}
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
                            {
                              !item.isDefault && (
                                <>
                                  <ButtonAction
                                    label='DELETE'
                                    title='DELETE'
                                    iconClassName='icon-trash'
                                    onClick={() => {
                                      setSelectedConfig(item);
                                      changeModalStatus(modalStatus.deleteConfig.self, true)
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

      <AddModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        isProfilePath={isProfilePath}
        policyDefinition={policyDefinition}
        nonManagedAction={nonManagedAction}
        policyScopeDefinition={policyScopeDefinition}
        networkDefinition={networkDefinition}
        filteringTypeDefinition={filteringTypeDefinition}
        iface={iface}
        wcfCategory={wcfCategory}
        schedule={schedule}
        customGroup={customGroup}
      />

      <EditModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        isProfilePath={isProfilePath}
        policyDefinition={policyDefinition}
        nonManagedAction={nonManagedAction}
        policyScopeDefinition={policyScopeDefinition}
        networkDefinition={networkDefinition}
        filteringTypeDefinition={filteringTypeDefinition}
        iface={iface}
        wcfCategory={wcfCategory}
        schedule={schedule}
        customGroup={customGroup}
      />
    </>
  )
}

export default WebContentFilterList;