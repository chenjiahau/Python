import { useState, useCallback } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

import { deviceType } from 'const/nuclias/device';

// Table & Modal
import AddSchedulePolicyModal from 'cloudUi/Modals/SchedulePolicyModal/AddSchedulePolicyModal';
import EditSchedulePolicyModal from 'cloudUi/Modals/SchedulePolicyModal/EditSchedulePolicyModal';
import SchedulePolicyTable from './SchedulePolicyTable';
import ViewModal from './modals/View';


// Components
import Breadcrumb from 'components/Breadcrumb';
import ButtonWithIcon from 'components/ButtonWithIcon';
import MessageBoxGroup from 'components/MessageBoxGroup';
import PaginationContainer from 'components/PaginationContainer';
import ConfirmationModalContainer from 'components/ConfirmationModalContainer';
import AssociatedTableModal from 'cloudUi/Modals/AssociatedTableModal';

const defaultMessages = {
  success: '',
  error: '',
  warning: ''
};

const defaultMessageTypes = {
  success: 'i18n',
  error: 'i18n',
  warning: 'i18n'
};

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'Schedule policies', isLink: false },
];

const defaultModalStatus = {
  addSchedulePolicy: {
    status: false,
  },
  editSchedulePolicy: {
    status: false,
  },
  viewSchedulePolicy: {
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
      { label: '92394ac496', accessor: 'deviceName', sortable: true },
      { label: '2e25c28535', accessor: 'mac', sortable: true },
      { label: '402d4d2bce', accessor: 'modelName', sortable: true },
      { label: 'c1ca926603', accessor: 'organization', sortable: true },
      { label: 'a7d6475ec8', accessor: 'site', sortable: true },
      { label: '26fe2e18ca', accessor: 'syncStatus', sortable: true },
      { label: '28a9f0e91d', accessor: 'profile', sortable: true },
      { label: '70498e75d8', accessor: 'lastConnected', sortable: true }
    ],
    switchThList: [
      { label: '92394ac496', accessor: 'deviceName', sortable: true },
      { label: '2e25c28535', accessor: 'mac', sortable: true },
      { label: '402d4d2bce', accessor: 'modelName', sortable: true },
      { label: 'c1ca926603', accessor: 'organization', sortable: true },
      { label: 'a7d6475ec8', accessor: 'site', sortable: true },
      { label: '26fe2e18ca', accessor: 'syncStatus', sortable: true },
      { label: '28a9f0e91d', accessor: 'profile', sortable: true },
      { label: '70498e75d8', accessor: 'lastConnected', sortable: true }
    ],
    gatewayThList: [
      { label: '92394ac496', accessor: 'deviceName', sortable: true },
      { label: '2e25c28535', accessor: 'mac', sortable: true },
      { label: '402d4d2bce', accessor: 'modelName', sortable: true },
      { label: 'c1ca926603', accessor: 'organization', sortable: true },
      { label: 'a7d6475ec8', accessor: 'site', sortable: true },
      { label: '26fe2e18ca', accessor: 'syncStatus', sortable: true },
      { label: '28a9f0e91d', accessor: 'profile', sortable: true },
      { label: '70498e75d8', accessor: 'lastConnected', sortable: true }
    ],
    apTdList: [
      { deviceName: 'DBA-1', mac: '11:85:4B:ED:A3:AA', modelName: 'DBA-1210P', organization: 'ORG-1', site: 'SITE-1', syncStatus: '8ae6b98bb5', profile: 'profile-1', lastConnected: '02/23/2023 01:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111111' },   // Synced
      { deviceName: 'DBA-2', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-1510P', organization: 'ORG-2', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-2', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111112' },   // Not synced
      { deviceName: 'DBA-3', mac: '33:85:4B:ED:A3:CC', modelName: 'DBA-2720P', organization: 'ORG-3', site: 'SITE-3', syncStatus: '975c39d988', profile: 'profile-1', lastConnected: '02/23/2023 03:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111113' },   // Config changed
      { deviceName: 'DBA-4', mac: '11:85:4B:ED:A3:AA', modelName: 'DBA-2820P', organization: 'ORG-4', site: 'SITE-1', syncStatus: '8ae6b98bb5', profile: 'profile-3', lastConnected: '02/23/2023 01:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111114' },   // Synced
      { deviceName: 'DBA-5', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-1510P', organization: 'ORG-5', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-1', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111115' },   // Not synced
      { deviceName: 'DBA-6', mac: '33:85:4B:ED:A3:CC', modelName: 'DBA-2720P', organization: 'ORG-1', site: 'SITE-3', syncStatus: '975c39d988', profile: 'profile-4', lastConnected: '02/23/2023 03:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111116' },   // Config changed
      { deviceName: 'DBA-7', mac: '11:85:4B:ED:A3:AA', modelName: 'DBA-1210P', organization: 'ORG-1', site: 'SITE-1', syncStatus: '8ae6b98bb5', profile: 'profile-1', lastConnected: '02/23/2023 01:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111117' },   // Synced
      { deviceName: 'DBA-8', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-1510P', organization: 'ORG-1', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-5', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111118' },   // Not synced
      { deviceName: 'DBA-9', mac: '33:85:4B:ED:A3:CC', modelName: 'DBA-2720P', organization: 'ORG-1', site: 'SITE-3', syncStatus: '975c39d988', profile: 'profile-1', lastConnected: '02/23/2023 03:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111119' },   // Config changed
      { deviceName: 'DBA-10', mac: '11:85:4B:ED:A3:AA', modelName: 'DBA-1210P', organization: 'ORG-1', site: 'SITE-1', syncStatus: '8ae6b98bb5', profile: 'profile-1', lastConnected: '02/23/2023 01:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111120' },  // Synced
      { deviceName: 'DBA-11', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-1510P', organization: 'ORG-1', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-1', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111121' },  // Not synced
      { deviceName: 'DBA-12', mac: '33:85:4B:ED:A3:CC', modelName: 'DBA-2720P', organization: 'ORG-1', site: 'SITE-3', syncStatus: '975c39d988', profile: 'profile-7', lastConnected: '02/23/2023 03:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111122' },  // Config changed
      { deviceName: 'DBA-13', mac: '11:85:4B:ED:A3:AA', modelName: 'DBA-1210P', organization: 'ORG-1', site: 'SITE-1', syncStatus: '8ae6b98bb5', profile: 'profile-1', lastConnected: '02/23/2023 01:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111123' },  // Synced
      { deviceName: 'DBA-14', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-2820P', organization: 'ORG-1', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-2', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111124' },  // Not synced
      { deviceName: 'DBA-15', mac: '33:85:4B:ED:A3:CC', modelName: 'DBA-2720P', organization: 'ORG-1', site: 'SITE-3', syncStatus: '975c39d988', profile: 'profile-1', lastConnected: '02/23/2023 03:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111125' },  // Config changed
      { deviceName: 'DBA-16', mac: '11:85:4B:ED:A3:AA', modelName: 'DBA-1210P', organization: 'ORG-1', site: 'SITE-1', syncStatus: '8ae6b98bb5', profile: 'profile-1', lastConnected: '02/23/2023 01:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111126' },  // Synced
      { deviceName: 'DBA-17', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-1510P', organization: 'ORG-1', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-8', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111127' },  // Not synced
      { deviceName: 'DBA-18', mac: '33:85:4B:ED:A3:CC', modelName: 'DBA-2720P', organization: 'ORG-1', site: 'SITE-3', syncStatus: '975c39d988', profile: 'profile-1', lastConnected: '02/23/2023 03:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111128' },  // Config changed
      { deviceName: 'DBA-19', mac: '11:85:4B:ED:A3:AA', modelName: 'DBA-1210P', organization: 'ORG-1', site: 'SITE-1', syncStatus: '8ae6b98bb5', profile: 'profile-1', lastConnected: '02/23/2023 01:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/111129' },  // Synced
      { deviceName: 'DBA-20', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-1510P', organization: 'ORG-1', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-1', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11130' },  // Not synced
      { deviceName: 'DBA-21', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-2820P', organization: 'ORG-1', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-1', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11131' },  // Not synced
      { deviceName: 'DBA-22', mac: '22:85:4B:ED:A3:EE', modelName: 'DBA-1210P', organization: 'ORG-6', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-1', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11132' },  // Not synced
      { deviceName: 'DBA-23', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-1510P', organization: 'ORG-7', site: 'SITE-3', syncStatus: '8ae6b98bb5', profile: 'profile-1', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11133' },  // Synced
      { deviceName: 'DBA-24', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-2720P', organization: 'ORG-8', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-1', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11134' },  // Not synced
      { deviceName: 'DBA-25', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-1210P', organization: 'ORG-9', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-8', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11135' },  // Not synced
      { deviceName: 'DBA-26', mac: '22:85:4B:ED:A3:DD', modelName: 'DBA-2720P', organization: 'ORG-1', site: 'SITE-3', syncStatus: 'a6c468a920', profile: 'profile-9', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11136' },  // Not synced
      { deviceName: 'DBA-27', mac: '22:85:4B:ED:A3:FF', modelName: 'DBA-1510P', organization: 'ORG-1', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-1', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11137' },  // Not synced
      { deviceName: 'DBA-28', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-2820P', organization: 'ORG-1', site: 'SITE-1', syncStatus: 'a6c468a920', profile: 'profile-10', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11138' }, // Not synced
      { deviceName: 'DBA-29', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-1510P', organization: 'ORG-1', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-11', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11139' }, // Not synced
      { deviceName: 'DBA-30', mac: '22:85:4B:ED:A3:BB', modelName: 'DBA-1510P', organization: 'ORG-11', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-1', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11140' }, // Not synced
      { deviceName: 'DBA-31', mac: '22:85:4B:ED:A3:CC', modelName: 'DBA-2720P', organization: 'ORG-10', site: 'SITE-2', syncStatus: '8ae6b98bb5', profile: 'profile-1', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11141' }, // Synced
      { deviceName: 'DBA-32', mac: '22:85:4B:ED:A3:DD', modelName: 'DBA-2820P', organization: 'ORG-15', site: 'SITE-2', syncStatus: '8ae6b98bb5', profile: 'profile-1', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/access-point/device/11142' }, // Synced
    ],
    switchTdList: [
      // {deviceName: 'DBS-1', mac: '11:85:4B:ED:A3:AA', modelName: 'DBS-2000-28', organization: 'ORG-1', site: 'SITE-1', syncStatus: '8ae6b98bb5', profile: 'profile-1', lastConnected: '02/23/2023 01:55 PM'},    // Synced
      // {deviceName: 'DBS-2', mac: '22:85:4B:ED:A3:BB', modelName: 'DBS-2000-10MP', organization: 'ORG-1', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-1', lastConnected: '02/23/2023 02:55 PM'},  // Not synced
      // {deviceName: 'DBS-3', mac: '33:85:4B:ED:A3:CC', modelName: 'DBS-2000-28MP', organization: 'ORG-1', site: 'SITE-3', syncStatus: '975c39d988', profile: 'profile-1', lastConnected: '02/23/2023 03:55 PM'},  // Config changed
    ],
    gatewayTdList: [
      { deviceName: 'DBG-1', mac: '11:85:4B:ED:A3:AA', modelName: 'DBG-2000', organization: 'ORG-1', site: 'SITE-1', syncStatus: '8ae6b98bb5', profile: 'profile-1', lastConnected: '02/23/2023 01:55 PM', redirectionUrlPath: '#/cloud/configure/gateway/device/111111' },  // Synced
      { deviceName: 'DBG-2', mac: '22:85:4B:ED:A3:BB', modelName: 'DBG-X1000', organization: 'ORG-2', site: 'SITE-2', syncStatus: 'a6c468a920', profile: 'profile-2', lastConnected: '02/23/2023 02:55 PM', redirectionUrlPath: '#/cloud/configure/gateway/device/111112' }, // Not synced
      { deviceName: 'DBG-3', mac: '33:85:4B:ED:A3:CC', modelName: 'DBG-X1000', organization: 'ORG-3', site: 'SITE-3', syncStatus: '975c39d988', profile: 'profile-3', lastConnected: '02/23/2023 03:55 PM', redirectionUrlPath: '#/cloud/configure/gateway/device/111113' }, // Config changed
    ]
  },
  associatedProfiles: {
    title: 'b0c6124637',  // Associated profiles,
    status: false,
    modalWidthType: 'modal-500px',
    apThList: [
      { label: 'ece6ec8022', accessor: 'profileName', sortable: true },
      { label: '402d4d2bce', accessor: 'modelName', sortable: true },
      { label: '411d7f1880', accessor: 'accessLevel', sortable: true }
    ],
    switchThList: [
      { label: 'ece6ec8022', accessor: 'profileName', sortable: true },
      { label: 'dd9346945a', accessor: 'modelSeries', sortable: true },
      { label: '411d7f1880', accessor: 'accessLevel', sortable: true }
    ],
    gatewayThList: [
      { label: 'ece6ec8022', accessor: 'profileName', sortable: true },
      { label: '402d4d2bce', accessor: 'modelName', sortable: true },
      { label: '411d7f1880', accessor: 'accessLevel', sortable: true }
    ],
    apTdList: [
      { profileName: 'Profile-1', modelName: 'DBA-1210P', accessLevel: 'c1ca926603' },  // Organization
      { profileName: 'Profile-2', modelName: 'DBA-1210P', accessLevel: 'c101058e7e' },  // Tag
      { profileName: 'Profile-3', modelName: 'DBA-1210P', accessLevel: 'a7d6475ec8' },  // Site
    ],
    switchTdList: [
      { profileName: 'Profile-1', modelName: 'DBS-2000-28', accessLevel: 'c1ca926603' },    // Organization
      { profileName: 'Profile-2', modelName: 'DBS-2000-10MP', accessLevel: 'c101058e7e' },  // Tag
      { profileName: 'Profile-3', modelName: 'DBS-2000-28MP', accessLevel: 'a7d6475ec8' },  // Site
    ],
    gatewayTdList: [
      { profileName: 'Profile-1', modelName: 'DBG-2000', accessLevel: 'c1ca926603' },   // Organization
      { profileName: 'Profile-2', modelName: 'DBG-X1000', accessLevel: 'c101058e7e' },  // Tag
      { profileName: 'Profile-3', modelName: 'DBG-X1000', accessLevel: 'a7d6475ec8' },  // Site
    ]
  }
};

const SchedulePolicies = () => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });
  const [isSelectedItem, setIsSelectedItem] = useState({});
  const [scheduleName, setScheduleName] = useState('');
  const [scheduleDayDate, setScheduleDayDate] = useState(null);
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [messagesTypes, setMessagesTypes] = useState(cloneDeep(defaultMessageTypes));

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
        <div className="d-flex justify-content-between">
          <div className='d-flex align-self-center mb-2'>
            <ButtonGroup>
              <ButtonWithIcon
                label="Add schedule policy"
                iconClassName="icon-expand"
                onClick={() => changeModalStatus('addSchedulePolicy', true)}
              ></ButtonWithIcon>
            </ButtonGroup>
          </div>
          <div>
          </div>

        </div>

        <SchedulePolicyTable
          changeModalStatus={changeModalStatus}
          setIsSelectedItem={setIsSelectedItem}
          setScheduleName={setScheduleName}
          setScheduleDayDate={setScheduleDayDate}
        />

        <PaginationContainer
          total={3}
          onPageChange={currentPageNum =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={currentPageNum =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />

        {/* Add RadiusServer modal */}
        <AddSchedulePolicyModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        {/* Edit RadiusServer modal */}
        <EditSchedulePolicyModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
          isSelectedItem={isSelectedItem}
        />

        <ViewModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
          scheduleName={scheduleName}
          setScheduleDayDate={setScheduleDayDate}
          scheduleDayDate={scheduleDayDate}
        />

        {/* Delete modal */}
        <ConfirmationModalContainer
          modalWidthType="modal-400px"
          title="Delete a schedule policy"
          description="Do you want to delete?"
          openModal={modalStatus.delete.status}
          closeModal={() => changeModalStatus('delete', false)}
          onConfirm={() => changeModalStatus('delete', false)}
        />

        {/* Associated Devices */}
        <AssociatedTableModal
          title={modalStatus.associatedDevices.title}
          modalWidthType={modalStatus.associatedDevices.modalWidthType}
          {...{
            modalStatus,
            setModalStatus
          }}
          // hiddenTabList={[deviceType.ap, deviceType.switch, deviceType.gateway]} // Default hidden tab.
          // defaultDisplayTable={deviceType.gateway}                               // Default displaying table.
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
        <AssociatedTableModal
          title={modalStatus.associatedProfiles.title}
          modalWidthType={modalStatus.associatedProfiles.modalWidthType}
          {...{
            modalStatus,
            setModalStatus
          }}
          // hiddenTabList={[deviceType.ap]}          // Default hidden tab.
          // defaultDisplayTable={deviceType.switch}  // Default displaying table.
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

export default SchedulePolicies;
