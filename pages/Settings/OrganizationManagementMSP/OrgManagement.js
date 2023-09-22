import mainStyle from './org-management.module.scss';

import { useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';

// Components
import MessageBoxGroup from 'components/MessageBoxGroup';
import Breadcrumb from '../../../components/Breadcrumb';

// Sub compoent
import OrgManagementTableToolbarBox from './OrgManagementTableToolbarBox';
import OrgManagementTable from './OrgManagementTable';
import OrgManagementCreateOrg from './modals/OrgManagementCreateOrg';
import OrgManagementCreateSiteTag from './modals/OrgManagementCreateSiteTag';
import OrgManagementCreateSite from './modals/OrgManagementCreateSite';
import OrgManagementEditOrg from './modals/OrgManagementEditOrg';
import OrgManagementInviteUser from './modals/OrgManagementInviteUser';
import OrgManagementDeleteOrg from './modals/OrgManagementDeleteOrg';
import OrgManagementGenerateModal from './modals/OrgManagementGenerateModal';

const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: '6525f0afe7', isLink: false }, // Settings
  { label: '85827d89ef', isLink: false } // Organization management
];

const defaultModalStatus = {
  createOrg: {
    label: '022a09a55b', // Create organization
    status: false,
    disabled: false
  },
  createSiteTag: {
    label: 'cd5ff8bec4', // Create site tag
    status: false,
    disabled: false
  },
  createSite: {
    label: 'fa111d766b', // Create site
    status: false,
    disabled: false
  },
  editOrg: {
    label: '3496e5388a', // Edit organization
    status: false,
    disabled: false
  },
  editMsp: {
    label: 'c311c07584', // Edit MSP
    status: false,
    disabled: false
  },
  inviteUserMSP: {
    label: '440a99b2ea', // Invite user MSP
    status: false,
    disabled: false
  },
  inviteUserORG: {
    label: '440a99b2ea', // Invite user ORG
    status: false,
    disabled: false
  },
  deleteOrg: {
    label: '19dc1dd107', // Delete organization
    status: false,
    disabled: false
  },
  generate: {
    label: 'de3e350386', // Generate
    status: false,
    disabled: false
  }
};

const OrgManagement = () => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const changeModalStatus = useCallback((type, status) => {
    const tmpModalStatus = { ...modalStatus };
    tmpModalStatus[type].status = status;
    setModalStatus(tmpModalStatus);
  }, []);

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <div className={`layout-container layout-container--column layout-container--fluid ${mainStyle['org-management-msp']}`}>

        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        <OrgManagementTableToolbarBox
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <OrgManagementTable
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <OrgManagementCreateOrg
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <OrgManagementCreateSiteTag
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <OrgManagementCreateSite
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <OrgManagementEditOrg
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <OrgManagementInviteUser
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <OrgManagementDeleteOrg
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <OrgManagementGenerateModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />


      </div>
    </>
  );
};

export default OrgManagement;
