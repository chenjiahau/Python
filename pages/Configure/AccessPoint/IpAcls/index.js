import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// UI
import ConfirmDeleteModal from 'cloudUi/Modals/ConfirmDeleteModal';

// Component
import Breadcrumb from 'components/Breadcrumb';
import MessageBoxGroup from 'components/MessageBoxGroup';
import DropdownWithItem from 'components/DropdownWithItem';
import PaginationContainer from 'components/PaginationContainer';
import DropdownWithAdvancedSearch from 'components/DropdownWithAdvancedSearch';
import LinkerWithA from 'components/LinkerWithA';
import TooltipDialogFixed from 'components/TooltipDialogFixed';
import ButtonAction from 'components/ButtonAction';
import ButtonWithIcon from 'components/ButtonWithIcon';

import AddIpAclModal from 'cloudUi/Modals/IpAclsModal/AddIpAclModal';
import EditIpAclModel from 'cloudUi/Modals/IpAclsModal/EditIpAclModal';

// Dummy data & util
import { generateSiteList } from 'dummy/data/site';
import { generateSiteTagList } from 'dummy/data/sitetag';
import { getIpAclList } from 'dummy/data/ip-acl';
import { sorting } from 'dummy/utils/sorting';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'Access point', isLink: false },
  { label: 'IP ACLs', isLink: false },
];

const defaultModalStatus = {
  addIpAcl: {
    self: 'addIpAcl',
    status: false,
  },
  editIpAcl: {
    self: 'editIpAcl',
    status: false,
  },
  deleteIpAcl: {
    self: 'deleteIpAcl',
    status: false,
  }
};

const IpAcls = () => {
  // Faker API data
  const fakerIpAclList = getIpAclList(false);

  // State
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [siteList, setSiteList] = useState(generateSiteList());
  const [siteTagList, setSiteTagList] = useState(generateSiteTagList());
  const [ipAclList, setIpAclList] = useState([]);
  const [selectedIpAcl, setSelectedIpAcl] = useState();

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const getAccessLevelSiteTag = (siteTagId) => siteTagList.filter(siteTag => siteTag.id === siteTagId)[0].title;
  const getAccessLevelSite = (siteId) => siteList.filter(site => site.id === siteId)[0].title;
  const getAccessLevelTooltipContent = (siteIdList) => {
    const tableAccessLevelData = [];
    for (const siteId of siteIdList) {
      tableAccessLevelData.push(siteList.filter(site => site.id === +siteId)[0]);
    }

    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Site</th>
          </tr>
        </thead>
        <tbody>
          {tableAccessLevelData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const deleteIpAcl = (ipAcl) => {

  }

  // Side effect
  useEffect(() => {
    for (const ipAcl of fakerIpAclList) {
      if (ipAcl.accessLevel === 'Site tag') {
        ipAcl.siteTagTitle = siteTagList.filter(siteTag => siteTag.id === ipAcl.siteTagId)[0].title;
      }

      if (ipAcl.accessLevel === 'Site') {
        ipAcl.siteTitle = siteList.filter(site => site.id === ipAcl.siteId)[0].title;
      }
    }

    setIpAclList(cloneDeep(fakerIpAclList));
  }, []);

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />

      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />

        <div className="d-flex justify-content-between mb-2">
          <ButtonGroup>
            <ButtonWithIcon
              label="Add IP ACL"
              iconClassName="icon-expand"
              onClick={() => {
                setSelectedIpAcl(null);
                changeModalStatus(modalStatus.addIpAcl.self, true)
              }}
            />
          </ButtonGroup>

          <DropdownWithAdvancedSearch
            value={''}
            readOnly={true}
            alignEnd={true}
            dataBsToggleOnButton={true}
            dropdownMenuStyle={{ minWidth: 371 }}
            onChange={e => console.log(e.target.value)}
          >
            <li className="mt-2">
              <div className="form-title">Site tag</div>
              <DropdownWithItem
                id="status-dropdown"
                type="normal"
                selectedItem={siteTagList[0]}
                itemList={siteTagList}
                onClick={() => { }}
              />
            </li>
            <li className="mt-2">
              <div className="form-title">Site</div>
              <DropdownWithItem
                id="status-dropdown"
                type="normal"
                selectedItem={siteList[0]}
                itemList={siteList}
                onClick={() => { }}
              />
            </li>
          </DropdownWithAdvancedSearch>
        </div>

        <Table responsive striped hover className="table-container" id="device-list-table" style={{ position: 'relative' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <LinkerWithA
                  label="Name"
                  className="text-decoration-none"
                  onClick={e => sorting(e, ipAclList, 'title', setIpAclList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Access level"
                  className="text-decoration-none"
                  onClick={e => sorting(e, ipAclList, 'accessLevel', setIpAclList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Enties"
                  className="text-decoration-none"
                  onClick={e => sorting(e, ipAclList, 'enties', setIpAclList)}
                />
              </th>
              <th className={'table-action-th'}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              ipAclList && ipAclList.map((ipAcl, index) => {
                const key = `ip-acl-${index}`;

                return (
                  <tr key={key}>
                    <td>{index + 1}</td>
                    <td>{ipAcl['title']}</td>
                    <td>
                      {
                        ipAcl.accessLevel === 'Organization' && (
                          <>
                            Organization
                          </>
                        )
                      }
                      {
                        ipAcl.accessLevel === 'Site tag' && (
                          <>
                            Site tag (
                            <TooltipDialogFixed
                              placement="right"
                              title={ReactDOMServer.renderToString(getAccessLevelTooltipContent(ipAcl.siteIdList))}
                              hideIcon={true}
                              tooltipsTitle={getAccessLevelSiteTag(ipAcl.siteTagId)}
                            />
                            )
                          </>
                        )
                      }
                      {
                        ipAcl.accessLevel === 'Site' && (
                          <>
                            Site ({getAccessLevelSite(ipAcl.siteId)})
                          </>
                        )
                      }
                    </td>
                    <td>{ipAcl.enties}</td>
                    <td className='table-action-td'>
                      <ButtonAction
                        label="EDIT"
                        title="EDIT"
                        iconClassName="icon-edit"
                        onClick={() => {
                          setSelectedIpAcl(ipAcl);
                          changeModalStatus(modalStatus.editIpAcl.self, true);
                        }}
                      />
                      <ButtonAction
                        label="EXPORT"
                        title="EXPORT"
                        iconClassName="icon-download"
                        onClick={() => console.log('click export')}
                      />
                      <ButtonAction
                        label="DELETE"
                        title="DELETE"
                        iconClassName="icon-trash"
                        onClick={() => {
                          setSelectedIpAcl(ipAcl);
                          changeModalStatus(modalStatus.deleteIpAcl.self, true)
                        }}
                      />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        <PaginationContainer
          total={ipAclList.length}
          onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
          onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
        />
      </div>

      <AddIpAclModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedIpAcl={selectedIpAcl}
        siteTagList={siteTagList}
        siteList={siteList}
      />

      <EditIpAclModel
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedIpAcl={selectedIpAcl}
      />

      {
        selectedIpAcl && (
          <ConfirmDeleteModal
            modalKey={modalStatus.deleteIpAcl.self}
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
            title='Delete IP ACL'
            description={`Would you like to delete IP ACL: ${selectedIpAcl.title}`}
            execute={() => { console.log('Write down your execution code') }}
            successCallback={() => deleteIpAcl()}
          />
        )
      }
    </>
  )
}

export default IpAcls