import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Dummy data & util
import { generateSiteTagList } from 'dummy/data/sitetag';
import { generateSiteList } from 'dummy/data/site';
import { generateSplashPageList } from 'dummy/data/splash-page';
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { sorting } from 'dummy/utils/sorting';

// Const
import { deviceType } from 'const/nuclias/device';

// UI
import AssociatedTableModalContainer from 'ui/Modals/AssociatedTableModal';

// Component
import {
  Breadcrumb, Button, LinkerWithA, PaginationContainer, MessageBoxGroup,
  ButtonAction,
} from 'components/';

import AddSplashPageModal from './AddSplashPageModal';
import EditSplashPageModal from './EditSplashPageModal';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'Splash pages', isLink: false }
];

const defaultModalStatus = {
  addSplashPage: {
    self: 'addSplashPage',
    status: false
  },
  editSplashPage: {
    self: 'editSplashPage',
    status: false
  },
  deleteSplashPage: {
    self: 'deleteSplashPage',
    status: false
  },

  associatedDevices: {
    self: 'associatedDevices',
    title: '9739b717cc',
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
  },
  associatedProfiles: {
    self: 'associatedProfiles',
    title: 'b0c6124637',
    status: false,
    modalWidthType: 'modal-550px',
    apThList: [
      { label: 'ece6ec8022', accessor: 'profileName', sortable: true },
      { label: '402d4d2bce', accessor: 'modelName', sortable: true },
      { label: '411d7f1880', accessor: 'accessLevel', sortable: true },
    ],
    gatewayThList: [
      { label: 'ece6ec8022', accessor: 'profileName', sortable: true },
      { label: '402d4d2bce', accessor: 'modelName', sortable: true },
      { label: '411d7f1880', accessor: 'accessLevel', sortable: true },
    ],
  },
};

const styleDefinition = ['Template', 'Classic HTML'];
const authenticationDefinition = [
  'Click-through',
  'Sign-on with basic login',
  'Sign-on with basic login and third party credentials',
  'Sign-on with email authentication, SMS authentication and third party credentials',
  'Sign-on with SMS authentication',
  'Sign-on with third party credentials'
];
const cloneFromDefinition = [
  'Default',
  'Default(Japanese)',
];

const SplashPages = () => {
  const navigate = useNavigate();

  // Fake API data
  const fakeSiteTags = generateSiteTagList(10);
  const fakeSites = generateSiteList(10);
  const fakeSplashPages = generateSplashPageList();

  // State
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [siteTags, setSiteTags] = useState([]);
  const [sites, setSites] = useState([]);
  const [splashPages, setSplashPages] = useState([]);
  const [selectedAssociatedDevices, setSelectedAssociatedDevices] = useState([]);
  const [selectedAssociatedProfiles, setSelectedAssociatedProfiles] = useState([]);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const openAssociatedDevicesModal = (associatedDevices) => {
    const updatedSelectedAssociatedDevices = {
      ap: [],
      gw: []
    };

    for (const device of associatedDevices) {
      if (device.modelName.indexOf('DBA') > -1) {
        updatedSelectedAssociatedDevices.ap.push({
          deviceName: device.name,
          mac: device.macAddress,
          modelName: device.modelName,
          organization: 'Org',
          site: device.site,
          syncStatus: device.syncStatus,
          profile: device.profile,
          lastConnected: device.lastSeen,
          redirectionUrlPath: `#/configure/access-point/device/${3}`
        });
      } else {
        updatedSelectedAssociatedDevices.gw.push({
          deviceName: device.name,
          mac: device.macAddress,
          modelName: device.modelName,
          organization: 'Org',
          site: device.site,
          syncStatus: device.syncStatus,
          profile: device.profile,
          lastConnected: device.lastSeen,
          redirectionUrlPath: `#/configure/gateway/device/${3}`
        })
      }
    }

    setSelectedAssociatedDevices(updatedSelectedAssociatedDevices);
    changeModalStatus(modalStatus.associatedDevices.self, true);
  }

  const openAssociatedProfilesModal = (associatedProfiles) => {
    const updatedSelectedAssociatedProfiles = {
      ap: [],
      gw: []
    };

    for (const profile of associatedProfiles) {
      if (profile.modelName.indexOf('DBA') > -1) {
        updatedSelectedAssociatedProfiles.ap.push({
          profileName: profile.title,
          modelName: profile.modelName,
          accesslevel: profile.accessLevel
        });
      } else {
        updatedSelectedAssociatedProfiles.gw.push({
          profileName: profile.title,
          modelName: profile.modelName,
          accesslevel: profile.accessLevel
        });
      }
    }

    setSelectedAssociatedProfiles(updatedSelectedAssociatedProfiles);
    changeModalStatus(modalStatus.associatedProfiles.self, true);
  }

  const editSplashPage = (splashPage) => {
    if (splashPage.isNewVersion) {
      changeModalStatus('editSplashPage', true);
    } else {
      navigate(`/cloud/configure/splash-pages/edit?id=${splashPage.id}`)
    }
  }

  const openEditSplashPageModal = () => {
    const updatedModalStatus = cloneDeep(modalStatus);

    for (const key in updatedModalStatus) {
      if (key === 'editSplashPage') {
        updatedModalStatus[key].status = true;
      } else {
        updatedModalStatus[key].status = false;
      }
    }

    setModalStatus(updatedModalStatus);
  }

  // Side effect
  useEffect(() => {
    setSiteTags(fakeSiteTags);
    setSites(fakeSites);
    setSplashPages(fakeSplashPages);
  }, []);

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <div className='layout-container layout-container--column layout-container--fluid'>
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />

        <div className='d-flex justify-content-between mb-2'>
          <ButtonGroup>
            <Button
              label='Add Splash Page'
              onClick={() => changeModalStatus(modalStatus.addSplashPage.self, true)}
            />
          </ButtonGroup>
        </div>

        <Table responsive striped hover className='table-container' id='device-list-table' style={{ position: 'relative' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <LinkerWithA
                  label='Splash page name'
                  className='text-decoration-none'
                  onClick={e => sorting(e, splashPages, 'splashPageName', setSplashPages)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Authentication types'
                  className='text-decoration-none'
                  onClick={e => sorting(e, splashPages, 'authenticationTypes', setSplashPages)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Access level'
                  className='text-decoration-none'
                  onClick={e => sorting(e, splashPages, 'accessLevel', setSplashPages)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Storage'
                  className='text-decoration-none'
                  onClick={e => sorting(e, splashPages, 'storage', setSplashPages)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Associated devices'
                  className='text-decoration-none'
                  onClick={e => sorting(e, splashPages, 'associatedDevices.length', setSplashPages)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Associated profiles'
                  className='text-decoration-none'
                  onClick={e => sorting(e, splashPages, 'associatedProfiles.length', setSplashPages)}
                />
              </th>
              <th className='table-action-th'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              splashPages.map((item, index) => {
                return (
                  <tr key={`splash-page--${index}`}>
                    <td>{index + 1}</td>
                    <td>{item.splashPageName}</td>
                    <td>{item.authenticationTypes}</td>
                    <td>{item.accessLevel}</td>
                    <td>{item.storage}</td>
                    <td>
                      {
                        item.associatedDevices.length === 0 ? (
                          <>0</>
                        ) : (
                          <>
                            <span
                              className='text-decoration-underline table-not-link'
                              onClick={() => openAssociatedDevicesModal(item.associatedDevices)}
                            >
                              {item.associatedDevices.length}
                            </span>
                          </>
                        )
                      }
                    </td>
                    <td>
                      {
                        item.associatedProfiles.length === 0 ? (
                          <>0</>
                        ) : (
                          <>
                            <span
                              className='text-decoration-underline table-not-link'
                              onClick={() => openAssociatedProfilesModal(item.associatedProfiles)}
                            >
                              {item.associatedProfiles.length}
                            </span>
                          </>
                        )
                      }
                    </td>
                    <td className='table-action-td'>
                      <ButtonAction
                        label='EDIT'
                        title='EDIT'
                        iconClassName='icon-edit'
                        onClick={() => editSplashPage(item)}
                      />
                      <ButtonAction
                        label='DELETE'
                        title='DELETE'
                        iconClassName='icon-trash'
                        onClick={() => changeModalStatus('deleteSplashPage', true)}
                      />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>

        <PaginationContainer
          total={splashPages.length}
          onPageChange={currentPageNum =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={currentPageNum =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />
      </div >

      <AssociatedTableModalContainer
        title={modalStatus.associatedDevices.title}
        modalWidthType={modalStatus.associatedDevices.modalWidthType}
        {...{
          modalStatus,
          setModalStatus,
        }}
        hiddenTabList={[deviceType.switch]}
        apThList={modalStatus.associatedDevices.apThList}
        gatewayThList={modalStatus.associatedDevices.gatewayThList}
        apTdList={selectedAssociatedDevices.ap}
        gatewayTdList={selectedAssociatedDevices.gw}
        openModal={modalStatus.associatedDevices.status}
        closeModal={() => changeModalStatus('associatedDevices', false)}
      />

      <AssociatedTableModalContainer
        title={modalStatus.associatedProfiles.title}
        modalWidthType={modalStatus.associatedProfiles.modalWidthType}
        {...{
          modalStatus,
          setModalStatus,
        }}
        hiddenTabList={[deviceType.switch]}
        apThList={modalStatus.associatedProfiles.apThList}
        gatewayThList={modalStatus.associatedProfiles.gatewayThList}
        apTdList={selectedAssociatedProfiles.ap}
        gatewayTdList={selectedAssociatedProfiles.gw}
        openModal={modalStatus.associatedProfiles.status}
        closeModal={() => changeModalStatus('associatedProfiles', false)}
      />

      <AddSplashPageModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        styleDefinition={styleDefinition}
        authenticationDefinition={authenticationDefinition}
        cloneFromDefinition={cloneFromDefinition}
        siteTags={siteTags}
        sites={sites}
        openEditSplashPageModal={openEditSplashPageModal}
      />

      <EditSplashPageModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </>
  );
}

export default SplashPages;