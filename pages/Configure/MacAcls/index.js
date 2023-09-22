import macAclsStyle from './mac-acls.module.scss';

import { useState, useCallback } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Table & Modal
import MacAclsTable from './MacAclsTable';
import AddMacAclsModal from 'cloudUi/Modals/MacAclModal/AddMacAclModal';
import EditMacAclsModal from 'cloudUi/Modals/MacAclModal/EditMacAclModal';

// Components
import Breadcrumb from '../../../components/Breadcrumb';
import ButtonWithIcon from '../../../components/ButtonWithIcon';
import MessageBoxGroup from '../../../components/MessageBoxGroup';
import DropdownWithItem from '../../../components/DropdownWithItem';
import PaginationContainer from '../../../components/PaginationContainer';
import DropdownWithAdvancedSearch from '../../../components/DropdownWithAdvancedSearch';
import ConfirmationModalContainer from '../../../components/ConfirmationModalContainer';

import AssociatedTableModalContainer from 'cloudUi/Modals/AssociatedTableModal';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'MAC ACLs', isLink: false },
];

const dropdownSiteTagList = [
  { title: 'All', isActive: true },
  { title: 'Hsinchu', isActive: false },
  { title: 'Kaohsiung', isActive: false },
  { title: 'Taipei', isActive: false },
];

const dropdownSiteList = [
  { title: 'All', isActive: true },
  { title: 'Test', isActive: false },
  { title: 'HQ', isActive: false },
  { title: 'Neiwan', isActive: false },
  { title: 'Daliao', isActive: false },
  { title: 'Dream Mail', isActive: false },
  { title: 'Neihu', isActive: false },
  { title: 'Songshan', isActive: false },
];

const defaultModalStatus = {
  addMacAcl: {
    status: false,
  },
  editMacAcl: {
    status: false,
  },
  delete: {
    status: false,
  },
  associatedDevices: {
    title: '9739b717cc', // Associated devices
    status: false,
    modalWidthType: 'modal-1000px',
    apThList: [
      { label: '61e058f022', accessor: 'deviceName', sortable: true },
      { label: '2e25c28535', accessor: 'mac', sortable: true },
      { label: '402d4d2bce', accessor: 'modelName', sortable: true },
      { label: 'c1ca926603', accessor: 'organization', sortable: true },
      { label: 'a7d6475ec8', accessor: 'site', sortable: true },
      { label: '26fe2e18ca', accessor: 'syncStatus', sortable: true },
      { label: '28a9f0e91d', accessor: 'profile', sortable: true },
      { label: '70498e75d8', accessor: 'lastConnected', sortable: true },
    ],
    switchThList: [
      { label: '61e058f022', accessor: 'deviceName', sortable: true },
      { label: '2e25c28535', accessor: 'mac', sortable: true },
      { label: '402d4d2bce', accessor: 'modelName', sortable: true },
      { label: 'c1ca926603', accessor: 'organization', sortable: true },
      { label: 'a7d6475ec8', accessor: 'site', sortable: true },
      { label: '26fe2e18ca', accessor: 'syncStatus', sortable: true },
      { label: '28a9f0e91d', accessor: 'profile', sortable: true },
      { label: '70498e75d8', accessor: 'lastConnected', sortable: true },
    ],
    gatewayThList: [
      { label: '61e058f022', accessor: 'deviceName', sortable: true },
      { label: '2e25c28535', accessor: 'mac', sortable: true },
      { label: '402d4d2bce', accessor: 'modelName', sortable: true },
      { label: 'c1ca926603', accessor: 'organization', sortable: true },
      { label: 'a7d6475ec8', accessor: 'site', sortable: true },
      { label: '26fe2e18ca', accessor: 'syncStatus', sortable: true },
      { label: '28a9f0e91d', accessor: 'profile', sortable: true },
      { label: '70498e75d8', accessor: 'lastConnected', sortable: true },
    ],
    apTdList: [
      {
        deviceName: 'DBA-1',
        mac: '11:85:4B:ED:A3:AA',
        modelName: 'DBA-1210P',
        organization: 'ORG-1',
        site: 'SITE-1',
        syncStatus: '8ae6b98bb5',
        profile: 'profile-1',
        lastConnected: '2023/02/23 01:55 PM',
        redirectionUrlPath: '#/cloud/configure/access-point/device/111111'
      }, // Synced
      {
        deviceName: 'DBA-2',
        mac: '22:85:4B:ED:A3:BB',
        modelName: 'DBA-1510P',
        organization: 'ORG-1',
        site: 'SITE-2',
        syncStatus: 'a6c468a920',
        profile: 'profile-1',
        lastConnected: '2023/02/23 02:55 PM',
        redirectionUrlPath: '#/cloud/configure/access-point/device/222222'
      }, // Not synced
      {
        deviceName: 'DBA-3',
        mac: '33:85:4B:ED:A3:CC',
        modelName: 'DBA-2720P',
        organization: 'ORG-1',
        site: 'SITE-3',
        syncStatus: '975c39d988',
        profile: 'profile-1',
        lastConnected: '2023/02/23 03:55 PM',
        redirectionUrlPath: '#/cloud/configure/access-point/device/333333'
      }, // Config changed
    ],
    switchTdList: [
      // {deviceName: 'DBS-1', mac: '11:85:4B:ED:A3:AA', modelName: 'DBS-2000-28', organization: 'ORG-1', site: 'SITE-1', syncStatus: '8ae6b98bb5', profile: 'profile-1', lastConnected: '2023/02/23 01:55 PM'}, // Synced
      // {deviceName: 'DBS-2', mac: '22:85:4B:ED:A3:BB', modelName: 'DBS-2000-10MP', organization: 'ORG-1', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-1', lastConnected: '2023/02/23 02:55 PM'}, // Not synced
      // {deviceName: 'DBS-3', mac: '33:85:4B:ED:A3:CC', modelName: 'DBS-2000-28MP', organization: 'ORG-1', site: 'SITE-3', syncStatus: '975c39d988', profile: 'profile-1', lastConnected: '2023/02/23 03:55 PM'}, // Config changed
    ],
    gatewayTdList: [
      {
        deviceName: 'DBG-1',
        mac: '11:85:4B:ED:A3:AA',
        modelName: 'DBG-2000',
        organization: 'ORG-1',
        site: 'SITE-1',
        syncStatus: '8ae6b98bb5',
        profile: 'profile-1',
        lastConnected: '2023/02/23 01:55 PM',
        redirectionUrlPath: '#/configure/gateway/device/111111'
      }, // Synced
      {
        deviceName: 'DBG-2',
        mac: '22:85:4B:ED:A3:BB',
        modelName: 'DBG-X1000',
        organization: 'ORG-1',
        site: 'SITE-2',
        syncStatus: 'a6c468a920',
        profile: 'profile-1',
        lastConnected: '2023/02/23 02:55 PM',
        redirectionUrlPath: '#/configure/gateway/device/222222'
      }, // Not synced
      {
        deviceName: 'DBG-3',
        mac: '33:85:4B:ED:A3:CC',
        modelName: 'DBG-X1000',
        organization: 'ORG-1',
        site: 'SITE-3',
        syncStatus: '975c39d988',
        profile: 'profile-1',
        lastConnected: '2023/02/23 03:55 PM',
        redirectionUrlPath: '#/configure/gateway/device/333333'
      }, // Config changed
    ],
  },
  associatedProfiles: {
    title: 'b0c6124637', // Associated profiles,
    status: false,
    modalWidthType: 'modal-500px',
    apThList: [
      { label: 'ece6ec8022', accessor: 'profileName', sortable: true },
      { label: '402d4d2bce', accessor: 'modelName', sortable: true },
      { label: '411d7f1880', accessor: 'accessLevel', sortable: true },
    ],
    switchThList: [
      { label: 'ece6ec8022', accessor: 'profileName', sortable: true },
      { label: 'dd9346945a', accessor: 'modelSeries', sortable: true },
      { label: '411d7f1880', accessor: 'accessLevel', sortable: true },
    ],
    gatewayThList: [
      { label: 'ece6ec8022', accessor: 'profileName', sortable: true },
      { label: '402d4d2bce', accessor: 'modelName', sortable: true },
      { label: '411d7f1880', accessor: 'accessLevel', sortable: true },
    ],
    apTdList: [
      { profileName: 'Profile-1', modelName: 'DBA-1210P', accesslevel: 'c1ca926603' }, // Organization
      { profileName: 'Profile-2', modelName: 'DBA-1210P', accesslevel: 'c101058e7e' }, // Tag
      { profileName: 'Profile-3', modelName: 'DBA-1210P', accesslevel: 'a7d6475ec8' }, // Site
    ],
    switchTdList: [
      { profileName: 'Profile-1', modelName: 'DBS-2000-28', accesslevel: 'c1ca926603' }, // Organization
      { profileName: 'Profile-2', modelName: 'DBS-2000-10MP', accesslevel: 'c101058e7e' }, // Tag
      { profileName: 'Profile-3', modelName: 'DBS-2000-28MP', accesslevel: 'a7d6475ec8' }, // Site
    ],
    gatewayTdList: [
      { profileName: 'Profile-1', modelName: 'DBG-2000', accesslevel: 'c1ca926603' }, // Organization
      { profileName: 'Profile-1', modelName: 'DBG-X1000', accesslevel: 'c101058e7e' }, // Tag
      { profileName: 'Profile-1', modelName: 'DBG-X1000', accesslevel: 'a7d6475ec8' }, // Site
    ],
  },
};

const MacAcls = () => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [isSelectedItem, setIsSelectedItem] = useState({});

  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { ...modalStatus[type], status: value } });
  }, []);

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />

      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        <div className="d-flex justify-content-between mb-2">
          <ButtonGroup>
            <ButtonWithIcon
              label="Add MAC ACL"
              iconClassName="icon-expand"
              onClick={() => changeModalStatus('addMacAcl', true)}
            />
          </ButtonGroup>

          <DropdownWithAdvancedSearch
            value={''}
            alignEnd={true}
            dataBsToggleOnInput={true}
            dataBsToggleOnButton={true}
            dropdownMenuStyle={{ minWidth: 371 }}
            readOnly
            onChange={e => console.log(e.target.value)}
          >
            <li>
              <div className="form-title">Site tag</div>
              <DropdownWithItem
                id="status-dropdown"
                type="normal"
                selectedItem={dropdownSiteTagList[0]}
                itemList={dropdownSiteTagList}
                onClick={() => { }}
              />
            </li>
            <li className="mt-2">
              <div className="form-title">Site</div>
              <DropdownWithItem
                id="status-dropdown"
                type="normal"
                selectedItem={dropdownSiteList[0]}
                itemList={dropdownSiteList}
                onClick={() => { }}
              />
            </li>
          </DropdownWithAdvancedSearch>
        </div>

        <MacAclsTable changeModalStatus={changeModalStatus} setIsSelectedItem={setIsSelectedItem} />

        <PaginationContainer
          total={5}
          onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
          onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
        />

        {/* Add SMS account modal */}
        <AddMacAclsModal modalStatus={modalStatus} changeModalStatus={changeModalStatus} />

        {/* Edit modal */}
        <EditMacAclsModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
          isSelectedItem={isSelectedItem}
        />

        {/* Delete modal */}
        <ConfirmationModalContainer
          modalWidthType="modal-400px"
          title="Delete a SMS configuration"
          description={`Would you like to delete MAC ACL: ${isSelectedItem?.macAclName}`}
          openModal={modalStatus.delete.status}
          closeModal={() => changeModalStatus('delete', false)}
          onConfirm={() => changeModalStatus('delete', false)}
        />

        {/* Associated devices */}
        <AssociatedTableModalContainer
          title={modalStatus.associatedDevices.title}
          modalWidthType={modalStatus.associatedDevices.modalWidthType}
          {...{
            modalStatus,
            setModalStatus,
          }}
          apThList={modalStatus.associatedDevices.apThList}
          switchThList={modalStatus.associatedDevices.switchThList}
          gatewayThList={modalStatus.associatedDevices.gatewayThList}
          apTdList={modalStatus.associatedDevices.apTdList}
          switchTdList={modalStatus.associatedDevices.switchTdList}
          gatewayTdList={modalStatus.associatedDevices.gatewayTdList}
          openModal={modalStatus.associatedDevices.status}
          closeModal={() => changeModalStatus('associatedDevices', false)}
        />

        {/* Associated profiles */}
        <AssociatedTableModalContainer
          title={modalStatus.associatedProfiles.title}
          modalWidthType={modalStatus.associatedProfiles.modalWidthType}
          {...{
            modalStatus,
            setModalStatus,
          }}
          apThList={modalStatus.associatedProfiles.apThList}
          switchThList={modalStatus.associatedProfiles.switchThList}
          gatewayThList={modalStatus.associatedProfiles.gatewayThList}
          apTdList={modalStatus.associatedProfiles.apTdList}
          switchTdList={modalStatus.associatedProfiles.switchTdList}
          gatewayTdList={modalStatus.associatedProfiles.gatewayTdList}
          openModal={modalStatus.associatedProfiles.status}
          closeModal={() => changeModalStatus('associatedProfiles', false)}
        />
      </div>
    </>
  );
};

export default MacAcls;
