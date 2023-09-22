import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep, orderBy, set } from 'lodash';

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
import { AppCtrlContext } from '../../Context';

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

const policyDefinition = ['Allow', 'Block'];
const policyScopeDefinition = ['Global', 'By feature'];
const networkDefinition = ['Single', 'IP range', 'Interface'];
const applicationTypeDefinition = ['Default group', 'Single application', 'Custom group'];

const ApplicationControlList = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: appCtrlState } = useContext(AppCtrlContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [interfaceList, setInterfaceList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [appPackageList, setAppPackageList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [customGroupList, setCustomGroupList] = useState([]);
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
    const updatedInterfaceList = [];
    appCtrlState.interface.forEach(item => {
      updatedInterfaceList.push(item.interface);
    });
    setInterfaceList(updatedInterfaceList);

    const updatedScheduleList = [];
    appCtrlState.schedule.forEach(item => {
      updatedScheduleList.push(item.title);
    });
    setScheduleList(updatedScheduleList);

    const updatedAppPackageList = [];
    appCtrlState.appCtrl.package.forEach(item => {
      updatedAppPackageList.push({
        title: item.group,
        app: item.apps
      });
    });
    setAppPackageList(updatedAppPackageList);

    const updatedPackageList = [];
    appCtrlState.appCtrl.package.forEach(p => {
      updatedPackageList.push(p.group);
    });

    updatedPackageList.sort();
    setPackageList(updatedPackageList);

    const updatedCustomGroupList = [];
    appCtrlState.customGroupList.forEach(item => {
      updatedCustomGroupList.push(item.name);
    });
    updatedCustomGroupList.sort();
    setCustomGroupList(updatedCustomGroupList);

    setList(cloneDeep(appCtrlState.appCtrlList));
    setProfileList(cloneDeep(appCtrlState.appCtrlList));
  }, [appCtrlState.appCtrlList]);

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
      <Func title='APPLICATION CONTROL LIST'>
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
                        id='application-control-all'
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
                      !isUseProfileConfig && sorting(e, list, 'policy', setList);
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
                    label='Application'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'application', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'application', setList);
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
                              id={`application-control-${index}`}
                              type='checkbox'
                              checked={item.checked}
                              onChange={e => toggleCheckedOne(index, list, setList)}
                            />
                          </td>
                        )
                      }
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.policy}</td>
                      <td>{item.schedule}</td>
                      <td>{item.scope}</td>
                      <td>{item.application}</td>
                      <td className='input'>
                        {
                          !isUseProfileConfig ? (
                            <>
                              <div className='d-flex'>
                                <RadioButton
                                  id={`application-control-active-${index}-enable`}
                                  name={`applicationControlActive${index}`}
                                  label='Enable'
                                  hasRightMargin={true}
                                  checked={item.active}
                                  onChange={() => changeActive(index, true)}
                                />
                                <RadioButton
                                  id={`application-control-active-${index}-disable`}
                                  name={`applicationControlActive${index}`}
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

      <AddModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        isProfilePath={isProfilePath}
        policyDefinition={policyDefinition}
        policyScopeDefinition={policyScopeDefinition}
        networkDefinition={networkDefinition}
        applicationTypeDefinition={applicationTypeDefinition}
        interfaceList={interfaceList}
        scheduleList={scheduleList}
        appPackageList={appPackageList}
        packageList={packageList}
        customGroupList={customGroupList}
      />

      <EditModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        isProfilePath={isProfilePath}
        policyDefinition={policyDefinition}
        policyScopeDefinition={policyScopeDefinition}
        networkDefinition={networkDefinition}
        applicationTypeDefinition={applicationTypeDefinition}
        interfaceList={interfaceList}
        scheduleList={scheduleList}
        appPackageList={appPackageList}
        packageList={packageList}
        customGroupList={customGroupList}
      />
    </>
  )
}

export default ApplicationControlList;