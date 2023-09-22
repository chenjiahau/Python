import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Dummy data & util
import { modelName } from 'dummy/data/device';
import { generateSiteList } from 'dummy/data/site';
import { generateSiteTagList } from 'dummy/data/sitetag';
import { generateGwProfileList } from 'dummy/data/profile';
import { getPushConfigurationResult } from 'dummy/data/push';
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';

// UI
import CreateProfileModal from 'cloudUi/Modals/ProfileModal/CreateProfileModal';
import PushConfigurationResultModal from 'cloudUi/Modals/ProfileModal/PushConfigurationResultModal';
import PushConfigurationModal from 'cloudUi/Modals/ProfileModal/PushConfigurationModal';
import ConfirmDeleteModal from 'cloudUi/Modals/ConfirmDeleteModal';
import ProfileDevicesModal from 'cloudUi/Modals/ProfileModal/ProfileDevicesModal';

// Component
import {
  Button, InlineTitle, Checkbox, LinkerWithA, Icon, PaginationContainer,
  DropdownWithAdvancedSearch, DropdownWithItem, MessageBoxGroup, ButtonAction,
  EditableNameBox
} from 'components/';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultModalStatus = {
  createProfile: {
    self: 'createProfile',
    status: false
  },
  deleteProfile: {
    self: 'deleteProfile',
    status: false
  },
  pushConfiguration: {
    self: 'pushConfiguration',
    status: false
  },
  pushConfigurationResult: {
    self: 'pushConfigurationResult',
    status: false
  },
  profileDeviceList: {
    self: 'profileDeviceList',
    status: false
  }
};

const Nuclias = () => {
  const navigate = useNavigate();

  // Fake API data
  const fakerSiteList = generateSiteList(true);
  const fakerSiteTagList = generateSiteTagList(true);
  const fakerProfileList = generateGwProfileList([
    { model: modelName['GATEWAY'][1] },
    { model: modelName['GATEWAY'][1] },
    { model: modelName['GATEWAY'][1] },
    { model: modelName['GATEWAY'][1] },
    { model: modelName['GATEWAY'][1] },
    { model: modelName['GATEWAY'][1] },
    { model: modelName['GATEWAY'][2] },
    { model: modelName['GATEWAY'][2] },
    { model: modelName['GATEWAY'][2] },
    { model: modelName['GATEWAY'][2] },
  ]);

  // State
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [dropdownSiteList, setDropdownSiteList] = useState([]);
  const [dropdownSiteTagList, setDropdownSiteTagList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [editedProfileNameList, setEditedProfileNameList] = useState([]);
  const [pushResult, setPushResult] = useState({});
  const [selectedProfileDeviceList, setSelectedProfileDeviceList] = useState([]);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const editProfileName = (index) => {
    const updatedEditedProfileNameList = editedProfileNameList.map((item, i) => {
      if (i === index) {
        item.isEditing = true;
      }
      return item;
    });

    setEditedProfileNameList(updatedEditedProfileNameList);
  }

  const changeProfileName = (index, name) => {
    const updatedEditedProfileNameList = editedProfileNameList.map((profile, i) => {
      if (index === i) {
        profile.name = name;
      }
      return profile;
    });

    setEditedProfileNameList(updatedEditedProfileNameList);
  }

  const saveProfileName = (index) => {
    const updatedEditedProfileNameList = editedProfileNameList.map((item, i) => {
      if (i === index) {
        item.isEditing = false;
      }
      return item;
    });

    setEditedProfileNameList(updatedEditedProfileNameList);

    const updatedProfileList = profileList.map((item, i) => {
      if (i === index) {
        item.title = updatedEditedProfileNameList[i].name;
      }
      return item;
    });

    setProfileList(updatedProfileList);
  }

  const deleteProfile = () => {
    let updatedProfileList = cloneDeep(profileList);
    updatedProfileList = updatedProfileList.filter(item => !item.checked);
    setProfileList(updatedProfileList);
    changeModalStatus(modalStatus.deleteProfile.self, false);
  }

  const showDeviceList = (deviceList) => {
    setSelectedProfileDeviceList(deviceList);
    changeModalStatus(modalStatus.profileDeviceList.self, true);
  }

  // Side effect
  useEffect(() => {
    setDropdownSiteList(fakerSiteList);
    setDropdownSiteTagList(fakerSiteTagList);
    setProfileList(fakerProfileList);
    setEditedProfileNameList(fakerProfileList.map(item => {
      return { id: item.id, name: item.title, isEditing: false };
    }));
  }, []);

  return (
    <>
      <div className='layout-container layout-container--column layout-container--fluid'>
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />

        <div className='d-flex justify-content-between mb-1'>
          <ButtonGroup>
            <Button
              label='Create profile'
              onClick={() => changeModalStatus(modalStatus.createProfile.self, true)}
            />
            <Button
              label='Delete profile'
              disabled={!checkAtleastOneChecked(profileList)}
              onClick={() => changeModalStatus(modalStatus.deleteProfile.self, true)}
            />
            <Button
              label='Push configuration '
              disabled={!checkAtleastOneChecked(profileList)}
              onClick={() => changeModalStatus(modalStatus.pushConfiguration.self, true)}
            />
          </ButtonGroup>

          <InlineTitle isNonUnderline>
            <DropdownWithAdvancedSearch
              value={''}
              alignEnd={true}
              dataBsToggleOnInput={true}
              dataBsToggleOnButton={true}
              readOnly
              dropdownMenuStyle={{ minWidth: 371 }}
              onChange={e => console.log(e.target.value)}
            >
              <li>
                <div className='form-title'>Site tag</div>
                <DropdownWithItem
                  id='status-dropdown'
                  type='normal'
                  selectedItem={dropdownSiteTagList[0]}
                  itemList={dropdownSiteTagList}
                  onClick={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title'>Site</div>
                <DropdownWithItem
                  id='status-dropdown'
                  type='normal'
                  selectedItem={dropdownSiteList[0]}
                  itemList={dropdownSiteList}
                  onClick={() => { }}
                />
              </li>
            </DropdownWithAdvancedSearch>
          </InlineTitle>
        </div>

        <Table responsive striped hover className='table-container' id='device-list-table' style={{ position: 'relative' }}>
          <thead>
            <tr>
              <th>
                <Checkbox
                  id='profile-list-table-check-all'
                  type='checkbox'
                  checked={checkedAllState(profileList)}
                  onChange={e => toggleCheckedAll(profileList, setProfileList)}
                />
              </th>
              <th>#</th>
              <th>
                <LinkerWithA
                  label='Status'
                  className='text-decoration-none'
                  onClick={e => sorting(e, profileList, 'status', setProfileList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Profile'
                  className='text-decoration-none'
                  onClick={e => sorting(e, profileList, 'title', setProfileList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Model name'
                  className='text-decoration-none'
                  onClick={e => sorting(e, profileList, 'modelName', setProfileList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Access level'
                  className='text-decoration-none'
                  onClick={e => sorting(e, profileList, 'accessLevel', setProfileList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Devices'
                  className='text-decoration-none'
                  onClick={e => sorting(e, profileList, 'device.length', setProfileList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Last udpate time'
                  className='text-decoration-none'
                  onClick={e => sorting(e, profileList, 'lastUpdateTime', setProfileList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Scheduled push'
                  className='text-decoration-none'
                  onClick={e => sorting(e, profileList, 'scheduledPush', setProfileList)}
                />
              </th>
              <th className='table-action-th'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              profileList.map((profile, index) => {
                return (
                  <tr key={`profile-table-td-check-${index}`}>
                    <td>
                      <Checkbox
                        id={`profile-${profile.title}`}
                        type='checkbox'
                        checked={profile.checked}
                        onChange={e => toggleCheckedOne(index, profileList, setProfileList)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td style={{ width: '100px' }}>
                      {profile.status === 'Synced' && <Icon className='icon-config-synced' />}
                      {profile.status === 'Not synced' && <Icon className='icon-config-not-synced' />}
                      {profile.status === 'Syncing' && <Icon className='icon-config-syncing' />}
                      {profile.status === 'Config changed' && <Icon className='icon-config-changed' />}
                      {profile.status === 'Scheduling' && <Icon className='icon-config-scheduling' />}
                    </td>
                    <td>
                      <EditableNameBox
                        isMiddleSize={true}
                        onClickCancelIcon={() => changeProfileName(index, profile.title)}
                        inputFieldOnClick={() => editProfileName(index)}
                        inputFieldOnKeyDown={(e) => saveProfileName(index)}
                        inputFieldOnChange={e => changeProfileName(index, e.target.value)}
                        value={editedProfileNameList[index].isEditing ? editedProfileNameList[index].name : profile.title}
                      />
                    </td>
                    <td>{profile.modelName}</td>
                    <td>{profile.accessLevel}</td>
                    <td>
                      {
                        profile.deviceList.length === 0 && <span>0</span>
                      }
                      {
                        profile.deviceList.length > 0 && (
                          <span className='table-not-link' onClick={() => showDeviceList(profile.deviceList)}>
                            {profile.deviceList.length}</span>
                        )
                      }
                    </td>
                    <td>{profile.lastUpdateTime}</td>
                    <td>{profile.scheduledPush}</td>
                    <td className='table-action-td'>
                      <ButtonAction
                        label='NETWORK'
                        title='NETWORK'
                        iconClassName='icon-network'
                        onClick={() => navigate(`/cloud/configure/gateway/profile/${profile.id}?tab=network`)}
                      />
                      <ButtonAction
                        label='SECURITY'
                        title='SECURITY'
                        iconClassName='icon-security'
                        onClick={() => navigate(`/cloud/configure/gateway/profile/${profile.id}?tab=security`)}
                      />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>

        <PaginationContainer
          total={profileList.length}
          onPageChange={currentPageNum =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={currentPageNum =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />
      </div >

      <CreateProfileModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        deviceType='GATEWAY'
      />

      <ConfirmDeleteModal
        modalKey={modalStatus.deleteProfile.self}
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        title='Delete profiles'
        description='Are you sure you want to delete the selected profiles?'
        execute={() => { console.log('Write down your execution code') }}
        successCallback={() => deleteProfile()}
      />

      <PushConfigurationModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        callback={isNow => {
          setPushResult(getPushConfigurationResult(profileList, isNow));
          setModalStatus(currentState => {
            currentState.pushConfiguration.status = false;
            currentState.pushConfigurationResult.status = true;
            return currentState;
          });
        }}
      />

      <PushConfigurationResultModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        pushResult={pushResult}
      />

      <ProfileDevicesModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        originDeviceList={selectedProfileDeviceList}
      />
    </>
  );
}

export default Nuclias;