import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// UI
import AddRadiusServerModal from 'cloudUi/Modals/AuthenticationServersModal/AddRadiusServerModal';
import AddLdapServerModal from 'cloudUi/Modals/AuthenticationServersModal/AddLdapServerModal';
import AddLocalAuthenticationModal from 'cloudUi/Modals/LocalAuthenticationModal/AddLocalAuthenticationModal';
import AddWalledGardenModal from 'cloudUi/Modals/WalledGardenModal/AddWalledGarednModal';
import AddSmsConfigureModal from 'cloudUi/Modals/SmsConfigurationModal/AddSmsConfigurationModal';

// Component
import {
  ButtonAction, Button, Checkbox, LinkerWithA, PaginationContainer, DropdownWithAdvancedSearch,
  Input, TooltipDialogFixed
} from 'components/';
import Func from '../../../../../Func';

import AddCaptivePortalModal from './AddCaptivePortalModal';
import EditCaptivePortalModal from './EditCaptivePortalModal'

// Context
import { ConfigContext } from '../../../../../../Context';
import { CaptivePortalContext } from '../../Context';

// Dummy data
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';

const defaultModalStatus = {
  addCp: {
    self: 'addCp',
    status: false
  },
  editCp: {
    self: 'editCp',
    status: false
  },
  deleteCp: {
    self: 'deleteCp',
    status: false
  },
  addLocalDb: {
    self: 'addLocalDb',
    status: false
  },
  addRadius: {
    self: 'addRadius',
    status: false
  },
  addLdap: {
    self: 'addLdap',
    status: false
  },
  addSms: {
    self: 'addSms',
    status: false
  },
  addWalledGarden: {
    self: 'addWalledGarden',
    status: false
  },
};

const supportedSettingDefinition = [
  { id: 1, title: 'Basic login page' },
  { id: 2, title: 'E-mail authentication' },
  { id: 3, title: 'SMS configuration' },
  { id: 4, title: '3rd party credentials' },
  { id: 5, title: 'Simultaneous login' },
  { id: 6, title: 'Option' },
  { id: 7, title: 'Splash page URL' },
  { id: 8, title: 'RADIUS server' },
  { id: 9, title: 'MAC authentication' },
  { id: 10, title: 'Session timeout' },
  { id: 11, title: 'Idle timeout' },
  { id: 12, title: 'Session limited' },
  { id: 13, title: 'Walled garden (optional)' },
  { id: 14, title: 'URL redirection' },
  { id: 15, title: 'SSID / VLAN' },
];

const captivePortalDefinition = [
  {
    title: 'None',
    supportedSettings: [14, 15]
  },
  {
    title: 'Click-through',
    supportedSettings: [10, 11, 14, 15]
  },
  {
    title: 'Sign-on with basic login page',
    supportedSettings: [1, 5, 10, 11, 12, 13, 14, 15]
  },
  {
    title: 'Sign-on with third party credentials',
    supportedSettings: [4, 5, 10, 11, 12, 13, 14, 15]
  },
  {
    title: 'Sign-on with basic login and third party credentials',
    supportedSettings: [1, 4, 5, 10, 11, 12, 13, 14, 15]
  },
  {
    title: 'Sign-on with email authentication, SMS authentication and third party credentials',
    supportedSettings: [2, 3, 4, 5, 10, 11, 12, 13, 14, 15]
  },
  {
    title: 'Sign-on with External Captive Portal',
    supportedSettings: [6, 7, 8, 9, 10, 11, 12, 13, 15]
  }
];

const authenticationServerDefinition = ['RADIUS', 'LDAP'];
const sessionLimitedDefinition = ['Unlimited', 1, 2, 3, 4, 5];
const gracePeriodDefinition = [3, 5, 8, 10, 15];
const authenticationTimesDefinition = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const redirectionIntervalDefinition = ['Only redirect at the first time', '15 minutes'];

const ssidAndVlanTooltipContent = (list) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Site</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map((item, index) => (
            <tr key={`${item}-${index}`}>
              <td>{index + 1}</td>
              <td>{item}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

const CaptivePortal = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: captivePortalState } = useContext(CaptivePortalContext);

  // Fake data

  // State
  const { splashPage, localDb, radius, ldap, sms, walledGarden, ssidAndVlan } = captivePortalState;
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [list, setList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [isAddMode, setIsAddMode] = useState(true);
  const [selectedCp, setSelectedCp] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const addCommonPool = (closeWho, openWho) => {
    setIsAddMode(true);
    const updatedModalStatus = cloneDeep(modalStatus);
    updatedModalStatus[closeWho].status = false;
    updatedModalStatus[openWho].status = true;
    setModalStatus(updatedModalStatus);
  }

  const closeCommonPool = (closeWho, openWho) => {
    setIsAddMode(false);
    const updatedModalStatus = cloneDeep(modalStatus);
    updatedModalStatus[closeWho].status = false;
    updatedModalStatus[openWho].status = true;
    setModalStatus(updatedModalStatus);
  }

  // Side effect
  useEffect(() => {
    setList(cloneDeep(captivePortalState.cp));
    setProfileList(cloneDeep(captivePortalState.cp));
  }, [captivePortalState.cp]);

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
      <Func title='CAPTIVE PORTAL'>
        <div className='mb-2'>
          <div className='justify-content-between d-flex'>
            <ButtonGroup>
              {
                !isUseProfileConfig && (
                  <>
                    <Button
                      label='Add'
                      onClick={() => {
                        setSelectedCp(null);
                        changeModalStatus(modalStatus.addCp.self, true)
                      }}
                    />
                    <Button
                      label='Delete'
                      disabled={!checkAtleastOneChecked(list.filter(item => !item.isDefault))}
                      onClick={() => changeModalStatus(modalStatus.deleteCp.self, true)}
                    />
                  </>
                )
              }
            </ButtonGroup>
            <DropdownWithAdvancedSearch
              value={''}
              readOnly={true}
              alignEnd={true}
              dataBsToggleOnButton={true}
              dropdownMenuStyle={{ minWidth: 371 }}
              onChange={e => console.log(e.target.value)}
            >
              <li className='mt-2'>
                <div className='form-title'>SSID / VLAN</div>
                <Input
                  type='text'
                  autoComplete='new-password'
                  onChange={e => {
                    console.log(e.target.value);
                  }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
            </DropdownWithAdvancedSearch>
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
                        id='cp-all'
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
                    label='Captive portal'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'captivePortal', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'captivePortal', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Splash page'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'splashPage', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'splashPage', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Basic login'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'basicLogin', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'basicLogin', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='3rd party credential'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'threePartyCredential', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'threePartyCredential', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='SSID / VLAN'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'ssidAndVlan.length', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'ssidAndVlan.length', setList);
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
                                  id={`cp-${index}`}
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
                      <td>{item.captivePortal}</td>
                      <td>{item.splashPage}</td>
                      <td>{item.basicLogin}</td>
                      <td>{item.threePartyCredential}</td>
                      <td>
                        {
                          item.ssidAndVlan.length === 0 ? (
                            <>0</>
                          ) : (
                            <>
                              <TooltipDialogFixed
                                placement="right"
                                title={ReactDOMServer.renderToString(ssidAndVlanTooltipContent(item.ssidAndVlan))}
                                hideIcon={true}
                                tooltipsTitle={item.ssidAndVlan.length}
                              />
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
                                setSelectedCp(item);
                                changeModalStatus(modalStatus.editCp.self, true)
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
                                      setSelectedCp(item);
                                      changeModalStatus(modalStatus.deleteCp.self, true)
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

      <AddLocalAuthenticationModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        callback={() => closeCommonPool('addLocalDb', isAddMode ? 'addCp' : 'editCp')}
      />

      <AddRadiusServerModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        callback={() => closeCommonPool('addRadius', isAddMode ? 'addCp' : 'editCp')}
      />

      <AddLdapServerModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        callback={() => closeCommonPool('addLdap', isAddMode ? 'addCp' : 'editCp')}
      />

      <AddSmsConfigureModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        callback={() => closeCommonPool('addSms', isAddMode ? 'addCp' : 'editCp')}
      />

      <AddWalledGardenModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        callback={() => closeCommonPool('addWalledGarden', isAddMode ? 'addCp' : 'editCp')}
      />

      <AddCaptivePortalModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        addCommonPool={addCommonPool}
        supportedSettingDefinition={supportedSettingDefinition}
        captivePortalDefinition={captivePortalDefinition}
        authenticationServerDefinition={authenticationServerDefinition}
        sessionLimitedDefinition={sessionLimitedDefinition}
        gracePeriodDefinition={gracePeriodDefinition}
        authenticationTimesDefinition={authenticationTimesDefinition}
        redirectionIntervalDefinition={redirectionIntervalDefinition}
        splashPage={splashPage}
        localDb={localDb}
        radius={radius}
        ldap={ldap}
        sms={sms}
        walledGarden={walledGarden}
        ssidAndVlan={ssidAndVlan}
      />

      <EditCaptivePortalModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        addCommonPool={addCommonPool}
        supportedSettingDefinition={supportedSettingDefinition}
        captivePortalDefinition={captivePortalDefinition}
        authenticationServerDefinition={authenticationServerDefinition}
        sessionLimitedDefinition={sessionLimitedDefinition}
        gracePeriodDefinition={gracePeriodDefinition}
        authenticationTimesDefinition={authenticationTimesDefinition}
        redirectionIntervalDefinition={redirectionIntervalDefinition}
        splashPage={splashPage}
        localDb={localDb}
        radius={radius}
        ldap={ldap}
        sms={sms}
        walledGarden={walledGarden}
        ssidAndVlan={ssidAndVlan}
      />
    </>
  )
}

export default CaptivePortal;