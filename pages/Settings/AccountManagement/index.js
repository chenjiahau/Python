import accountManagementStyle from './account-management.module.css';

import { useState, useCallback } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import { Link } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Breadcrumb from '../../../components/Breadcrumb';
import LinkerWithA from '../../../components/LinkerWithA';
import TooltipDialogFixed from '../../../components/TooltipDialogFixed';
import PaginationContainer from '../../../components/PaginationContainer';
import DropdownWithAdvancedSearch from '../../../components/DropdownWithAdvancedSearch';
import MessageBoxGroup from 'components/MessageBoxGroup';

// Table & Modal
import InviteUserModal from './modals/InviteUserModal';
import DeleteModal from './modals/DeleteModal';
import EditUserModal from './modals/EditUserModal';
import ResendModal from './modals/ResendModal';

const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: 'Settings', isLink: false },
  { label: 'Account management', isLink: false },
];

const defaultModalStatus = {
  inviteUser: {
    status: false,
    disabled: false,
  },
  delete: {
    status: false,
    disabled: false,
  },
  edit: {
    status: false,
    disabled: false,
  },
  resend: {
    status: false,
    disabled: false,
  }
};

const defaultCheckboxlist = [
  { type: 'all', checked: false },
  { type: 'first', checked: false },
  { type: 'second', checked: false },
  { type: 'third', checked: false }
];


const AccountManagement = () => {
  const [messages, setMessages] = useState({ ...defaultMessages });
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });
  const [checkboxlist, setCheckboxlist] = useState(defaultCheckboxlist);
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  const sorting = e => {
    // NEED TO DO : put this into public function.
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  const changeCheckbox = (type, value) => {
    const newCheckboxlist = [...checkboxlist]
    if (type === 'all') {
      for (let item of newCheckboxlist) {
        item.checked = value;
      }
      setCheckboxlist(newCheckboxlist);
    }
    else {
      for (let item of newCheckboxlist) {
        if (item.type === type) {
          item.checked = value;
        }
      }
      if (newCheckboxlist[1].checked && newCheckboxlist[2].checked && newCheckboxlist[3].checked) {
        newCheckboxlist[0].checked = true
      } else {
        newCheckboxlist[0].checked = false
      }
      setCheckboxlist(newCheckboxlist);
    }
  }

  const checkDeleteDisabeled = () => {
    const result = checkboxlist.some(item => item.checked === true);
    return !result
  }

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
        {/* Account management */}
        <div className="mb-5">
          <div className="d-flex justify-content-between mb-2">
            <ButtonGroup>
              <Button
                label="Invite user"
                onClick={() => {
                  changeModalStatus('inviteUser', true);
                }}
              ></Button>
              <Button
                label="Delete"
                disabled={checkDeleteDisabeled()}
                onClick={() => changeModalStatus('delete', true)}
              ></Button>
            </ButtonGroup>

            <DropdownWithAdvancedSearch
              value={''}
              alignEnd={true}
              dataBsToggleOnButton={true}
              dropdownMenuStyle={{ minWidth: 371 }}
              onChange={e => console.log(e.target.value)}
            >
              <li>
                <div className="form-title">Name</div>
                <Input
                  type="text"
                  autoComplete="name"
                  placeholder='Account Name'
                  onChange={e => {
                    console.log(e.target.value);
                  }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li>
                <div className="form-title">Email</div>
                <Input
                  type="text"
                  placeholder='abc@mail.com'
                  onChange={e => {
                    console.log(e.target.value);
                  }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li>
                <div className="form-title">Role</div>
                <Input
                  type="text"
                  placeholder='Admin/Editor/Viewer/Monitor'
                  onChange={e => {
                    console.log(e.target.value);
                  }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>

            </DropdownWithAdvancedSearch>
          </div>

          <Table responsive striped hover className="table-container">
            <thead>
              <tr>
                <th>
                  <Checkbox
                    id="rl-th-cb1"
                    type='checkbox'
                    checked={checkboxlist[0].checked === true}
                    onChange={e => changeCheckbox('all', e.target.checked)}
                  />
                </th>
                <th>#</th>
                <th>
                  <LinkerWithA
                    label="Name"
                    className="text-decoration-none"
                    onClick={sorting}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label="Email"
                    className="text-decoration-none"
                    onClick={sorting}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label="Access level"
                    className="text-decoration-none"
                    onClick={sorting}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label="Role"
                    className="text-decoration-none"
                    onClick={sorting}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label="Managed MSP"
                    className="text-decoration-none"
                    onClick={sorting}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label="Managed sites"
                    className="text-decoration-none"
                    onClick={sorting}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label="Status"
                    className="text-decoration-none"
                    onClick={sorting}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label="Last access time"
                    className="text-decoration-none"
                    onClick={sorting}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Checkbox
                    id="rl-cb1"
                    type='checkbox'
                    checked={checkboxlist[1].checked === true}
                    onChange={e => changeCheckbox('first', e.target.checked)}
                  />
                </td>
                <td>1</td>
                <td>
                  <span className='table-not-link' onClick={() => changeModalStatus('edit', true)}>D-Link</span>
                </td>
                <td>dlink@dlinkcorp.com</td>
                <td>Operator (D-Link QA)</td>
                <td>Admin</td>
                <td>
                  <TooltipDialogFixed
                    placement="left"
                    hideIcon={true}
                    tooltipsTitle={'2'}
                    title={`
                      <div class="pb-1">CHT</div>
                      <div>FET</div>
                    `}
                  />
                </td>
                <td>
                  <TooltipDialogFixed
                    placement="left"
                    hideIcon={true}
                    tooltipsTitle={'11'}
                    title={`
                      <div class="pb-1">Daliao</div>
                      <div class="pb-1">Dream Mall</div>
                      <div class="pb-1">HQ</div>
                      <div class="pb-1">Neihu</div>
                      <div class="pb-1">Neiwan</div>
                      <div class="pb-1">Songshan</div>
                      <div class="pb-1">Test</div>
                      <div class="pb-1">Zhongzheng</div>
                      <div class="pb-1">Zhudong</div>
                      <div class="pb-1">Zhuzhong</div>
                      <div>Zouying</div>
                    `}
                  />
                </td>
                <td>Verified</td>
                <td>12/10/2018 14:45</td>
              </tr>
              <tr>
                <td>
                  <Checkbox
                    id="rl-cb2"
                    type='checkbox'
                    checked={checkboxlist[2].checked === true}
                    onChange={e => changeCheckbox('second', e.target.checked)}
                  />
                </td>
                <td>2</td>
                <td>
                  <span className='table-not-link' onClick={() => changeModalStatus('edit', true)}>John Smith</span>
                </td>
                <td>John@smith.com</td>
                <td>MSP (CHT)</td>
                <td>Editor</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <span className='table-unverified-link' onClick={() => changeModalStatus('resend', true)}>Unverified</span>
                </td>
                <td>12/10/2018 14:45</td>
              </tr>
              <tr>
                <td>
                  <Checkbox
                    id="rl-cb3"
                    checked={checkboxlist[3].checked === true}
                    onChange={e => changeCheckbox('third', e.target.checked)}
                  />
                </td>
                <td>3</td>
                <td>
                  <span className='table-not-link' onClick={() => changeModalStatus('edit', true)}>Mary Jane</span>
                </td>
                <td>mary@jane.com</td>
                <td>MSP (FET)</td>
                <td>Monitor</td>
                <td>-</td>
                <td>-</td>
                <td>Verified</td>
                <td>03/25/2018 14:45</td>
              </tr>
            </tbody>
          </Table>

          <PaginationContainer
            total={7}
            onPageChange={currentPageNum =>
              console.log('onPageChange', currentPageNum)
            }
            onEntryLimitChange={currentPageNum =>
              console.log('onEntryLimitChange', currentPageNum)
            }
          />
        </div>
        {/* InviteUser modal */}
        <InviteUserModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />
        {/* Delete modal */}
        <DeleteModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />
        {/* EditUser modal */}
        <EditUserModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />
        {/* Resend modal */}
        <ResendModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />
      </div>
    </>
  );
};

export default AccountManagement;
