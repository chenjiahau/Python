import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// UI
import AddRadiusServerModal from 'cloudUi/Modals/AuthenticationServersModal/AddRadiusServerModal';
import AddSchedulePolicyModal from 'cloudUi/Modals/SchedulePolicyModal/AddSchedulePolicyModal';

// Component
import {
  ButtonAction, Button, Checkbox, LinkerWithA, PaginationContainer,
  InputWithIcon, Icon
} from 'components/';
import Func from '../../../../../Func';

import AddSsidModal from './AddSsidModal';
import EditSsidModal from './EditSsidModal';

// Context
import { ConfigContext } from '../../../../../../Context';
import { WirelessContext } from '../../Context';

// Dummy data
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';

const defaultModalStatus = {
  addSsid: {
    self: 'addSsid',
    status: false
  },
  editSsid: {
    self: 'editSsid',
    status: false
  },
  deleteSsid: {
    self: 'deleteSsid',
    status: false
  },
  addRadius: {
    self: 'addRadius',
    status: false
  },
  addSchedulePolicy: {
    self: 'addSchedulePolicy',
    status: false
  }
};

const SSID = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: wirelessState } = useContext(WirelessContext);

  // Fake data
  const modelName = configState.profile ? configState.profile.modelName : configState.device.modelName;
  const fakeBridgedInterface = new GatewayData()
    .generateNetworkInterfaces(modelName, { vlan: true });

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [bridgedInterface, setBridgedInterface] = useState([]);
  const [list, setList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [selectedSsid, setSelectedSsid] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeFrequency = (index, type) => {
    const updatedList = cloneDeep(list);
    updatedList[index][type] = !updatedList[index][type];
    setList(updatedList);
  }

  const addRadiusServer = () => {
    const updatedModalStatus = cloneDeep(defaultModalStatus);
    updatedModalStatus.addRadius.status = true;
    setModalStatus(updatedModalStatus);
  }

  const callbackAfterAddRadiusServer = () => {
    const updatedModalStatus = cloneDeep(defaultModalStatus);
    updatedModalStatus.editSsid.status = true;
    setModalStatus(updatedModalStatus);
  }

  const addSchedulePolicy = () => {
    const updatedModalStatus = cloneDeep(defaultModalStatus);
    updatedModalStatus.addSchedulePolicy.status = true;
    setModalStatus(updatedModalStatus);
  }

  const callbackAfterAddSchedulePolicy = () => {
    const updatedModalStatus = cloneDeep(defaultModalStatus);
    updatedModalStatus.editSsid.status = true;
    setModalStatus(updatedModalStatus);
  }

  // Side effect
  useEffect(() => {
    setBridgedInterface(cloneDeep(fakeBridgedInterface));

    const updatedList = cloneDeep(wirelessState.ssids);
    updatedList?.forEach((item, index) => item.index = index);

    setList(cloneDeep(updatedList));
    setProfileList(cloneDeep(updatedList));
  }, [wirelessState.ssids]);

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
      <Func title='SSID'>
        <div className='mb-2'>
          <div className='justify-content-between d-flex'>
            <ButtonGroup>
              {
                !isUseProfileConfig && (
                  <>
                    <Button
                      label='Add'
                      onClick={() => {
                        setSelectedSsid(null);
                        changeModalStatus(modalStatus.addSsid.self, true)
                      }}
                    />
                    <Button
                      label='Delete'
                      disabled={!checkAtleastOneChecked(list.filter(item => !item.isDefaultWan))}
                      onClick={() => changeModalStatus(modalStatus.deleteSsid.self, true)}
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
                        id='ssid-all'
                        type='checkbox'
                        checked={checkedAllState(list.filter(item => !item.isDefaultWan))}
                        onChange={e => toggleCheckedAll(list, setList)}
                      />
                    </th>
                  )
                }
                <th>#</th>
                <th>
                  <LinkerWithA
                    label='SSID'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'index', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'index', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='2.4 GHz'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'f24g', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'f24g', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='5 GHz'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'f5g', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'f5g', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Broadcast SSID'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'broadcast', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'broadcast', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Security'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'security', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'security', setList);
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
                              id={`ssid-${item.index}`}
                              type='checkbox'
                              checked={item.checked}
                              onChange={e => toggleCheckedOne(index, list, setList)}
                            />
                          </td>
                        )
                      }
                      <td>{item.index + 1}</td>
                      <td>{item.ssid}</td>
                      <td>
                        {
                          isUseProfileConfig ? (
                            <>{item.f24g && <Icon className={'icon-checked-selected'} />}</>
                          ) : (
                            <>
                              <Checkbox
                                id={`ssid-f24g-${index}`}
                                type='checkbox'
                                checked={item.f24g === true}
                                onChange={e => changeFrequency(index, 'f24g')}
                              />
                            </>
                          )
                        }
                      </td>
                      <td>
                        {
                          isUseProfileConfig ? (
                            <>{item.f5g && <Icon className={'icon-checked-selected'} />}</>
                          ) : (
                            <>
                              <Checkbox
                                id={`ssid-f5g-${index}`}
                                type='checkbox'
                                checked={item.f5g === true}
                                onChange={e => changeFrequency(index, 'f5g')}
                              />
                            </>
                          )
                        }
                      </td>
                      <td>
                        {
                          isUseProfileConfig ? (
                            <>{item.broadcast && <Icon className={'icon-checked-selected'} />}</>

                          ) : (
                            <>
                              <Checkbox
                                id={`ssid-broadcast-${index}`}
                                type='checkbox'
                                checked={item.broadcast === true}
                                onChange={e => changeFrequency(index, 'broadcast')}
                              />
                            </>
                          )
                        }
                      </td>
                      <td>{item.security}</td>
                      {
                        !isUseProfileConfig && (
                          <td className={'table-action-td'}>
                            <ButtonAction
                              label='EDIT'
                              title='EDIT'
                              iconClassName='icon-edit'
                              onClick={() => {
                                setSelectedSsid(item);
                                changeModalStatus(modalStatus.editSsid.self, true)
                              }}
                            />
                            <ButtonAction
                              label='DELETE'
                              title='DELETE'
                              iconClassName='icon-trash'
                              onClick={() => {
                                setSelectedSsid(item);
                                changeModalStatus(modalStatus.deleteSsid.self, true)
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
          total={list.length}
          onPageChange={currentPageNum =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={currentPageNum =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />
      </Func>

      <AddSsidModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <EditSsidModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        bridgedInterface={bridgedInterface}
        selectedSsid={selectedSsid}
        addRadiusServer={addRadiusServer}
        addSchedulePolicy={addSchedulePolicy}
      />

      <AddRadiusServerModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        callback={callbackAfterAddRadiusServer}
      />

      <AddSchedulePolicyModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        callback={callbackAfterAddSchedulePolicy}
      />
    </>
  )
}

export default SSID;