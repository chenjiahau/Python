import mainStyle from './org-management.module.scss';

import { useState, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import { cloneDeep } from 'lodash';

// Components
import MessageBoxGroup from 'components/MessageBoxGroup';
import Breadcrumb from '../../../components/Breadcrumb';

// Sub compoent
import OrgTreeToolbarBox from './OrgTreeToolbarBox';
import OrgManagementCreateSite from './modals/OrgManagementCreateSite';
import OrgManagementCreateSiteTag from './modals/OrgManagementCreateSiteTag';
import OrgTreeTreeView from './OrgTreeTreeView';
import OrgTreeTableView from './OrgTreeTableView';
import OrgManagementEditOrg from './modals/OrgManagementEditOrg';
import OrgManagementEditSiteTag from './modals/OrgManagementEditSiteTag';
import OrgManagementEditSite from './modals/OrgManagementEditSite';
import OrgTreePreviewOrg from './modals/OrgTreePreviewOrg';
import OrgTreePreviewSiteTag from './modals/OrgTreePreviewSiteTag';
import OrgTreePreviewSite from './modals/OrgTreePreviewSite';
import ConfirmationModalContainer from 'components/ConfirmationModalContainer';
import ResultModalContainer from 'components/ResultModalContainer';

const fakeResultsThList = ['ec53a8c4f0', '92394ac496', '3ec365dd53']; // Status, Device name, Details

const fakeResults = [
  {
    requriedStatusType: 'success',
    status: '30ae8fff88', // Success
    target: 'DBA-01',
    details: '263c0d8725', // Successfully
  },
  {
    requriedStatusType: 'error',
    status: 'd7c8c85bf7', // Failed
    target: 'DBA-02',
    details: '5e3026f80d' // Device unregistered
  },
];

const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: '6525f0afe7', isLink: false }, // Settings
  { label: '85827d89ef', isLink: true, path: '/cloud/settings/organization?userlevel=msp' }, // Organization management
  { label: 'ORG-1', isLink: false } // Org name
];

const defaultModalStatus = {
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
  editSiteTag: {
    label: 'cffa3aa8fc', // Edit site tag
    status: false,
    disabled: false
  },
  editSite: {
    label: '073ce392de', // Edit site
    status: false,
    disabled: false
  },
  previewOrg: {
    label: 'c1ca926603', // Organization
    status: false,
    disabled: false
  },
  previewTag: {
    label: '3039a00fca', // Site tag
    status: false,
    disabled: false
  },
  previewSite: {
    label: 'a7d6475ec8', // Site
    status: false,
    disabled: false
  },
  result: {
    label: null,
    status: false,
    disabled: false
  },
  deleteOrg: {
    label: '19dc1dd107', // "Delete organizaiton
    getDescription: () => {
      return (
        <>
          <div>All devices and licenses under this organization will be deleted and returned to MSP inventory and license management.</div>
          <div>Would you like to delete organization?</div>
          <div>(Please wait a few minutes for the changes to take effect.)</div>
        </>
      )
    },
    status: false,
    disabled: false
  },
  deleteSiteTag: {
    label: 'e4e083d139', // "Delete site tag
    getDescription: () => {
      return (
        <>
          <div>All devices and licenses under this site will be deleted and returned to MSP inventory and license management.</div>
          <div>Would you like to delete site tag?</div>
          <div>(Please wait a few minutes for the changes to take effect.)</div>
        </>
      )
    },
    status: false,
    disabled: false
  },
  deleteSite: {
    label: '47f0cc1620', // "Delete site
    getDescription: () => {
      return (
        <>
          <div>All devices and licenses under this site will be deleted and returned to MSP inventory and license management.</div>
          <div>Would you like to delete site?</div>
          <div>(Please wait a few minutes for the changes to take effect.)</div>
        </>
      )
    },
    status: false,
    disabled: false
  }
};

const OrganizationTree = props => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [isTreeView, setIsTreeView] = useState(true);
  const [seachValue, setSearchValue] = useState(null);
  const [isCollapseAll, setCollapseAll] = useState(false);
  const { orgId } = props; // can get org id.

  const changeModalStatus = useCallback((type, status) => {
    const tmpModalStatus = { ...modalStatus };
    tmpModalStatus[type].status = status;
    setModalStatus(tmpModalStatus);
  }, []);

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <div className={`layout-container layout-container--column layout-container--fluid ${mainStyle['org-tree-msp']}`}>

        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        <OrgTreeToolbarBox
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
          isTreeView={isTreeView}
          setIsTreeView={setIsTreeView}
          seachValue={seachValue}
          setSearchValue={setSearchValue}
          setCollapseAll={setCollapseAll}
        />

        {
          isTreeView &&
          <OrgTreeTreeView
            isCollapseAll={isCollapseAll}
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
          />
        }

        {
          !isTreeView &&
          <OrgTreeTableView
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
          />
        }

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

        <OrgManagementEditSiteTag
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <OrgManagementEditSite
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <OrgTreePreviewOrg
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <OrgTreePreviewSiteTag
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <OrgTreePreviewSite
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        <ResultModalContainer
          thList={fakeResultsThList}
          results={fakeResults}
          onDownload={() => console.log('onDownload')}
          openModal={modalStatus.result.status}
          closeModal={() => changeModalStatus('result', false)}
        />

        <ConfirmationModalContainer
          modalWidthType="modal-400px"
          title={modalStatus.deleteOrg.label}
          description={ReactDOMServer.renderToString(modalStatus.deleteOrg.getDescription())}
          openModal={modalStatus.deleteOrg.status}
          closeModal={() => changeModalStatus('deleteOrg', false)}
          onConfirm={() => changeModalStatus('deleteOrg', false)}
        />

        <ConfirmationModalContainer
          modalWidthType="modal-400px"
          title={modalStatus.deleteSiteTag.label}
          description={ReactDOMServer.renderToString(modalStatus.deleteSiteTag.getDescription())}
          openModal={modalStatus.deleteSiteTag.status}
          closeModal={() => changeModalStatus('deleteSiteTag', false)}
          onConfirm={() => changeModalStatus('deleteSiteTag', false)}
        />

        <ConfirmationModalContainer
          modalWidthType="modal-400px"
          title={modalStatus.deleteSite.label}
          description={ReactDOMServer.renderToString(modalStatus.deleteSite.getDescription())}
          openModal={modalStatus.deleteSite.status}
          closeModal={() => changeModalStatus('deleteSite', false)}
          onConfirm={() => changeModalStatus('deleteSite', false)}
        />

      </div>
    </>
  );
};

export default OrganizationTree;
